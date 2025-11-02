// frontend/src/routes/AppRouter.jsx

import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ProtectedRoute } from "../components/ProtectedRoute";

// --- Páginas principales ---
import Login from "../pages/Login";
import Register from "../pages/Register";
import Homes from "../pages/Homes";
import Rewards from "../pages/Rewards";
import Profile from "../pages/Profile";
import Historia from "../pages/Historia";
import AdminHome from "../pages/AdminHome";
import DetailTienda from "../pages/DetailTienda";
import Notificaciones from "../pages/Notificaciones";
import NotificacionesAdmin from "../pages/NotificacionesAdmin";

// --- Panel Cajero (nuevo) ---
import PanelCajero from "../pages/PanelCajero";

// --- Animaciones de página ---
const pageVariants = {
  initial: { opacity: 0, y: 12, filter: "blur(2px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -12, filter: "blur(2px)" },
};
const pageTransition = { duration: 0.28, ease: "easeOut" };

// Wrapper animado para todas las páginas
function PageTransition({ children }) {
  return (
    <motion.div
      className="min-h-screen"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={pageTransition}
    >
      {children}
    </motion.div>
  );
}

// --- Contenedor para animaciones entre rutas ---
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* --- RUTAS PÚBLICAS --- */}
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/register" element={<PageTransition><Register /></PageTransition>} />

        {/* --- RUTAS DE USUARIO --- */}
        <Route path="/homes" element={<PageTransition><Homes /></PageTransition>} />
        <Route path="/rewards" element={<PageTransition><Rewards /></PageTransition>} />
        <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
        <Route path="/historia" element={<PageTransition><Historia /></PageTransition>} />
        <Route path="/detailtienda" element={<PageTransition><DetailTienda /></PageTransition>} />
        <Route path="/notificaciones" element={<PageTransition><Notificaciones /></PageTransition>} />

        {/* --- RUTAS ADMIN --- */}
        <Route path="/adminHome" element={<PageTransition><AdminHome /></PageTransition>} />
        <Route path="/notificacionesAdmin" element={<PageTransition><NotificacionesAdmin /></PageTransition>} />

        {/* --- RUTA DE CAJERO (ROL ESPECÍFICO) --- */}
        <Route
          path="/cajero"
          element={
            <ProtectedRoute allowedRoles={["cajero"]}>
              <PageTransition><PanelCajero /></PageTransition>
            </ProtectedRoute>
          }
        />

        {/* --- RUTA BASE Y CATCH-ALL --- */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

// --- Export principal ---
export default function AppRouter() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}
