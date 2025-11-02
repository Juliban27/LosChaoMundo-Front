# backend/api/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UsuarioViewSet, ping

# Creamos el router automático para los ViewSets
router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet, basename='usuario')

urlpatterns = [
    path('ping/', ping, name='ping'),        # ✅ Endpoint de prueba rápida
    path('', include(router.urls)),          # ✅ Endpoints automáticos del ViewSet
]
