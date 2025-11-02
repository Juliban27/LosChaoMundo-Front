import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Home, History, Gift, User } from 'lucide-react';

export default function Footer() {
    const location = useLocation();
    const navigate = useNavigate();

    const navItems = [
        { id: 'home', label: 'Home', icon: Home, path: '/Home' },
        { id: 'history', label: 'History', icon: History, path: '/historia' },
        { id: 'rewards', label: 'Rewards', icon: Gift, path: '/rewards' },
        { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
    ];

    return (
        <footer className="fixed bottom-0 left-0 right-0 z-50">
            <nav className="backdrop-blur-md bg-[#001C63] border-t border-[#3b82f6]/20 shadow-[0_-2px_10px_rgba(0,0,0,0.15)]">
                <ul className="flex justify-around items-center h-16 sm:h-20">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <li key={item.id} className="flex-1">
                                <NavLink
                                    to={item.path}
                                    onClick={() => navigate(item.path)}
                                    className="w-full h-full flex flex-col items-center justify-center gap-1 relative transition-all duration-300 ease-out"
                                >
                                    {/* Fondo circular animado */}
                                    <div
                                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full transition-all duration-300 ${isActive
                                                ? 'bg-[#60a5fa]/15 scale-150 shadow-[0_0_8px_rgba(96,165,250,0.4)]'
                                                : 'opacity-0 group-hover:opacity-10'
                                            }`}
                                    ></div>

                                    {/* Icono */}
                                    <Icon
                                        size={24}
                                        strokeWidth={isActive ? 2.5 : 2}
                                        className={`transition-all duration-300 relative z-10 ${isActive
                                                ? 'text-[#60a5fa] scale-110 translate-y-[-2px]'
                                                : 'text-[#9ec5ff] hover:text-[#60a5fa] hover:scale-105'
                                            }`}
                                    />

                                    {/* Etiqueta */}
                                    <span
                                        className={`text-[0.7rem] sm:text-xs font-medium mt-1 transition-all duration-300 ${isActive
                                                ? 'text-[#60a5fa]'
                                                : 'text-[#bfdbfe] hover:text-[#9ec5ff]'
                                            }`}
                                    >
                                        {item.label}
                                    </span>
                                </NavLink>
                            </li>
                        );
                    })}
                </ul>
            </nav>
        </footer>
    );
}