# backend/api/serializers.py

from rest_framework import serializers
from .models import Usuario, Empresa, Factura, Recompensa, Redencion


# ===========================================
# SERIALIZER FACTURA (Definido PRIMERO)
# ===========================================
class FacturaSerializer(serializers.ModelSerializer):
    empresa_nombre = serializers.StringRelatedField(source='empresa')

    class Meta:
        model = Factura
        fields = [
            'id',
            'fecha',
            'total',
            'empresa_nombre',
        ]


# ===========================================
# SERIALIZER USUARIO (Corregido)
# ===========================================
class UsuarioSerializer(serializers.ModelSerializer):
    ultima_transaccion = serializers.SerializerMethodField()

    class Meta:
        model = Usuario
        fields = [
            "id", "nombre", "email", "rol", "tipo_documento",
            "numero_documento", "direccion", "telefono", "puntos",
            "password", "ultima_transaccion",
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def get_ultima_transaccion(self, obj):
        ultima_factura = Factura.objects.filter(usuario=obj).order_by('-fecha').first()
        if ultima_factura:
            return FacturaSerializer(ultima_factura).data
        return None

    def validate_numero_documento(self, value):
        if self.instance:  # Si estamos actualizando (PATCH), permite el mismo documento
            if self.instance.numero_documento == value:
                return value

        # Si estamos creando (POST) o cambiando el documento
        if Usuario.objects.filter(numero_documento=value).exists():
            raise serializers.ValidationError("El número de documento ya está registrado.")
        return value

    # ===========================================
    # 👇 ¡ESTE ES EL MÉTODO 'CREATE' DEFINITIVO!
    # (No usa create_user)
    # ===========================================
    def create(self, validated_data):
        """
        Crea el usuario y hashea el password manualmente.
        """
        # 1. Saca el password de los datos validados
        password = validated_data.pop('password', None)

        # 2. Crea la instancia del usuario con el resto de los datos
        # (Esto funciona porque 'username' no está en validated_data)
        instance = self.Meta.model(**validated_data)

        # 3. Hashea y asigna el password
        if password is not None:
            instance.set_password(password)

        # 4. Guarda el usuario en la base de datos
        instance.save()
        return instance


# ===========================================
# OTROS SERIALIZERS
# ===========================================
class EmpresaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Empresa
        fields = "__all__"


class RecompensaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recompensa
        fields = "__all__"


class RedencionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Redencion
        fields = "__all__"