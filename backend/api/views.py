from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json

def ping(request):
    return JsonResponse({"message": "API funcionando correctamente 🚀"})


@csrf_exempt
def login_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        documento = data.get("documento")
        password = data.get("password")

        if documento == "123" and password == "1234":
            return JsonResponse({"status": "ok", "message": "Login exitoso"})
        else:
            return JsonResponse({"status": "error", "message": "Credenciales inválidas"}, status=401)

    return JsonResponse({"error": "Método no permitido"}, status=405)
