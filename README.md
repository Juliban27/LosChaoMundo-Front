# Faktora

Faktora digitaliza la facturación electrónica en Colombia, eliminando el uso de papel térmico y reduciendo su contaminación. Permite generar facturas mediante QR o cédula, incorpora el sistema de fidelización "Puntos Garza" que premia cada compra, y ofrece un dashboard de analítica para optimizar estrategias comerciales.

---

## Demo / Video de presentación
🔗 (Inserta aquí el enlace al video o demo del proyecto)
## PDF de la documentacion
🔗 (Inserta aquí el enlace al video o demo del proyecto)
## Link de la presentacion
🔗 (Inserta aquí el enlace al video o demo del proyecto)

---

## Estado del proyecto
- Nivel de desarrollo: Prototipo funcional.
- Alcance del prototipo: Flujo completo de facturación electrónica, registro de usuarios, sistema Puntos Garza y dashboard de analítica.
- Presupuesto estimado para siguiente fase: Aprox. $10,000,000 COP.

---

## Características principales
- Emisión de facturas electrónicas digitales (QR / cédula).
- Sistema de fidelización Puntos Garza (acumulación y redención).
- Dashboard de analítica de ventas para segmentación y optimización.
- Reducción del uso de papel térmico y huella ambiental.
- Integraciones mediante APIs para cajas punto de venta y DIAN (pendiente / configurable).

---

## Ventajas
- Reduce la contaminación al eliminar papel térmico.
- Facturación rápida y digital.
- Unifica facturación, fidelización y analítica en una sola plataforma.

## Limitaciones conocidas
- Dependencia de conexión a Internet.
- Compatibilidad y adaptación con sistemas de caja existentes.
- Necesidad de actualización ante cambios normativos de la DIAN.
- Posible resistencia inicial por parte de comercios tradicionales.

---

## Tecnologías usadas
- Frontend: React, Tailwind CSS.
- Backend (prototipo): Django.
- Base de datos: SQLite (prototipo).
- Otras: APIs REST, generación y lectura de QR, MCP (integraciones internas).
- Repositorio y versionado: GitHub.

---

## Requisitos (para la demo/prototipo)
- Node.js >= 16 (para frontend)
- Python 3.9+ (para backend Django)
- Pip / virtualenv
- SQLite (incluido por defecto en la mayoría de sistemas)
- Conexión a Internet para llamadas a APIs externas

---

## Instalación rápida (modo prototipo/demo)
A continuación hay pasos generales; adaptar comandos a la estructura real del repo.

1. Clonar el repositorio
   - git clone https://github.com/Juliban27/LosChaoMundo-Front.git
   - cd LosChaoMundo-Front

2. Frontend (React)
   - cd frontend
   - npm install
   - cp .env.example .env (configurar variables si aplica)
   - npm run dev
   - Acceder en: http://localhost:3000 (u otro puerto configurado)

3. Backend (Django)
   - cd backend
   - python -m venv venv
   - source venv/bin/activate  (Windows: venv\Scripts\activate)
   - pip install -r requirements.txt
   - cp .env.example .env (ajustar)
   - python manage.py migrate
   - python manage.py loaddata initial_data.json  (si existe)
   - python manage.py runserver
   - Acceder en: http://localhost:8000

4. Flujo de facturación
   - Generar factura desde la UI (por QR o cédula).
   - Visualizar acumulación de Puntos Garza en el perfil del cliente.
   - Revisar métricas en Dashboard → Analítica.

---
- Generar este archivo README.md en el repositorio y abrir un pull request.
- Crear también archivos complementarios: LICENSE, .gitignore, CONTRIBUTING.md.
- Adaptar el README con enlaces, screenshots y comandos exactos si me compartes la estructura real del repo o el enlace a la demo.
