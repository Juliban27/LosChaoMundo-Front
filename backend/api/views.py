# backend/api/views.py

from rest_framework import viewsets, status
from django.utils import timezone
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth import authenticate
from django.db import IntegrityError, transaction
from .models import Usuario, Empresa, Factura, Recompensa
from .serializers import UsuarioSerializer, RecompensaSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny

# Importamos las herramientas de SimpleJWT para los tokens
from rest_framework_simplejwt.tokens import RefreshToken


# ===========================================
# VIEWSET DE USUARIO
# ===========================================
class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all().order_by('nombre')
    serializer_class = UsuarioSerializer

    def get_permissions(self):
        """
        Asigna permisos basados en la acción.
        - 'create' (registro) debe ser público (AllowAny).
        - El resto (ver perfil, editar) debe estar autenticado (IsAuthenticated).
        """
        if self.action == 'create':
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        """
        Filtra para que un usuario normal solo pueda ver/editar
        su propia información, no la de los demás.
        """
        user = self.request.user
        if user.is_authenticated:
            if user.is_staff or user.is_superuser:  # Un admin puede ver a todos
                return Usuario.objects.all()
            # Un usuario normal solo puede verse a sí mismo
            return Usuario.objects.filter(id=user.id)
        # Si no está autenticado, no puede ver a nadie
        return Usuario.objects.none()

    def create(self, request, *args, **kwargs):
        """
        Sobrescribimos 'create' para manejar errores de duplicado
        de forma más amigable.
        """
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

        except IntegrityError as e:
            # Esto se activa si el 'unique=True' de la DB falla
            return Response(
                {"error": "Error de base de datos: El número de documento o el email ya existen."},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            # Esto captura los errores de 'validate_numero_documento' del serializer
            return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)


# ===========================================
# VIEWSET DE RECOMPENSAS
# ===========================================
class RecompensaViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Un ViewSet de solo lectura para listar las recompensas.
    Solo usuarios logueados pueden verlas.
    """
    queryset = Recompensa.objects.all().order_by('puntos_requeridos')
    serializer_class = RecompensaSerializer
    permission_classes = [IsAuthenticated]  # 👈 Protegido


# ===========================================
# VISTA DE LOGIN
# ===========================================
@api_view(['POST'])
def login_view(request):
    numero_documento = request.data.get('numero_documento')
    password = request.data.get('password')

    if not numero_documento or not password:
        return Response(
            {"detail": "Debe proporcionar número de documento y contraseña."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    # Autenticamos contra el 'username' que ahora es el 'numero_documento'
    user = authenticate(username=numero_documento, password=password)

    if user is not None:
        serializer = UsuarioSerializer(user)

        # Generamos los tokens JWT para el usuario
        refresh = RefreshToken.for_user(user)

        return Response({
            "message": "✅ Login exitoso",
            "usuario": serializer.data,
            "access": str(refresh.access_token),  # Token de Acceso
            "refresh": str(refresh),  # Token de Refresco
        })
    else:
        return Response({"detail": "Credenciales inválidas"}, status=status.HTTP_401_UNAUTHORIZED)


# ===========================================
# 👇 API DE PROCESAMIENTO AUTOMÁTICO (NUEVA)
# ===========================================
@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Protegida: solo un "sistema" (ej. cajero) logueado puede llamarla
def procesar_factura_automatica(request):
    """
    Endpoint automático que simula la intercepción de una factura de Siigo.

    Recibe:
    {
        "numero_documento_cliente": "123456",
        "factura_json": { ... (el JSON aleatorio que simula Siigo) ... }
    }
    """

    # 1. Validar que quien llama es un cajero o admin
    sistema_cajero = request.user
    if sistema_cajero.rol not in ['cajero', 'admin']:
        return Response(
            {"error": "Autenticación de sistema no válida (se requiere rol cajero/admin)."},
            status=status.HTTP_403_FORBIDDEN
        )

    # 2. Obtener los datos del POST
    numero_documento_cliente = request.data.get('numero_documento_cliente')
    factura_json = request.data.get('factura_json')  # Este es el JSON que simula Siigo

    if not numero_documento_cliente or not factura_json:
        return Response(
            {"error": "Faltan 'numero_documento_cliente' o 'factura_json'."},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        # 3. Iniciar transacción segura
        with transaction.atomic():

            # 4. Buscar al cliente por su documento
            try:
                cliente = Usuario.objects.get(numero_documento=numero_documento_cliente)
            except Usuario.DoesNotExist:
                return Response({"error": "Cliente no encontrado."}, status=status.HTTP_404_NOT_FOUND)

            # 5. "Interceptar" (Parsear) el JSON simulado
            #    Estos nombres de campo ('nit_empresa', 'total_factura', etc.)
            #    son los que TÚ defines en tu generador de facturas aleatorias.
            try:
                total = float(factura_json.get('total_factura'))
                numero_factura = factura_json.get('numero_factura')
                metodo_pago = factura_json.get('metodo_pago', 'desconocido')
                nit_empresa = factura_json.get('nit_empresa')
            except (TypeError, ValueError):
                return Response({"error": "El 'factura_json' es inválido o le falta el 'total_factura'."},
                                status=status.HTTP_400_BAD_REQUEST)

            if not nit_empresa:
                return Response({"error": "El 'factura_json' debe incluir un 'nit_empresa'."},
                                status=status.HTTP_400_BAD_REQUEST)

            # 6. Buscar la empresa usando su NIT
            try:
                empresa = Empresa.objects.get(nit=nit_empresa)
            except Empresa.DoesNotExist:
                return Response({"error": f"Empresa con NIT {nit_empresa} no encontrada."},
                                status=status.HTTP_404_NOT_FOUND)

            # 7. Calcular puntos (1 punto por cada $700)
            puntos_ganados = int(total // 700)

            # 8. Guardar la factura en la base de datos
            factura = Factura.objects.create(
                usuario=cliente,
                empresa=empresa,
                numero_factura=numero_factura,
                fecha=timezone.now(),
                subtotal=total,  # Asumimos subtotal = total
                total=total,
                metodo_pago=metodo_pago
            )

            # 9. Asignar puntos al usuario
            cliente.puntos += puntos_ganados
            cliente.save(update_fields=['puntos'])

            # 10. Devolver éxito
            return Response(
                {
                    "mensaje": f"✅ Factura procesada para {cliente.nombre}.",
                    "factura_creada_id": factura.id,
                    "puntos_ganados": puntos_ganados,
                    "puntos_totales_cliente": cliente.puntos,
                },
                status=status.HTTP_201_CREATED
            )

    except IntegrityError as e:
        return Response({"error": f"Error de base de datos. ¿Factura duplicada? ({e})"},
                        status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({"error": f"Ocurrió un error inesperado: {e}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)