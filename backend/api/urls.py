from django.urls import path
from .views import ping, login_view

urlpatterns = [
    path("ping/", ping, name="ping"),
    path("login/", login_view, name="login"),
]
