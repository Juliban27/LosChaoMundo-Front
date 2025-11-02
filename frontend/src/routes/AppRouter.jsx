// frontend/src/routes/AppRouter.jsx

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// --- Importar TODAS las páginas ---
import LoginPage from "../pages/Login.jsx";
import RegisterPage from "../pages/Register.jsx";
import Home from "../pages/Homes.jsx";
import Rewards from "../pages/Rewards.jsx";
import Profile from "../pages/Profile.jsx";
import Historia from "../pages/Historia.jsx";
import PanelCajero from "../pages/PanelCajero.jsx"; // 👈 AÑADE ESTA LÍNEA

export default function AppRouter() {
    return (
        <Router>
            <Routes>
                {/* Rutas públicas */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Rutas de la app (protegidas) */}
                <Route path="/home" element={<Home />} />
                <Route path="/rewards" element={<Rewards />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/historia" element={<Historia />} />

                {/* RUTA DE CAJERO */}
                <Route path="/cajero" element={<PanelCajero />} /> {/* 👈 AÑADE ESTA LÍNEA */}

                {/* Redirecciones */}
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
}