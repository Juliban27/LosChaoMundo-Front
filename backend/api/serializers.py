# api/serializers.py
from rest_framework import serializers
from .models import Usuario

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = [
            "id",
            "first_name",        # nombre real
            "email",             # correo real
            "password",
            "tipo_documento",
            "numero_documento",
            "direccion",
            "telefono",
            "puntos",
            "rol",
        ]
        extra_kwargs = {
            "password": {"write_only": True}
        }

    def create(self, validated_data):
        # 👇 === LA LÍNEA CLAVE ===
        # Asigna el 'numero_documento' al 'username'
        validated_data['username'] = validated_data.get('numero_documento')
        # === FIN DE LA LÍNEA CLAVE ===

        password = validated_data.pop("password", None)
        user = Usuario(**validated_data)
        if password:
            user.set_password(password) # Hashea el password
        user.save()
        return user