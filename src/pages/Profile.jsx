import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer'; // Importa el Footer inteligente
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle } from "lucide-react"; // Iconos para mensajes

export default function Profile() {
    // 1. Estados para el formulario y la carga
    const [form, setForm] = useState({
        nombre: "",
        email: "",
        telefono: "",
        direccion: "",
    });

    // 'originalData' guardará los datos tal como vinieron del servidor
    const [originalData, setOriginalData] = useState(null);
    const [dirty, setDirty] = useState(false); // true si hay cambios sin guardar
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    // Estados para la carga inicial y errores
    const [loading, setLoading] = useState(true);
    const [pageError, setPageError] = useState('');
    const [saveError, setSaveError] = useState('');

    const navigate = useNavigate();

    // 2. Función auxiliar para obtener datos de auth
    const getAuthInfo = () => {
        const storedUser = JSON.parse(localStorage.getItem('usuario') || '{}');
        const accessToken = localStorage.getItem('accessToken');
        return { userId: storedUser.id, accessToken };
    };

    // 3. useEffect para CARGAR los datos del usuario al inicio
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const { userId, accessToken } = getAuthInfo();
                if (!userId || !accessToken) {
                    setPageError('No se encontró información de sesión.');
                    setLoading(false);
                    navigate('/login'); // Si no hay sesión, llévalo al login
                    return;
                }

                const response = await fetch(`http://127.0.0.1:8000/api/usuarios/${userId}/`, {
                    headers: { 'Authorization': `Bearer ${accessToken}` }
                });

                if (!response.ok) {
                    throw new Error('No se pudieron cargar tus datos de perfil.');
                }

                const data = await response.json();

                // Rellenamos el formulario con los datos reales del backend
                const profileData = {
                    nombre: data.nombre || '',
                    email: data.email || '',
                    telefono: data.telefono || '',
                    direccion: data.direccion || '',
                };

                setForm(profileData);
                setOriginalData(profileData); // Guardamos los datos originales para 'Restablecer'

            } catch (err) {
                console.error(err);
                setPageError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]); // El array vacío asegura que solo se ejecute una vez

    // 4. setField - Actualiza el formulario
    const setField = (field, value) => {
        setForm((f) => ({ ...f, [field]: value }));
        setSaved(false); // Oculta el mensaje de "Guardado" si se vuelve a editar
        setSaveError(''); // Oculta errores
    };

    // 5. Formateador de teléfono (simplificado para 10 dígitos)
    const formatPhone = (value) => {
        // Solo permite números, máximo 10 dígitos
        return value.replace(/\D/g, "").slice(0, 10);
    };

    // 6. useEffect para detectar si hay cambios (compara 'form' con 'originalData')
    useEffect(() => {
        if (originalData) {
            setDirty(JSON.stringify(form) !== JSON.stringify(originalData));
        }
    }, [form, originalData]);

    // 7. onSave - Función para GUARDAR los datos en el backend
    const onSave = async (ev) => {
        ev.preventDefault();
        if (!dirty || saving) return; // No guardar si no hay cambios

        setSaving(true);
        setSaved(false);
        setSaveError('');

        try {
            const { userId, accessToken } = getAuthInfo();

            // Los campos del 'form' (nombre, email) ya coinciden con los del backend
            const res = await fetch(`http://127.0.0.1:8000/api/usuarios/${userId}/`, {
                method: 'PATCH', // PATCH solo actualiza los campos que envías
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(form) // Enviamos el formulario
            });

            if (!res.ok) {
                // Captura errores de validación del backend (ej. email duplicado)
                 try {
                    const errorData = await res.json();
                    let errorMsg = errorData.detail || "Error al guardar.";
                    if (errorData.email) errorMsg = `Email: ${errorData.email[0]}`;
                    if (errorData.nombre) errorMsg = `Nombre: ${errorData.nombre[0]}`;
                    throw new Error(errorMsg);
                 } catch(jsonError) {
                    throw new Error("Error 500: El servidor falló al guardar.");
                 }
            }

            const updatedData = await res.json(); // Obtenemos los datos actualizados

            // Guardamos los datos actualizados como los "nuevos originales"
            const newProfileData = {
                nombre: updatedData.nombre || '',
                email: updatedData.email || '',
                telefono: updatedData.telefono || '',
                direccion: updatedData.direccion || '',
            };

            setForm(newProfileData);
            setOriginalData(newProfileData);
            setSaved(true); // Mostramos "¡Guardado!"

        } catch (err) {
            console.error(err);
            setSaveError(err.message);
        } finally {
            setSaving(false);
        }
    };

    // 8. onReset - Vuelve a los datos originales cargados
    const onReset = () => {
        setForm(originalData);
        setSaved(false);
        setSaveError('');
    };

    // 9. Manejadores de estado de carga/error de la página
    if (loading) {
        return (
            <main className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <p className="text-indigo-600">Cargando perfil...</p>
            </main>
        );
    }

    if (pageError) {
        return (
            <main className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 text-center">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-3" />
                    <p className="text-red-700">{pageError}</p>
                    <button
                        onClick={() => navigate('/login')}
                        className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg"
                    >
                        Ir a Login
                    </button>
                </div>
            </main>
        );
    }

    // --- Estilos (sin cambios) ---
    const inputBase =
        "peer w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-indigo-500 placeholder:text-gray-400 hover:border-gray-400";
    const labelBase = "text-sm font-medium text-gray-700";

    return (
        <main className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 pb-24"> {/* Añadido padding-bottom */}
            <Header
                pageTitle="Mi Página"
                onNotificationClick={() => { }}
                notificationCount={5}
            />
            <div className="mx-auto w-full max-w-md px-4 py-8 sm:py-12">
                {/* Encabezado con avatar (sin cambios) */}
                <header className="mb-8 sm:mb-10 text-center">
                    <div className="mx-auto mb-4 h-20 w-20 rounded-full bg-indigo-600 p-1 shadow-lg">
                        <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                            <svg className="h-10 w-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
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
                                    {/* ... (icono) ... */}
                                    Nombre
                                </span>
                            </label>
                            <div className="mt-1.5">
                                <input
                                    id="nombre"
                                    name="nombre"
                                    type="text"
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
                                    {/* ... (icono) ... */}
                                    Correo
                                </span>
                            </label>
                            <div className="mt-1.5">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="tucorreo@dominio.com"
                                    className={inputBase}
                                    value={form.email}
                                    onChange={(e) => setField("email", e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Teléfono (Modificado) */}
                        <div className="mb-5">
                            <label htmlFor="telefono" className={labelBase}>
                                <span className="flex items-center gap-1.5">
                                    {/* ... (icono) ... */}
                                    Teléfono
                                </span>
                            </label>
                            <div className="mt-1.5">
                                <input
                                    id="telefono"
                                    name="telefono"
                                    type="tel"
                                    inputMode="tel"
                                    placeholder="3001234567" // Placeholder cambiado
                                    className={inputBase}
                                    value={form.telefono}
                                    onChange={(e) => setField("telefono", formatPhone(e.target.value))}
                                />
                            </div>
                        </div>

                        {/* Dirección */}
                        <div className="mb-6">
                            <label htmlFor="direccion" className={labelBase}>
                                <span className="flex items-center gap-1.5">
                                    {/* ... (icono) ... */}
                                    Dirección
                                </span>
                            </label>
                            <div className="mt-1.5">
                                <input
                                    id="direccion"
                                    name="direccion"
                                    type="text"
                                    placeholder="Calle 123 #45-67"
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
                                disabled={!dirty || saving} // Deshabilitado si no hay cambios
                            >
                                Restablecer
                            </button>

                            <button
                                type="submit"
                                disabled={!dirty || saving} // Deshabilitado si no hay cambios o si está guardando
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

                        {/* Mensajes de Éxito o Error de Guardado */}
                        <AnimatePresence>
                            {saved && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="mt-4 rounded-lg bg-green-50 border border-green-200 p-3 text-center"
                                >
                                    <p className="text-sm font-semibold text-green-700 flex items-center justify-center gap-2">
                                        <CheckCircle className="h-5 w-5" />
                                        ¡Cambios guardados exitosamente!
                                    </p>
                                </motion.div>
                            )}
                            {saveError && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    className="mt-4 rounded-lg bg-red-50 border border-red-200 p-3 text-center"
                                >
                                    <p className="text-sm font-semibold text-red-700 flex items-center justify-center gap-2">
                                        <AlertCircle className="h-5 w-5" />
                                        Error al guardar: {saveError}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                    </form>
                </section>
            </div>

            {/* 10. Footer simplificado (ya no necesita props) */}
            <Footer />
        </main>
    );
}