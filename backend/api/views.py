# backend/api/views.py

# 👇 --- IMPORTA ESTAS DOS LÍNEAS ---
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
# ---
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, viewsets
from django.contrib.auth import authenticate
from django.db import IntegrityError, transaction, connections
from .models import Usuario
from .serializers import UsuarioSerializer


class UsuarioViewSet(viewsets.ModelViewSet):
    # ... (tu viewset se queda igual)
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer

    # ... (tu def create se queda igual)


# 👇 --- ASÍ QUEDA TU LOGIN_VIEW MODIFICADO ---
@api_view(['POST'])
def login_view(request):
    numero_documento = request.data.get('numero_documento')
    password = request.data.get('password')

    if not numero_documento or not password:
        return Response(
            {"detail": "Debe proporcionar número de documento y contraseña."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    user = authenticate(username=numero_documento, password=password)

    if user is not None:
        serializer = UsuarioSerializer(user)

        # === 💡 AQUÍ ESTÁ LA MAGIA ===
        # 1. Generamos los tokens para ese usuario
        refresh = RefreshToken.for_user(user)

        # 2. Devolvemos los tokens en la respuesta
        return Response({
            "message": "✅ Login exitoso",
            "usuario": serializer.data,
            "access": str(refresh.access_token),  # Token de Acceso (el que usarás en cada petición)
            "refresh": str(refresh),  # Token de Refresco (para obtener un nuevo 'access' cuando caduque)
        })
    else:
        return Response(
            {"detail": "Credenciales inválidas"},
            status=status.HTTP_401_UNAUTHORIZED
        )