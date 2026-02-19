// src/pages/Homes.jsx

import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer'; // ⚠️ Asegúrate que esta ruta sea correcta
import Header from '../components/Header'; // ⚠️ Asegúrate que esta ruta sea correcta
import { Leaf, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Función para calcular el tiempo (ej. "hace 5 minutos")
function timeAgo(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return `Hace ${Math.floor(interval)} años`;
    interval = seconds / 2592000;
    if (interval > 1) return `Hace ${Math.floor(interval)} meses`;
    interval = seconds / 86400;
    if (interval > 1) return `Hace ${Math.floor(interval)} días`;
    interval = seconds / 3600;
    if (interval > 1) return `Hace ${Math.floor(interval)} horas`;
    interval = seconds / 60;
    if (interval > 1) return `Hace ${Math.floor(interval)} minutos`;
    return `Hace ${Math.floor(seconds)} segundos`;
}


export default function Homes() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const storedUser = localStorage.getItem('usuario');
                const accessToken = localStorage.getItem('accessToken');

                if (!storedUser || !accessToken) {
                    setError('No se encontró información de sesión. Inicia sesión nuevamente.');
                    setLoading(false);
                    navigate('/login');
                    return;
                }

                const parsedUser = JSON.parse(storedUser);
                const userId = parsedUser.id;

                const response = await fetch(`http://127.0.0.1:8000/api/usuarios/${userId}/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`
                    }
                });

                if (response.status === 401) {
                     setError('Tu sesión ha expirado. Por favor, inicia sesión de nuevo.');
                     setLoading(false);
                     localStorage.clear();
                     navigate('/login');
                     return;
                }

                if (!response.ok) {
                    // Intenta leer el error del backend
                    const errorData = await response.json();
                    throw new Error(errorData.detail || 'Error al obtener datos del usuario.');
                }

                const data = await response.json();
                setUserData(data);
            } catch (err) {
                console.error(err);
                setError(err.message || 'No se pudieron cargar los datos del usuario.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    // 1. Pantalla de Carga
    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#001C63] text-white">
                <p className="text-lg">Cargando datos del usuario...</p>
            </div>
        );
    }

    // 2. Pantalla de Error
    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#001C63] text-white p-6 text-center">
                <p className="text-lg mb-4">{error}</p>
                <button
                    onClick={() => navigate('/login')}
                    className="bg-white text-[#001C63] px-6 py-2 rounded-xl font-semibold hover:bg-gray-100 transition"
                >
                    Volver al Login
                </button>
            </div>
        );
    }

    // 3. Fix para evitar crash si userData es null
    if (!userData) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#001C63] text-white">
                <p className="text-lg">No se pudieron cargar los datos.</p>
            </div>
        );
    }

    // ===========================================
    // 👇 --- ¡AQUÍ ESTÁ LA CORRECCIÓN! ---
    // ===========================================
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
        JSON.stringify({
            id: userData.id,
            nombre: userData.nombre, // 👈 Se cambió de 'first_name' a 'nombre'
            documento: userData.numero_documento,
            puntos: userData.puntos
        })
    )}`;

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#001C63] to-[#150063] flex flex-col">
            <Header
                pageTitle="Mi Perfil"
                onNotificationClick={() => { }}
                notificationCount={3}
            />

            <main className="flex-1 w-full max-w-md mx-auto p-4 pb-24">
                {/* Tarjeta QR */}
                <div className="bg-gradient-to-br from-[#1d4ed8] to-[#2563eb] rounded-3xl p-6 shadow-2xl mb-6">
                    <div className="bg-white rounded-2xl p-4 mb-4 shadow-lg">
                        <div className="bg-[#004E63] rounded-xl p-6 flex items-center justify-center">
                            <div className="bg-white p-3 rounded-xl shadow-inner">
                                <img src={qrCodeUrl} alt="QR Code" className="w-32 h-32 sm:w-40 sm:h-40" />
                            </div>
                        </div>
                    </div>
                    <div className="text-center text-white">
                        <p className="text-sm opacity-80 mb-1">Muestra este código para identificarte</p>
                        <h2 className="text-2xl font-bold mb-1">{userData.nombre}</h2> {/* 👈 Se cambió de 'first_name' a 'nombre' */}
                        <p className="text-[#60a5fa] font-mono text-lg">ID: {userData.numero_documento}</p>
                    </div>
                </div>

                {/* Puntos */}
                <div className="bg-white rounded-3xl p-6 shadow-xl mb-6">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-linear-to-br from-[#3b82f6] to-[#2563eb] p-2.5 rounded-xl">
                            <Leaf className="text-white" size={24} />
                        </div>
                        <h3 className="text-[#001C63] font-bold text-lg">Puntos</h3>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold text-[#001C63]">
                            {userData.puntos ? userData.puntos.toLocaleString() : 0}
                        </span>
                        <span className="text-xl text-gray-500 font-medium">Puntos</span>
                    </div>
                </div>

                {/* Última Transacción (condicional) */}
                {userData.ultima_transaccion && (
                    <div className="bg-white rounded-3xl p-6 shadow-xl mb-6">
                        <h3 className="text-[#001C63] font-bold text-lg mb-4">Última Transacción</h3>
                        <div className="flex items-center gap-4">
                            <div className="bg-gradient-to-br from-[#e0edff] to-[#bfdbfe] p-3 rounded-xl">
                                <Calendar className="text-[#2563eb]" size={24} />
                            </div>
                            <div className="flex-1">
                                <p className="text-[#001C63] font-semibold text-lg">
                                    {userData.ultima_transaccion.empresa_nombre}
                                </p>
                                <p className="text-gray-500 text-sm">
                                    {timeAgo(userData.ultima_transaccion.fecha)}
                                </p>
                            </div>
                            <div className="text-xl font-bold text-red-900">
                                {userData.ultima_transaccion.total.toLocaleString('es-CO', {
                                    style: 'currency',
                                    currency: 'COP',
                                    maximumFractionDigits: 0
                                })}
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}