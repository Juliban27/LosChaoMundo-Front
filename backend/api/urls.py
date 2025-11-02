# backend/api/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
# 👇 --- Importa la nueva vista ---
from .views import UsuarioViewSet, login_view, RecompensaViewSet, procesar_factura_automatica

# Creamos un router
router = DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)
router.register(r'recompensas', RecompensaViewSet)

# Definimos las URLs de nuestra API
urlpatterns = [
    path('', include(router.urls)),
    path('login/', login_view, name='login'),

    # 👇 --- AÑADE ESTA LÍNEA (y borra 'registrar_compra' si quieres) ---
    path('procesar-factura/', procesar_factura_automatica, name='procesar_factura_automatica'),
]