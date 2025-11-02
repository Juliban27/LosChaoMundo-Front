import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Coffee, Droplets, ShoppingBag, Sparkles, Info } from 'lucide-react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import CashbackModal from "../components/PuntosModal.jsx";

// 1. Usamos las categorías de prueba
const categories = [
    { id: 'all', label: 'All', icon: Sparkles },
    { id: 'food', label: 'Food', icon: Coffee },
    { id: 'drinks', label: 'Drinks', icon: Droplets },
    { id: 'merchandise', label: 'Merchandise', icon: ShoppingBag }
];

// 2. Usamos las recompensas de prueba
const rewards = [
    {
        id: 1,
        name: 'Baguette',
        points: 950,
        image: '🥖',
        category: 'food',
        bg: '#D4A574'
    },
    {
        id: 2,
        name: 'Empanada',
        points: 900,
        image: '🥟',
        category: 'food',
        bg: '#2C3E50'
    },
    {
        id: 3,
        name: 'Water Bottle',
        points: 750,
        image: '🧴',
        category: 'drinks',
        bg: '#E8D5C4'
    },
    {
        id: 4,
        name: 'University T-Shirt',
        points: 1200,
        image: '👕',
        category: 'merchandise',
        bg: '#2C3E50'
    }
];

// 3. Función auxiliar para obtener datos de auth
const getAuthInfo = () => {
    const storedUser = JSON.parse(localStorage.getItem('usuario') || '{}');
    const accessToken = localStorage.getItem('accessToken');
    return { userId: storedUser.id, accessToken };
};

const Rewards = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    // 4. Estados para los datos del USUARIO
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // 5. useEffect para cargar SÓLO los datos del usuario
    useEffect(() => {
        const fetchUserData = async () => {
            const { userId, accessToken } = getAuthInfo();

            if (!userId || !accessToken) {
                setError('No se encontró sesión. Redirigiendo al login...');
                setLoading(false);
                navigate('/login');
                return;
            }

            try {
                const userResponse = await fetch(`http://127.0.0.1:8000/api/usuarios/${userId}/`, {
                    headers: { 'Authorization': `Bearer ${accessToken}` }
                });

                if (!userResponse.ok) {
                    throw new Error('No se pudieron cargar los datos del usuario.');
                }

                const userData = await userResponse.json();
                setUserData(userData); // Guardamos los datos del usuario

            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [navigate]);

    // 6. El filtro usa el array 'rewards' de prueba
    const filteredRewards = activeCategory === 'all'
        ? rewards
        : rewards.filter(r => r.category === activeCategory);

    // 7. Estados de Carga y Error
    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#001C63] text-white">
                <p className="text-lg">Cargando datos del usuario...</p>
            </div>
        );
    }

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

    // 8. Evita crash si 'userData' es null
    if (!userData) {
         return (
             <div className="min-h-screen flex flex-col items-center justify-center bg-[#001C63] text-white">
                <p className="text-lg">No se pudieron cargar los datos del usuario.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#eff6ff] pb-24"> {/* pb-24 para espacio del footer */}
            {/* Header */}
            <Header
                pageTitle="Rewards"
                onNotificationClick={() => { }}
                notificationCount={5}
                bgColor='#001C63'
            />
            <div className="bg-linear-to-br from-[#001C63] to-[#2563eb] px-6 pt-8 pb-6 rounded-b-4xl shadow-lg">

                {/* =========================================== */}
                {/* 👇 CONECTADO: NOMBRE DEL USUARIO REAL */}
                {/* =========================================== */}
                <h1 className="text-white text-2xl font-bold mb-6">Hola, {userData.nombre}</h1>

                {/* Points Card */}
                <div className="bg-[#fffae0] rounded-2xl p-5 shadow-md">
                    <p className="text-[#004E63] text-sm font-medium mb-2">Puntos Garza</p>
                    <div className="flex items-center justify-between flex-row ">
                        <div className='flex flex-row gap-2 items-center'>
                            <Sparkles className="w-6 h-6 text-[#2563eb]"/>
                            {/* =========================================== */}
                            {/* 👇 CONECTADO: PUNTOS DEL USUARIO REAL */}
                            {/* =========================================== */}
                            <span className="text-[#001C63] text-4xl font-bold">
                                {userData.puntos ? userData.puntos.toLocaleString() : 0}
                            </span>
                        </div>
                        <button onClick={() => setShowModal(true)}><Info/></button>
                    </div>
                </div>
            </div>

            {/* Search Bar (sin cambios) */}
            <div className="px-6 mt-6">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Buscar recompensas..."
                        className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border-2 border-transparent focus:border-[#3b82f6] focus:outline-none shadow-sm transition-all"
                    />
                </div>
            </div>

            {/* Categories (sin cambios) */}
            <div className="px-6 mt-6">
                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {categories.map(cat => {
                        const Icon = cat.icon;
                        const isActive = activeCategory === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium whitespace-nowrap transition-all duration-300 transform hover:scale-105 ${isActive
                                    ? 'bg-[#2563eb] text-white shadow-lg shadow-[#2563eb]/30'
                                    : 'bg-white text-[#004E63] hover:bg-[#e0edff] shadow-sm'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {cat.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Rewards Grid */}
            <div className="px-6 mt-6">
                <div className="grid grid-cols-2 gap-4">
                    {filteredRewards.map(reward => {
                        // ===========================================
                        // 👇 CONECTADO: LÓGICA DE PUNTOS REAL
                        // ===========================================
                        const canRedeem = userData.puntos >= reward.points;

                        return (
                            <div
                                key={reward.id}
                                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                            >
                                {/* Image Container (de prueba) */}
                                <div
                                    className="h-32 flex items-center justify-center text-6xl"
                                    style={{ backgroundColor: reward.bg }}
                                >
                                    {reward.image}
                                </div>

                                {/* Content (de prueba) */}
                                <div className="p-4">
                                    <h3 className="text-[#001C63] font-semibold text-sm mb-1 line-clamp-1">
                                        {reward.name}
                                    </h3>
                                    <p className="text-[#2563eb] text-xs font-medium mb-3">
                                        {reward.points.toLocaleString()} pts
                                    </p>

                                    {/* Redeem Button (Lógica conectada) */}
                                    <button
                                        className={`w-full py-2.5 rounded-xl font-medium text-sm transition-all duration-300 transform active:scale-95 shadow-md ${
                                            canRedeem 
                                            ? 'bg-[#3b82f6] hover:bg-[#2563eb] text-white hover:scale-105 hover:shadow-lg' 
                                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                        }`}
                                        disabled={!canRedeem} // 👈 Deshabilitado si no puede
                                    >
                                        {canRedeem ? 'Redimir' : 'Insuficiente'}
                                    </button>
                                </div>
                            </div>
                        )
                    })}

                </div>
            </div>

            {/* Footer y Modal (movidos fuera del grid) */}
            <Footer/>
            <CashbackModal show={showModal} onClose={() => setShowModal(false)} />

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }
                .scrollbar-hide {
                  -ms-overflow-style: none;
                  scrollbar-width: none;
                }
                .line-clamp-1 {
                  overflow: hidden;
                  display: -webkit-box;
                  -webkit-line-clamp: 1;
                  -webkit-box-orient: vertical;
                }
            `}</style>
        </div>
    );
};

export default Rewards;