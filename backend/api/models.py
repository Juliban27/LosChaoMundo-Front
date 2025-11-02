# backend/api/models.py

from django.db import models
from django.contrib.auth.models import AbstractUser

# ===========================================
# MODELO USUARIO
# ===========================================
class Usuario(AbstractUser):
    ROLES = [
        ('cliente', 'Cliente'),
        ('admin', 'Administrador'),
        ('cajero', 'Cajero'),
    ]

    rol = models.CharField(max_length=20, choices=ROLES, default='cliente')
    tipo_documento = models.CharField(max_length=10, blank=True, null=True)
    numero_documento = models.CharField(max_length=20, unique=True)
    direccion = models.CharField(max_length=100, blank=True, null=True)
    telefono = models.CharField(max_length=15, blank=True, null=True)
    puntos = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.username} ({self.rol})"


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
    usuario = None
    empresa = models.ForeignKey(Empresa, on_delete=models.CASCADE, related_name='facturas')
    numero_factura = models.CharField(max_length=50)
    fecha = models.DateTimeField()
    subtotal = models.FloatField()
    total = models.FloatField()
    metodo_pago = models.CharField(max_length=50)
    archivo_xml = models.FileField(upload_to='facturas/xml/', blank=True, null=True)
    archivo_pdf = models.FileField(upload_to='facturas/pdf/', blank=True, null=True)

    def __str__(self):
        return f"Factura {self.numero_factura} - {self.usuario.username}"


# ===========================================
# MODELO RECOMPENSA
# ===========================================
class Recompensa(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()
    puntos_requeridos = models.IntegerField()
    stock = models.IntegerField(default=0)

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
        return f"{self.usuario.username} canjeó {self.recompensa.nombre}"
