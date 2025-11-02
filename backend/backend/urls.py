from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

# ✅ Endpoint de prueba "ping"
def ping(request):
    return JsonResponse({"message": "pong"})

urlpatterns = [
    path("admin/", admin.site.urls),               # Panel de administración
    path("api/", include("api.urls")),             # Rutas de la aplicación principal (usuarios, login, etc.)
    path("ping/", ping, name="ping"),              # Prueba rápida para verificar conexión backend
]
