# backend/api/managers.py

from django.contrib.auth.models import BaseUserManager


class CustomUserManager(BaseUserManager):
    """
    Manejador de usuarios personalizado donde el 'numero_documento'
    es el identificador único para la autenticación.
    """

    def create_user(self, numero_documento, email, password=None, **extra_fields):
        if not numero_documento:
            raise ValueError('El número de documento es obligatorio')

        email = self.normalize_email(email)
        # 🚨 ¡CORRECCIÓN AQUÍ! Cambiar 'numero_documentos' a 'numero_documento'
        user = self.model(numero_documento=numero_documento, email=email, **extra_fields)

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, numero_documento, email, password=None, **extra_fields):
        """
        Crea y guarda un superusuario con los privilegios completos.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        # 💡 La función create_superuser llama a create_user, por eso solo corregimos create_user
        return self.create_user(numero_documento, email, password, **extra_fields)