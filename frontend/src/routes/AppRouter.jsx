// src/router/AppRoutes.jsx
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
// import { ProtectedRoute } from "../components/ProtectedRoute"; // descomenta si lo vas a usar

// Páginas
import Register from "../pages/Register";
import Login from "../pages/Login";
import Homes from "../pages/Homes";
import Rewards from "../pages/Rewards";
import Profile from "../pages/Profile";
import AdminHome from "../pages/AdminHome";
import DetailTienda from "../pages/DetailTienda";
import Historia from "../pages/Historia";
import Notificaciones from "../pages/Notificaciones";
import NotificacionesAdmin from "../pages/NotificacionesAdmin";

// Animaciones de página
const pageVariants = {
  initial: { opacity: 0, y: 12, filter: "blur(2px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit:    { opacity: 0, y: -12, filter: "blur(2px)" },
};
const pageTransition = { duration: 0.28, ease: "easeOut" };

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

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Redirect inicial */}
        <Route path="/" element={<Navigate to="/register" replace />} />

        {/* Rutas públicas */}
        <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/homes" element={<PageTransition><Homes /></PageTransition>} />
        <Route path="/rewards" element={<PageTransition><Rewards /></PageTransition>} />
        <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
        <Route path="/admin-home" element={<PageTransition><AdminHome /></PageTransition>} />
        <Route path="/detail-tienda" element={<PageTransition><DetailTienda /></PageTransition>} />
        <Route path="/historia" element={<PageTransition><Historia /></PageTransition>} />
        <Route path="/notificaciones" element={<PageTransition><Notificaciones /></PageTransition>} />
        <Route path="/notificaciones-admin" element={<PageTransition><NotificacionesAdmin /></PageTransition>} />

        {/* Ejemplo de ruta protegida (si lo usas)
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <PageTransition><AdminHome /></PageTransition>
            </ProtectedRoute>
          }
        />
        */}

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/register" replace />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function AppRoutes() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  );
}
