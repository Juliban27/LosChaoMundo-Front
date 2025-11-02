import React, { useMemo, useState } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';

/**
 * Historia
 * - Dos vistas: "Historial" (lista compacta) y "Dashboard" (métricas + gráfico).
 * - Cero dependencias: minigráfico hecho con <div> + Tailwind.
 * - Datos hardcodeados por ahora.
 */

export default function Historia() {
  // -------------------- Datos mock de facturas --------------------
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
      { id: "F018", emisor: "Clínica OdontoCare",         fecha: "2025-10-01T15:40:00Z", monto: 350000, numero: "FE-2025-501" },
      { id: "F019", emisor: "Transporte Urbano S.A.",     fecha: "2025-10-15T07:15:00Z", monto: 38000,  numero: "FE-2025-528" },
      { id: "F020", emisor: "Tienda Digital Byte",        fecha: "2025-10-28T17:55:00Z", monto: 1250000,numero: "FE-2025-549" },
      { id: "F021", emisor: "Cine Plaza",                 fecha: "2025-11-01T22:10:00Z", monto: 64000,  numero: "FE-2025-560" },
      { id: "F022", emisor: "Supermercado Central",       fecha: "2025-11-02T09:35:00Z", monto: 192000, numero: "FE-2025-566" },
    ],
    []
  );

  // -------------------- Estado de UI --------------------
  const [activeTab, setActiveTab] = useState('Historial'); // Footer
  const [vista, setVista] = useState("historial");         // "historial" | "dashboard"
  const [periodo, setPeriodo] = useState("30");            // 30 | 90 | year | all

  // -------------------- Helpers --------------------
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1);

  const cutoff = useMemo(() => {
    if (periodo === "30") { const d = new Date(now); d.setDate(d.getDate() - 30); return d; }
    if (periodo === "90") { const d = new Date(now); d.setDate(d.getDate() - 90); return d; }
    if (periodo === "year") return startOfYear;
    return null;
  }, [periodo]); // eslint-disable-line

  const formatMoney = (v) =>
    new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(v);

  const formatDate = (iso) =>
    new Date(iso).toLocaleDateString("es-CO", { year: "numeric", month: "short", day: "2-digit" });

  // -------------------- Historial (lista) --------------------
  const lista = useMemo(() => {
    return facturas
      .filter((f) => (cutoff ? new Date(f.fecha) >= cutoff : true))
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
  }, [facturas, cutoff]);

  // -------------------- Dashboard (métricas) --------------------
  // Compras del mes actual
  const mesActual = now.getMonth();       // 0-11
  const anioActual = now.getFullYear();

  const delMes = useMemo(() => {
    return facturas.filter((f) => {
      const d = new Date(f.fecha);
      return d.getMonth() === mesActual && d.getFullYear() === anioActual;
    });
  }, [facturas, mesActual, anioActual]);

  const comprasMes = delMes.length;
  const gastoMes = delMes.reduce((acc, f) => acc + f.monto, 0);
  const ticketPromedioMes = comprasMes > 0 ? Math.round(gastoMes / comprasMes) : 0;
  const totalHistorico = facturas.reduce((acc, f) => acc + f.monto, 0);

  // Top emisores del mes (top 3 por monto)
  const topEmisoresMes = useMemo(() => {
    const map = new Map();
    delMes.forEach((f) => {
      map.set(f.emisor, (map.get(f.emisor) || 0) + f.monto);
    });
    return Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([emisor, monto]) => ({ emisor, monto }));
  }, [delMes]);

  // Gasto por mes últimos 6 meses (incluye el actual si hay)
  const gastoUltimos6 = useMemo(() => {
    const labels = [];
    const data = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(anioActual, mesActual, 1);
      d.setMonth(d.getMonth() - i);
      const keyY = d.getFullYear();
      const keyM = d.getMonth(); // 0-11
      const total = facturas
        .filter((f) => {
          const df = new Date(f.fecha);
          return df.getFullYear() === keyY && df.getMonth() === keyM;
        })
        .reduce((acc, f) => acc + f.monto, 0);

      const nombreMes = d.toLocaleString("es-CO", { month: "short" });
      labels.push(`${nombreMes.charAt(0).toUpperCase()}${nombreMes.slice(1)}`);
      data.push(total);
    }
    const max = Math.max(...data, 1);
    return { labels, data, max };
  }, [facturas, mesActual, anioActual]);

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header
        pageTitle="Historia"
        onNotificationClick={() => {}}
        notificationCount={5}
      />

      <div className="mx-auto w-full max-w-3xl px-4 py-8">
        {/* Encabezado página */}
        <header className="mb-6 text-center">
          <div className="mx-auto mb-3 h-16 w-16 rounded-full bg-indigo-600 flex items-center justify-center shadow-lg">
            <svg className="h-9 w-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l2 2 4-4M7 4h10a2 2 0 012 2v12l-2-1-2 1-2-1-2 1-2-1-2 1V6a2 2 0 012-2z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Historia</h1>
          <p className="text-sm text-gray-500">Facturas electrónicas centralizadas</p>
        </header>

        {/* Contenedor principal */}
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-xl sm:p-6">
          {/* Tabs de vista */}
          <div className="mb-5 flex items-center gap-2">
            <button
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${vista === "historial"
                ? "bg-indigo-600 text-white shadow"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              onClick={() => setVista("historial")}
            >
              Historial
            </button>
            <button
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${vista === "dashboard"
                ? "bg-indigo-600 text-white shadow"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              onClick={() => setVista("dashboard")}
            >
              Dashboard
            </button>
          </div>

          {/* -------------------- Vista: Historial -------------------- */}
          {vista === "historial" && (
            <>
              {/* Filtro de período */}
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

              {/* Lista compacta */}
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
            </>
          )}

          {/* -------------------- Vista: Dashboard -------------------- */}
          {vista === "dashboard" && (
            <>
              {/* KPIs */}
              <section className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <KpiCard label="Compras este mes" value={comprasMes} />
                <KpiCard label="Gastado este mes" value={formatMoney(gastoMes)} />
                <KpiCard label="Ticket promedio del mes" value={formatMoney(ticketPromedioMes)} />
                <KpiCard label="Total histórico" value={formatMoney(totalHistorico)} />
              </section>

              {/* Top emisores del mes */}
              <section className="mb-6">
                <h3 className="mb-2 text-sm font-semibold text-gray-700">Top emisores del mes</h3>
                {topEmisoresMes.length === 0 ? (
                  <div className="rounded-xl border border-gray-200 p-6 text-center">
                    <p className="text-sm text-gray-600">Aún no hay compras en el mes.</p>
                  </div>
                ) : (
                  <ul className="divide-y divide-gray-200 rounded-xl border border-gray-200">
                    {topEmisoresMes.map((t) => (
                      <li key={t.emisor} className="flex items-center justify-between gap-4 p-3">
                        <p className="text-sm font-semibold text-gray-800">{t.emisor}</p>
                        <p className="text-sm font-semibold text-gray-800">{formatMoney(t.monto)}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </section>

              {/* Mini chart: Gasto últimos 6 meses (cero dependencias) */}
              <section>
                <h3 className="mb-2 text-sm font-semibold text-gray-700">Gasto por mes (últimos 6)</h3>
                <MiniBars labels={gastoUltimos6.labels} data={gastoUltimos6.data} />
              </section>
            </>
          )}
        </div>
      </div>

      <Footer activeTab={activeTab} onNavigate={(path) => setActiveTab(path)} />
    </main>
  );
}

/* -------------------- Componentes UI internos (sin deps) -------------------- */

function KpiCard({ label, value }) {
  return (
    <div className="rounded-xl border border-gray-200 p-4">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-gray-800">{value}</p>
    </div>
  );
}

/**
 * MiniBars
 * - Gráfico de barras simple con divs (sin librerías).
 * - Responsivo; 6 columnas por defecto (usa la longitud de data).
 */
function MiniBars({ labels = [], data = [] }) {
  const max = Math.max(...data, 1);
  return (
    <div className="rounded-xl border border-gray-200 p-4">
      <div className="grid"
           style={{
             gridTemplateColumns: `repeat(${data.length}, minmax(0, 1fr))`,
             minHeight: 140
           }}>
        {data.map((val, idx) => {
          const h = Math.round((val / max) * 100);
          return (
            <div key={idx} className="flex flex-col items-center justify-end gap-2 px-1">
              <div
                className="w-full max-w-[28px] rounded-md bg-indigo-200"
                style={{ height: `${Math.max(h, 6)}%` }}
                title={`${labels[idx]}: ${val.toLocaleString("es-CO")}`}
              />
              <span className="text-[10px] text-gray-600 truncate">{labels[idx]}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-2 text-right text-xs text-gray-500">
        Máximo de referencia: {max.toLocaleString("es-CO")}
      </div>
    </div>
  );
}
