import React, { useState } from 'react';
import { Search, Coffee, Droplets, ShoppingBag, Sparkles, Info } from 'lucide-react';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import CashbackModal from "../components/PuntosModal.jsx";


const Rewards = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [showModal, setShowModal] = useState(false);
    const categories = [
        { id: 'all', label: 'All', icon: Sparkles },
        { id: 'food', label: 'Food', icon: Coffee },
        { id: 'drinks', label: 'Drinks', icon: Droplets },
        { id: 'merchandise', label: 'Merchandise', icon: ShoppingBag }
    ];

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

    const filteredRewards = activeCategory === 'all'
        ? rewards
        : rewards.filter(r => r.category === activeCategory);

    return (
        <div className="min-h-screen bg-[#eff6ff] pb-8">
            {/* Header */}
            <Header
                pageTitle="Rewards"
                onNotificationClick={() => { }}
                notificationCount={5}
                bgColor='#001C63'
            />
            <div className="bg-linear-to-br from-[#001C63] to-[#2563eb] px-6 pt-8 pb-6 rounded-b-4xl shadow-lg">
                <h1 className="text-white text-2xl font-bold mb-6">Hola, Juan</h1>

                {/* Points Card */}
                <div className="bg-[#fffae0] rounded-2xl p-5 shadow-md">
                    <p className="text-[#004E63] text-sm font-medium mb-2">Puntos Garza</p>
                    <div className="flex items-center gap-20 flex-row ">
                        <div className='flex flex-row gap-2 items-center'>
                            <Sparkles className="w-6 h-6 text-[#2563eb]"/>
                            <span className="text-[#001C63] text-4xl font-bold">3,450</span>
                        </div>
                        <button onClick={() => setShowModal(true)}><Info className='ml-9'/></button>
                        
                    </div>
                </div>
            </div>

            {/* Search Bar */}
            <div className="px-6 mt-6">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search for rewards..."
                        className="w-full pl-12 pr-4 py-3 bg-white rounded-xl border-2 border-transparent focus:border-[#3b82f6] focus:outline-none shadow-sm transition-all"
                    />
                </div>
            </div>

            {/* Categories */}
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
                    {filteredRewards.map(reward => (
                        <div
                            key={reward.id}
                            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            {/* Image Container */}
                            <div
                                className="h-32 flex items-center justify-center text-6xl"
                                style={{ backgroundColor: reward.bg }}
                            >
                                {reward.image}
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <h3 className="text-[#001C63] font-semibold text-sm mb-1 line-clamp-1">
                                    {reward.name}
                                </h3>
                                <p className="text-[#2563eb] text-xs font-medium mb-3">
                                    {reward.points} pts
                                </p>

                                {/* Redeem Button */}
                                <button className="w-full bg-[#3b82f6] hover:bg-[#2563eb] text-white py-2.5 rounded-xl font-medium text-sm transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg">
                                    Redeem
                                </button>
                            </div>
                        </div>
                    ))}

                    <Footer/>
                    <CashbackModal show={showModal} onClose={() => setShowModal(false)} />
                </div>
            </div>

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