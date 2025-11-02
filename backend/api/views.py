# backend/api/views.py

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Usuario
from .serializers import UsuarioSerializer


# Vista tipo ViewSet (automática para CRUD)
class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


# Vista simple tipo función (para prueba rápida de conexión con el front)
@api_view(['GET'])
def ping(request):
    return Response({"message": "✅ API activa y funcionando correctamente"})
