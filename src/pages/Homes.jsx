import React, { useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { Leaf, Calendar } from 'lucide-react';

export default function Homes() {
    const [activeTab, setActiveTab] = useState('home');

    const userData = {
        name: 'Juan Pérez',
        id: '1234556789',
        points: 1450,
        lastTransaction: {
            location: 'Kiosco',
            amount: -812000,
            timeAgo: 'Hace 5 minutos'
        }
    };

    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`USER_ID:${userData.id}`)}`;

    return (
        <div className="min-h-screen bg-linear-to-b from-[#001C63] to-[#150063] flex flex-col">
            {/* Header fijo */}
            <Header
                pageTitle="Mi Página"
                onNotificationClick={() => { }}
                notificationCount={5}
            />

            {/* Contenido con espacio inferior para el footer */}
            <main className="flex-1 w-full max-w-md mx-auto p-4 pb-24">
                {/* Tarjeta QR */}
                <div className="bg-linear-to-br from-[#1d4ed8] to-[#2563eb] rounded-3xl p-6 shadow-2xl mb-6">
                    <div className="bg-white rounded-2xl p-4 mb-4 shadow-lg">
                        <div className="bg-[#004E63] rounded-xl p-6 flex items-center justify-center">
                            <div className="bg-white p-3 rounded-xl shadow-inner">
                                <img src={qrCodeUrl} alt="QR Code" className="w-32 h-32 sm:w-40 sm:h-40" />
                            </div>
                        </div>
                    </div>
                    <div className="text-center text-white">
                        <p className="text-sm opacity-80 mb-1">Show this code for identification</p>
                        <h2 className="text-2xl font-bold mb-1">{userData.name}</h2>
                        <p className="text-[#60a5fa] font-mono text-lg">ID: {userData.id}</p>
                    </div>
                </div>

                {/* Puntos */}
                <div className="bg-white rounded-3xl p-6 shadow-xl mb-6">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="bg-linear-to-br from-[#3b82f6] to-[#2563eb] p-2.5 rounded-xl">
                            <Leaf className="text-white" size={24} />
                        </div>
                        <h3 className="text-[#001C63] font-bold text-lg">Puntos Garza</h3>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-5xl font-bold text-[#001C63]">{userData.points.toLocaleString()}</span>
                        <span className="text-xl text-gray-500 font-medium">Puntos</span>
                    </div>
                </div>

                {/* Última transacción */}
                <div className="bg-white rounded-3xl p-6 shadow-xl mb-6">
                    <h3 className="text-[#001C63] font-bold text-lg mb-4">Ultima Transaccion</h3>
                    <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-br from-[#e0edff] to-[#bfdbfe] p-3 rounded-xl">
                            <Calendar className="text-[#2563eb]" size={24} />
                        </div>
                        <div className="flex-1">
                            <p className="text-[#001C63] font-semibold text-lg">{userData.lastTransaction.location}</p>
                            <p className="text-gray-500 text-sm">{userData.lastTransaction.timeAgo}</p>
                        </div>
                        <div className={`text-xl font-bold ${userData.lastTransaction.amount < 0 ? 'text-red-900' : 'text-green-500'}`}>
                            ${Math.abs(userData.lastTransaction.amount).toLocaleString()}
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer fijo */}
            <Footer activeTab={activeTab} onNavigate={(path) => setActiveTab(path)} />
        </div>
    );
}
