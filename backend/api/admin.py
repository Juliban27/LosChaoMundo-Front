# backend/api/admin.py

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import Usuario, Empresa, Factura, Recompensa, Redencion


# 1. Definición del formulario de CREACIÓN (Para la vista ADD/AÑADIR)
# Esta clase define los campos que se ven en la primera pantalla.
class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = Usuario
        # El formulario de creación necesita 'password1' y 'password2' internamente.
        # Definimos los campos de datos que aparecerán.
        fields = ('numero_documento', 'nombre', 'email')

    def clean_username(self):
        # Esta función es crucial: le dice a Django que use el numero_documento
        # como el valor del campo 'username' obsoleto.
        return self.cleaned_data.get('numero_documento')


# 2. Definición del formulario de EDICIÓN (Para la vista CHANGE/MODIFICAR)
class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = Usuario
        fields = '__all__'


# 3. Definición del Admin (CustomUserAdmin)
class CustomUserAdmin(UserAdmin):
    form = CustomUserChangeForm
    add_form = CustomUserCreationForm

    # 🚨 fieldsets para la vista de EDICIÓN (Change View)
    # Quitamos 'password' para que no pida rellenarlo si no se quiere cambiar.
    fieldsets = (
        (None, {'fields': ('numero_documento',)}),
        ('Contraseña', {'fields': ('password',)}),  # Usamos el campo de Django para cambiar la contraseña
        ('Información Personal', {'fields': ('nombre', 'email', 'direccion', 'telefono')}),
        ('Roles y Puntos', {'fields': ('rol', 'puntos', 'empresa')}),
        ('Permisos', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Fechas Importantes', {'fields': ('last_login', 'date_joined')}),
    )

    # 🚨 fieldsets para la vista de AÑADIR (Add View) - ¡Aquí está la solución del KeyError!
    # Quitamos el campo 'password' de aquí. Django lo agrega automáticamente
    # como 'password' que mapea a 'password1' y 'password2' al inicio.
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            # 💡 Quitamos los campos de password, Django los añade al inicio de la página.
            'fields': ('numero_documento', 'nombre', 'email'),
        }),
        ('Contraseña', {'fields': ('password', 'password2')}),  # 👈 FORZAMOS LA VISIBILIDAD DE LOS CAMPOS DE CREACIÓN
        ('Roles y Puntos', {'fields': ('rol', 'puntos', 'empresa')}),
        ('Permisos', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
    )

    list_display = ('numero_documento', 'nombre', 'email', 'rol', 'empresa', 'is_staff')
    search_fields = ('numero_documento', 'email', 'nombre')
    ordering = ('numero_documento',)


# 4. Registramos los modelos en el Admin de Django
admin.site.register(Usuario, CustomUserAdmin)
admin.site.register(Empresa)
admin.site.register(Factura)
admin.site.register(Recompensa)
admin.site.register(Redencion)