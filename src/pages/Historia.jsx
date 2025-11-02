import React, { useMemo, useState } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';
/**
 * Historial (compacto, solo facturas)
 * - Lista reducida de facturas electrónicas del cliente:
 *   Emisor (nombre), Fecha, Monto.
 * - Filtro por Período (30/90/Este año/Todo).
 * - Sin estados (no "abierta/cerrada").
 * - Estilo alineado a Login/Profile (indigo + grises, tarjeta blanca).
 * - Sin dependencias externas.
 */

export default function Historial() {
  // Facturas electrónicas centralizadas (mock ampliado)
  
  const facturas = useMemo(
    () => [
      { id: "F001", emisor: "Almacenes Primavera",       fecha: "2025-01-12T10:20:00Z", monto: 185000, numero: "FE-2025-001" },
      { id: "F002", emisor: "Servicios Andinos S.A.",     fecha: "2025-02-03T09:00:00Z", monto: 450000, numero: "FE-2025-045" },
      { id: "F003", emisor: "Tecnología Nova SAS",        fecha: "2025-02-18T16:10:00Z", monto: 220000, numero: "FE-2025-078" },
      { id: "F004", emisor: "Panadería El Trigal",        fecha: "2025-03-05T08:40:00Z", monto: 125000, numero: "FE-2025-112" },
      { id: "F005", emisor: "Clínica Salud Total",        fecha: "2025-03-22T14:25:00Z", monto: 50000,  numero: "FE-2025-150" },
      { id: "F006", emisor: "ElectroHogar Colombia",      fecha: "2025-04-02T11:05:00Z", monto: 899000, numero: "FE-2025-171" },
      { id: "F007", emisor: "Viajes Andar LTDA",          fecha: "2025-04-19T19:15:00Z", monto: 1450000,numero: "FE-2025-201" },
      { id: "F008", emisor: "Gym Vital Center",           fecha: "2025-05-01T07:30:00Z", monto: 95000,  numero: "FE-2025-230" },
      { id: "F009", emisor: "Farmacia Vida Sana",         fecha: "2025-05-13T12:20:00Z", monto: 68000,  numero: "FE-2025-261" },
      { id: "F010", emisor: "Café Montaña",               fecha: "2025-06-03T18:45:00Z", monto: 42000,  numero: "FE-2025-300" },
      { id: "F011", emisor: "Mercado La 10",              fecha: "2025-06-21T09:10:00Z", monto: 214000, numero: "FE-2025-336" },
      { id: "F012", emisor: "Energía Antioquia",          fecha: "2025-07-07T06:55:00Z", monto: 178000, numero: "FE-2025-362" },
      { id: "F013", emisor: "Acuasur E.S.P.",             fecha: "2025-07-22T13:05:00Z", monto: 54000,  numero: "FE-2025-384" },
      { id: "F014", emisor: "Internet Rápido S.A.",       fecha: "2025-08-09T20:35:00Z", monto: 120000, numero: "FE-2025-410" },
      { id: "F015", emisor: "Restaurante La Fonda",       fecha: "2025-08-23T21:00:00Z", monto: 98000,  numero: "FE-2025-433" },
      { id: "F016", emisor: "Ferretería El Tornillo",     fecha: "2025-09-04T10:00:00Z", monto: 264000, numero: "FE-2025-452" },
      { id: "F017", emisor: "Libros y Más",               fecha: "2025-09-19T16:20:00Z", monto: 76000,  numero: "FE-2025-479" },
      { id: "F018", emisor: "Clínica OdontoCare",          fecha: "2025-10-01T15:40:00Z", monto: 350000, numero: "FE-2025-501" },
      { id: "F019", emisor: "Transporte Urbano S.A.",     fecha: "2025-10-15T07:15:00Z", monto: 38000,  numero: "FE-2025-528" },
      { id: "F020", emisor: "Tienda Digital Byte",        fecha: "2025-10-28T17:55:00Z", monto: 1250000,numero: "FE-2025-549" },
      // Ejemplos cercanos a hoy (noviembre 2025)
      { id: "F021", emisor: "Cine Plaza",                 fecha: "2025-11-01T22:10:00Z", monto: 64000,  numero: "FE-2025-560" },
      { id: "F022", emisor: "Supermercado Central",       fecha: "2025-11-02T09:35:00Z", monto: 192000, numero: "FE-2025-566" },
    ],
    []
  );
  const [activeTab, setActiveTab] = useState('Historial');
  // Filtro por período
  const [periodo, setPeriodo] = useState("30"); // 30 | 90 | year | all

  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);

  const cutoff = useMemo(() => {
    if (periodo === "30") {
      const d = new Date(now);
      d.setDate(d.getDate() - 30);
      return d;
    }
    if (periodo === "90") {
      const d = new Date(now);
      d.setDate(d.getDate() - 90);
      return d;
    }
    if (periodo === "year") return startOfYear;
    return null; // all
  }, [periodo]); // eslint-disable-line

  const formatMoney = (v) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0,
    }).format(v);

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("es-CO", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });

  // Aplica filtro de período y ordena por fecha desc
  const lista = useMemo(() => {
    return facturas
      .filter((f) => (cutoff ? new Date(f.fecha) >= cutoff : true))
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  }, [facturas, cutoff]);

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header
                          pageTitle="Mi Página"
                          onNotificationClick={() => { }}
                          notificationCount={5}
                      />
      <div className="mx-auto w-full max-w-3xl px-4 py-8">
        {/* Header */}
        
        <header className="mb-6 text-center">
          <div className="mx-auto mb-3 h-16 w-16 rounded-full bg-indigo-600 flex items-center justify-center shadow-lg">
            <svg
              className="h-9 w-9 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 14l2 2 4-4M7 4h10a2 2 0 012 2v12l-2-1-2 1-2-1-2 1-2-1-2 1V6a2 2 0 012-2z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Historial</h1>
          <p className="text-sm text-gray-500">Facturas electrónicas centralizadas</p>
        </header>

        {/* Tarjeta contenedora */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xl sm:p-6">
          {/* Filtro de período + limpiar */}
          <section className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Período
              </label>
              <select
                value={periodo}
                onChange={(e) => setPeriodo(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-sm transition focus:border-transparent focus:ring-2 focus:ring-indigo-500"
              >
                <option value="30">Últimos 30 días</option>
                <option value="90">Últimos 90 días</option>
                <option value="year">Este año</option>
                <option value="all">Todo</option>
              </select>
            </div>

            <div className="sm:col-span-1 flex items-end">
              <button
                type="button"
                onClick={() => setPeriodo("30")}
                className="w-full rounded-lg bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-200 transition"
              >
                Restablecer
              </button>
            </div>
          </section>

          {/* Lista compacta (Emisor, Fecha, Monto) */}
          <section>
            {lista.length === 0 ? (
              <div className="rounded-xl border border-gray-200 p-6 text-center">
                <p className="text-sm text-gray-600">
                  No hay facturas en el período seleccionado.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {lista.map((f) => (
                  <li key={f.id} className="py-3">
                    <div className="flex items-center justify-between gap-4">
                      {/* Emisor + fecha */}
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-gray-800">
                          {f.emisor}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatDate(f.fecha)}
                          {/* Número (opcional, discreto) */}
                          {f.numero ? <span className="ml-2 text-gray-400">• {f.numero}</span> : null}
                        </p>
                      </div>

                      {/* Monto */}
                      <div className="shrink-0 text-right">
                        <p className="text-sm font-semibold text-gray-800">
                          {formatMoney(f.monto)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </div>
      <Footer activeTab={activeTab} onNavigate={(path) => setActiveTab(path)} />
    </main>
  );
}
