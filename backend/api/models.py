# backend/api/models.py
from django.db import models
from django.contrib.auth.models import AbstractUser
from .managers import CustomUserManager  # 👈 Importa el nuevo manejador


# ===========================================
# MODELO USUARIO (Corregido con CustomManager)
# ===========================================
class Usuario(AbstractUser):
    ROLES = [
        ('cliente', 'Cliente'),
        ('admin', 'Administrador'),
        ('cajero', 'Cajero'),
    ]

    # --- Corrección para evitar conflicto con createsuperuser ---
    # Lo modificamos para que sea opcional, no nulo y no único.
    username = models.CharField(
        max_length=150,
        unique=False,
        blank=True,
        null=True
    )

    # Desactivamos los campos de nombre/apellido base de AbstractUser
    first_name = None
    last_name = None

    # --- Tus campos personalizados ---
    nombre = models.CharField(max_length=100)  # Tu campo principal para el nombre
    email = models.EmailField(unique=True)  # Hacemos el email único
    rol = models.CharField(max_length=20, choices=ROLES, default='cliente')
    tipo_documento = models.CharField(max_length=10, blank=True, null=True)
    numero_documento = models.CharField(max_length=20, unique=True)  # Este es el ID de login
    direccion = models.CharField(max_length=100, blank=True, null=True)
    telefono = models.CharField(max_length=15, blank=True, null=True)
    puntos = models.IntegerField(default=0)

    # Asociación con una Empresa (para Cajeros)
    empresa = models.ForeignKey(
        'Empresa',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='empleados'
    )

    # 🚨 ¡Línea clave! Asigna el manejador personalizado
    objects = CustomUserManager()

    # --- Configuración de autenticación ---
    USERNAME_FIELD = 'numero_documento'
    REQUIRED_FIELDS = ['nombre', 'email']

    def __str__(self):
        return f"{self.nombre} ({self.numero_documento})"


# ===========================================
# MODELO EMPRESA
# ===========================================
class Empresa(models.Model):
    nombre = models.CharField(max_length=100)
    nit = models.CharField(max_length=20, unique=True)
    direccion = models.CharField(max_length=150, blank=True, null=True)
    correo = models.EmailField(blank=True, null=True)
    telefono = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return self.nombre


# ===========================================
# MODELO FACTURA
# ===========================================
class Factura(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='facturas', null=True, blank=True)
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE, related_name='facturas_empresa')

    numero_factura = models.CharField(max_length=50)
    fecha = models.DateTimeField()
    subtotal = models.FloatField()
    total = models.FloatField()
    metodo_pago = models.CharField(max_length=50)
    archivo_xml = models.FileField(upload_to='facturas/xml/', blank=True, null=True)
    archivo_pdf = models.FileField(upload_to='facturas/pdf/', blank=True, null=True)

    def __str__(self):
        if self.usuario:
            return f"Factura {self.numero_factura} - {self.usuario.nombre}"
        return f"Factura {self.numero_factura} - (Sin usuario)"


# ===========================================
# MODELO RECOMPENSA (Con Categoría)
# ===========================================
class Recompensa(models.Model):
    CATEGORIAS = [
        ('comida', 'Comida'),
        ('bebida', 'Bebida'),
        ('merch', 'Merchandising'),
        ('otro', 'Otro'),
    ]

    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    puntos_requeridos = models.IntegerField()
    stock = models.IntegerField(default=0)

    categoria = models.CharField(max_length=20, choices=CATEGORIAS, default='otro')

    def __str__(self):
        return f"{self.nombre} ({self.puntos_requeridos} pts)"


# ===========================================
# MODELO REDENCIÓN
# ===========================================
class Redencion(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    recompensa = models.ForeignKey(Recompensa, on_delete=models.CASCADE)
    fecha_redencion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.usuario.nombre} canjeó {self.recompensa.nombre}"