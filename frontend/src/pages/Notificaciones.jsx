// src/pages/Notificaciones.jsx
import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";

export default function Notificaciones() {
  const navigate = useNavigate();

  // Mock: notificaciones simples (puedes conectar esto a tu backend luego)
  const items = useMemo(
    () => [
      { id: "n1", mensaje: "Recibiste 8 puntos Garza por tu compra", fecha: "2025-11-02 09:45" },
      { id: "n2", mensaje: "Tu factura FE-2025-566 fue agregada al historial", fecha: "2025-11-02 09:40" },
      { id: "n3", mensaje: "Recibiste 12 puntos Garza por pagar en línea", fecha: "2025-10-28 18:05" },
      { id: "n4", mensaje: "Nueva promoción disponible en Rewards", fecha: "2025-10-25 10:12" },
      { id: "n5", mensaje: "Tu perfil fue actualizado correctamente", fecha: "2025-10-20 16:30" },
    ],
    []
  );

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="mx-auto w-full max-w-3xl px-4 py-6 sm:py-8">
        {/* Header con flecha para devolver */}
        <header className="mb-4 flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 border border-gray-200 shadow-sm hover:bg-white transition"
            aria-label="Volver"
            title="Volver"
          >
            {/* Flecha (SVG inline, sin dependencias) */}
            <svg
              className="h-5 w-5 text-gray-700"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div>
            <h1 className="text-2xl font-bold text-gray-800">Notificaciones</h1>
            <p className="text-sm text-gray-500">Últimas novedades de tu cuenta</p>
          </div>
        </header>

        {/* Tarjeta contenedora */}
        <section className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xl sm:p-6">
          {items.length === 0 ? (
            <div className="rounded-xl border border-gray-200 p-6 text-center">
              <p className="text-sm text-gray-600">No tienes notificaciones por ahora.</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {items.map((n) => (
                <li key={n.id} className="py-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-800">{n.mensaje}</p>
                      <p className="text-xs text-gray-500">{n.fecha}</p>
                    </div>
                    {/* Puntito indicativo opcional */}
                    <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-indigo-500 shrink-0" />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}