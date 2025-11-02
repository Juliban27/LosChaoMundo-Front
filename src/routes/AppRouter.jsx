import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "../components/ProtectedRoute";

// --- Importar páginas por actor ---
// import DashboardAdmin from "../pages/admin/DashboardAdmin";
// import ConfiguracionSistema from "../pages/admin/ConfiguracionSistema";
// import Usuarios from "../pages/admin/Usuarios";

// import DashboardEmpresarial from "../pages/administrativo/DashboardEmpresarial";
// import Reportes from "../pages/administrativo/Reportes";
// import GestionDatos from "../pages/administrativo/GestionDatos";

// import PanelCajero from "../pages/cajero/PanelCajero";
// import Transacciones from "../pages/cajero/Transacciones";
// import HistorialVentas from "../pages/cajero/HistorialVentas";

// import InicioUsuario from "../pages/usuario/InicioUsuario";
// import PerfilUsuario from "../pages/usuario/PerfilUsuario";
// import Soporte from "../pages/usuario/Soporte";

import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import Homes from "../pages/Homes";
import Rewards from "../pages/Rewards";
import AdminHome from "../pages/AdminHome";


import DetailTienda from "../pages/DetailTienda";
import Historia from "../pages/Historia";
export default function AppRouter() {
    return (
        <Router>
            <Routes>
                {/* Ruta pública */}
                <Route path="/" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/Home" element={<Home />} />
                <Route path="/Rewards" element={<Rewards />} />
                <Route path="/profile" element={<Profile />} />

                <Route path="/AdminHome" element={<AdminHome />} />
                <Route path="/detailtienda" element={<DetailTienda />} />

import Notificaciones from "../pages/Notificaciones";
import NotificacionesAdmin from "../pages/NotificacionesAdmin";

import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 12, filter: "blur(2px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit:    { opacity: 0, y: -12, filter: "blur(2px)" },
};
const pageTransition = { duration: 0.28, ease: "easeOut" };

// Wrapper para no repetir motion
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

// Rutas animadas usando location + AnimatePresence
function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      {/* clave por pathname para detectar cambio de pantalla */}
      <Routes location={location} key={location.pathname}>
        {/* Rutas públicas */}
        <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/historia" element={<PageTransition><Historia /></PageTransition>} />
        <Route path="/homes" element={<PageTransition><Homes /></PageTransition>} />
        <Route path="/rewards" element={<PageTransition><Rewards /></PageTransition>} />
        <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
        <Route path="/notificaciones" element={<PageTransition><Notificaciones /></PageTransition>} />
        <Route path="/adminHome" element={<PageTransition><AdminHome /></PageTransition>} />
        <Route path="/notificacionesAdmin" element={<PageTransition><NotificacionesAdmin /></PageTransition>} />
        {/* --- Rutas Admin Ingeniero --- */}
        {/* <Route path="/admin">
          <Route 
            index 
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <PageTransition><DashboardAdmin /></PageTransition>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="configuracion" 
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <PageTransition><ConfiguracionSistema /></PageTransition>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="usuarios" 
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <PageTransition><Usuarios /></PageTransition>
              </ProtectedRoute>
            } 
          />
        </Route> */}



        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
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