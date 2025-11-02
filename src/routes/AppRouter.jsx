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
import Home from "../pages/Homes";
import Rewards from "../pages/Rewards";
import Historia from "../pages/Historia";

// 👇 Agregados (sin tocar tus imports existentes)
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

// Variantes para transiciones de página
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
        <Route path="/" element={<PageTransition><Register /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/Home" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/Rewards" element={<PageTransition><Rewards /></PageTransition>} />
        <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />

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

        {/* --- Rutas Administrativo de la empresa --- */}
        {/* <Route path="/administrativo">
          <Route 
            index 
            element={
              <ProtectedRoute allowedRoles={["administrativo"]}>
                <PageTransition><DashboardEmpresarial /></PageTransition>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="reportes" 
            element={
              <ProtectedRoute allowedRoles={["administrativo"]}>
                <PageTransition><Reportes /></PageTransition>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="gestion-datos" 
            element={
              <ProtectedRoute allowedRoles={["administrativo"]}>
                <PageTransition><GestionDatos /></PageTransition>
              </ProtectedRoute>
            } 
          />
        </Route> */}

        {/* --- Rutas Cajero --- */}
        {/* <Route path="/cajero">
          <Route 
            index 
            element={
              <ProtectedRoute allowedRoles={["cajero"]}>
                <PageTransition><PanelCajero /></PageTransition>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="transacciones" 
            element={
              <ProtectedRoute allowedRoles={["cajero"]}>
                <PageTransition><Transacciones /></PageTransition>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="historial" 
            element={
              <ProtectedRoute allowedRoles={["cajero"]}>
                <PageTransition><HistorialVentas /></PageTransition>
              </ProtectedRoute>
            } 
          />
        </Route> */}

        {/* --- Rutas Usuario --- */}
        {/* <Route path="/usuario">
          <Route 
            index 
            element={
              <ProtectedRoute allowedRoles={["usuario"]}>
                <PageTransition><InicioUsuario /></PageTransition>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="perfil" 
            element={
              <ProtectedRoute allowedRoles={["usuario"]}>
                <PageTransition><PerfilUsuario /></PageTransition>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="soporte" 
            element={
              <ProtectedRoute allowedRoles={["usuario"]}>
                <PageTransition><Soporte /></PageTransition>
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

export default function AppRoutes() {   {/* 👈 coincide con el nombre del stack */}
  return (
    <Router> {/* 👈 usar el alias, NO <BrowserRouter> */}
      <AnimatedRoutes />
    </Router>
  );
}
