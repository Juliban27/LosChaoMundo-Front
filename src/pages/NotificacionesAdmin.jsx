import React, { useMemo, useState } from "react";
import HeaderAdmin from "../components/HeaderAdmin";
import {
  Bell,
  AlertTriangle,
  UserPlus,
  ServerCrash,
  Receipt,
  ShieldAlert,
  Settings2,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotificacionesAdmin() {
  const navigate = useNavigate();

  const all = useMemo(
    () => [
      {
        id: "a1",
        tipo: "Incidencia",
        estado: "Nuevo",
        icon: "ServerCrash",
        titulo: "Punto de venta 'Almacén Sur' sin conexión",
        detalle: "Último latido hace 12 min. Reconectar o escalar a soporte.",
        fecha: "2025-11-02 10:35",
      },
      {
        id: "a2",
        tipo: "Usuarios",
        estado: "Leído",
        icon: "UserPlus",
        titulo: "Nuevo usuario creado",
        detalle: "María Rojas (maria@empresa.com) — Rol: Cajero",
        fecha: "2025-11-02 09:55",
      },
      {
        id: "a3",
        tipo: "Facturación",
        estado: "Nuevo",
        icon: "Receipt",
        titulo: "Lote de facturas importado",
        detalle: "Se agregaron 128 facturas electrónicas (FE-2025-430..558).",
        fecha: "2025-11-02 09:10",
      },
      {
        id: "a4",
        tipo: "Seguridad",
        estado: "Atención",
        icon: "ShieldAlert",
        titulo: "Intentos fallidos de inicio de sesión",
        detalle: "4 intentos desde IP 186.44.23.10 en 5 minutos.",
        fecha: "2025-11-01 22:41",
      },
      {
        id: "a5",
        tipo: "Incidencia",
        estado: "Leído",
        icon: "AlertTriangle",
        titulo: "Alto porcentaje de devoluciones",
        detalle: "Sucursal Centro superó el 8% en la última hora.",
        fecha: "2025-11-01 18:20",
      },
      {
        id: "a6",
        tipo: "Configuración",
        estado: "Leído",
        icon: "Settings2",
        titulo: "Cambio de permisos aplicado",
        detalle: "Rol 'Administrativo' ahora puede exportar reportes.",
        fecha: "2025-10-31 11:05",
      },
      {
        id: "a7",
        tipo: "Facturación",
        estado: "Atención",
        icon: "Receipt",
        titulo: "Fallas en ingesta de documentos",
        detalle: "7 facturas rechazadas por validación DIAN.",
        fecha: "2025-10-30 16:12",
      },
      {
        id: "a8",
        tipo: "Resumen",
        estado: "Leído",
        icon: "Bell",
        titulo: "Resumen diario",
        detalle: "Ventas: $12.4M | Transacciones: 852 | Ticket: $14.6k",
        fecha: "2025-10-30 07:00",
      },
    ],
    []
  );

  const IconMap = {
    Bell,
    AlertTriangle,
    UserPlus,
    ServerCrash,
    Receipt,
    ShieldAlert,
    Settings2,
  };

  const [q, setQ] = useState("");
  const [tipo, setTipo] = useState("Todos");     // Todos | Incidencia | Usuarios | Facturación | Seguridad | Configuración | Resumen
  const [estado, setEstado] = useState("Todos"); // Todos | Nuevo | Atención | Leído
  const [items, setItems] = useState(all);

  const filtered = useMemo(() => {
    return items.filter((n) => {
      const byTipo = tipo === "Todos" || n.tipo === tipo;
      const byEstado = estado === "Todos" || n.estado === estado;
      const byQ =
        q.trim() === "" ||
        n.titulo.toLowerCase().includes(q.toLowerCase()) ||
        n.detalle.toLowerCase().includes(q.toLowerCase());
      return byTipo && byEstado && byQ;
    });
  }, [items, tipo, estado, q]);

  const markAllAsRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, estado: "Leído" })));
  };

  const badgeByEstado = (estado) => {
    if (estado === "Nuevo") return "bg-blue-100 text-blue-700";
    if (estado === "Atención") return "bg-amber-100 text-amber-700";
    return "bg-gray-100 text-gray-700";
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-800 px-6 py-6 md:px-12 pt-20 md:pt-24">
      {/* HEADER */}
      <HeaderAdmin />

      {/* Título + acciones */}
      <div className="mt-4 mb-6 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 hover:bg-gray-50 transition"
            title="Volver"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-[#001C63]">
            Notificaciones
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={markAllAsRead}
            className="inline-flex items-center gap-2 rounded-lg bg-[#3b82f6] text-white px-3 py-2 hover:bg-[#2563eb] transition"
            title="Marcar todo como leído"
          >
            <CheckCircle2 className="w-4 h-4" />
            Marcar todo leído
          </button>
        </div>
      </div>

      {/* Filtros + buscador */}
      <div className="mb-5 grid grid-cols-1 md:grid-cols-3 gap-3">
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-[#3b82f6] outline-none"
        >
          {["Todos", "Incidencia", "Usuarios", "Facturación", "Seguridad", "Configuración", "Resumen"].map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <select
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-[#3b82f6] outline-none"
        >
          {["Todos", "Nuevo", "Atención", "Leído"].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar en título o detalle..."
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:ring-2 focus:ring-[#3b82f6] outline-none"
        />
      </div>

      {/* Lista de notificaciones */}
      <section className="bg-white rounded-xl shadow-md border border-gray-100">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-gray-600">
            No hay notificaciones que coincidan con el filtro.
          </div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {filtered.map((n) => {
              const Icon = IconMap[n.icon] ?? Bell; // fallback seguro
              return (
                <li key={n.id} className="p-4 md:p-5">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#e0edff]">
                      <Icon className="w-5 h-5" style={{ color: "#001C63" }} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-sm md:text-base font-semibold text-gray-900">
                          {n.titulo}
                        </h3>
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${badgeByEstado(n.estado)}`}>
                          {n.estado}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-600">{n.detalle}</p>
                      <p className="mt-1 text-xs text-gray-400">{n.fecha}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </div>
  );
}
