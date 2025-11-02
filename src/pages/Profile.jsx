import React, { useEffect, useMemo, useState } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';

/**
 * Profile (mobile-first)
 * - Mismo estilo de colores que Login:
 *   fondo con gradiente azul/índigo, tarjeta blanca,
 *   textos gris, focus y primario índigo.
 * - Solo se cambiaron colores/clases, no la lógica.
 */
export default function Profile() {
  // Simula el usuario actual (hardcode mientras no hay backend)
  const initialUser = useMemo(
    () => ({
      nombre: "Juan Pérez",
      email: "juan.perez@example.com",
      telefono: "(512) 555-0119",
      direccion: "123 Main St, Austin, TX 78701",
    }),
    []
  );

  const [form, setForm] = useState(initialUser);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState('Profile');

  const setField = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setSaved(false);
  };

  const formatUSPhone = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    const len = digits.length;
    if (len < 4) return digits;
    if (len < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  // Habilita Guardar solo si hay cambios vs initialUser
  useEffect(() => {
    setDirty(JSON.stringify(form) !== JSON.stringify(initialUser));
  }, [form, initialUser]);

  const onSave = async (ev) => {
    ev.preventDefault();
    if (!dirty || saving) return;
    setSaving(true);
    // Simulación de guardado (no backend)
    await new Promise((r) => setTimeout(r, 600));
    // Persistimos como "nuevo initial" localmente para que el botón se deshabilite
    Object.assign(initialUser, form);
    setSaving(false);
    setSaved(true);
  };

  const onReset = () => {
    setForm(initialUser);
    setSaved(false);
  };

  // ✅ Estilos alineados al Login (indigo + grises)
  const inputBase =
    "peer w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-400 hover:border-gray-400";
  const labelBase = "text-sm font-medium text-gray-700";

  return (
    <main className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100">
         <Header
                        pageTitle="Mi Página"
                        onNotificationClick={() => { }}
                        notificationCount={5}
                    />
      <div className="mx-auto w-full max-w-md px-4 py-8 sm:py-12">
        {/* Encabezado con avatar */}
        <header className="mb-8 sm:mb-10 text-center">
          <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-indigo-600 p-1 shadow-lg">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
              <svg
                className="h-10 w-10 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Mi Perfil</h1>
          <p className="text-sm text-gray-500">Gestiona tu información personal</p>
        </header>

        {/* Tarjeta */}
        <section className="mx-auto w-full max-w-[420px] rounded-2xl border border-gray-200 bg-white p-6 shadow-xl sm:p-8">
          <form onSubmit={onSave}>
            {/* Nombre */}
            <div className="mb-5">
              <label htmlFor="nombre" className={labelBase}>
                <span className="flex items-center gap-1.5">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Nombre
                </span>
              </label>
              <div className="mt-1.5">
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  inputMode="text"
                  autoComplete="name"
                  placeholder="Tu nombre completo"
                  className={inputBase}
                  value={form.nombre}
                  onChange={(e) => setField("nombre", e.target.value)}
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-5">
              <label htmlFor="email" className={labelBase}>
                <span className="flex items-center gap-1.5">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  Correo
                </span>
              </label>
              <div className="mt-1.5">
                <input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="tucorreo@dominio.com"
                  className={inputBase}
                  value={form.email}
                  onChange={(e) => setField("email", e.target.value)}
                />
              </div>
            </div>

            {/* Teléfono */}
            <div className="mb-5">
              <label htmlFor="telefono" className={labelBase}>
                <span className="flex items-center gap-1.5">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  Teléfono (EE. UU.)
                </span>
              </label>
              <div className="mt-1.5">
                <input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  inputMode="tel"
                  placeholder="(555) 123-4567"
                  className={inputBase}
                  value={form.telefono}
                  onChange={(e) => setField("telefono", formatUSPhone(e.target.value))}
                />
              </div>
            </div>

            {/* Dirección */}
            <div className="mb-6">
              <label htmlFor="direccion" className={labelBase}>
                <span className="flex items-center gap-1.5">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Dirección
                </span>
              </label>
              <div className="mt-1.5">
                <input
                  id="direccion"
                  name="direccion"
                  type="text"
                  autoComplete="street-address"
                  placeholder="Calle 123 #45-67, Apt 101"
                  className={inputBase}
                  value={form.direccion}
                  onChange={(e) => setField("direccion", e.target.value)}
                />
              </div>
            </div>

            {/* Acciones */}
            <div className="flex gap-3 mt-8">
              <button
                type="button"
                onClick={onReset}
                className="flex-1 rounded-lg border-2 border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!dirty || saving}
              >
                Restablecer
              </button>

              <button
                type="submit"
                disabled={!dirty || saving}
                className={`flex-1 rounded-lg px-4 py-3 text-sm font-medium shadow-lg transition focus:outline-none focus:ring-2 ${
                  dirty && !saving
                    ? "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 focus:ring-indigo-500"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed focus:ring-transparent"
                }`}
              >
                {saving ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                    </svg>
                    Guardando...
                  </span>
                ) : "Guardar Cambios"}
              </button>
            </div>

            {saved && (
              <div className="mt-4 rounded-lg bg-green-50 border border-green-200 p-3 text-center">
                <p className="text-sm font-semibold text-green-700 flex items-center justify-center gap-2">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  ¡Cambios guardados exitosamente!
                </p>
              </div>
            )}
          </form>
        </section>
      </div>
        <Footer activeTab={activeTab} onNavigate={(path) => setActiveTab(path)} />
    </main>
  );
}
