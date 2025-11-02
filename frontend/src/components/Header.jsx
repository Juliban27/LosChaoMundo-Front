import { Bell, Leaf } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header({
  pageTitle = "Eco Student ID",
  bgColor = "rgba(0, 28, 99, 0.85)",
  onNotificationClick = () => {},
  notificationCount = 0
}) {
  const [isNotificationHovered, setIsNotificationHovered] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const navigate = useNavigate();

  const handleBellClick = () => {
    onNotificationClick();
    navigate('/Notificaciones');
  };

  return (
    <header
      className="w-full sticky top-0 z-50 backdrop-blur-md transition-colors duration-300"
      style={{ backgroundColor: bgColor }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <button
          className="relative flex items-center justify-center w-12 h-12 rounded-full bg-[#e0edff] transition-all duration-300 hover:scale-110 hover:rotate-12 hover:shadow-lg active:scale-95"
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
          style={{
            backgroundColor: isLogoHovered ? '#bfdbfe' : '#e0edff'
          }}
        >
          <Leaf
            className="transition-all duration-300"
            size={28}
            color="#001C63"
            style={{
              transform: isLogoHovered ? 'scale(1.1)' : 'scale(1)'
            }}
          />
        </button>

        {/* Título */}
        <h1 className="text-white font-bold text-lg md:text-xl text-center flex-1 mx-4 truncate">
          {pageTitle}
        </h1>

        {/* Notificaciones */}
        <button
          onClick={handleBellClick}
          className="relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 hover:bg-white/10 active:scale-95"
          onMouseEnter={() => setIsNotificationHovered(true)}
          onMouseLeave={() => setIsNotificationHovered(false)}
          aria-label="Notificaciones"
          title="Notificaciones"
        >
          <Bell
            className="transition-all duration-300"
            size={24}
            color="white"
            style={{
              transform: isNotificationHovered ? 'rotate(-20deg) scale(1.1)' : 'rotate(0deg) scale(1)'
            }}
          />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-[#3b82f6] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white animate-pulse">
              {notificationCount > 9 ? '9+' : notificationCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}