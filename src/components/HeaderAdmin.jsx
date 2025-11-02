import React from "react";
import { Bell, User, Database } from "lucide-react";

export default function HeaderAdmin() {
    return (
        <header className="w-full bg-white/70 backdrop-blur-md shadow-sm border-b border-[#e0edff] fixed top-0 left-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
                {/* LOGO */}
                <div className="flex items-center gap-2">
                    <div className="bg-[#3b82f6] w-6 h-6 rounded-md flex items-center justify-center">
                        <Database className="text-white w-4 h-4" />
                    </div>
                    <span className="font-semibold text-[#001C63] text-sm sm:text-base">
                        Company Logo
                    </span>
                </div>

                {/* NAV LINKS */}
                <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
                    <a
                        href="#"
                        className="hover:text-[#1d4ed8] transition-colors duration-200"
                    >
                        Dashboard
                    </a>
                    <a
                        href="#"
                        className="hover:text-[#1d4ed8] transition-colors duration-200"
                    >
                        Reportes
                    </a>
                    <a
                        href="#"
                        className="hover:text-[#1d4ed8] transition-colors duration-200"
                    >
                        Configuración
                    </a>
                </nav>

                {/* ICONOS DERECHA */}
                <div className="flex items-center gap-3">
                    <button className="relative hover:bg-[#e0edff] p-2 rounded-full transition-colors">
                        <Bell className="text-[#001C63] w-5 h-5" />
                        <span className="absolute top-1.5 right-1.5 block w-2 h-2 bg-[#f97316] rounded-full"></span>
                    </button>

                    <button className="w-8 h-8 rounded-full bg-[#facc15]/30 hover:bg-[#facc15]/60 transition-all flex items-center justify-center">
                        <User className="text-[#004E63] w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Responsive nav */}
            <div className="md:hidden border-t border-[#e0edff] bg-white/80 backdrop-blur-md flex justify-around py-2 text-sm text-gray-600">
                <a href="#" className="hover:text-[#1d4ed8] transition">Dashboard</a>
                <a href="#" className="hover:text-[#1d4ed8] transition">Reportes</a>
                <a href="#" className="hover:text-[#1d4ed8] transition">Config</a>
            </div>
        </header>
    );
}
