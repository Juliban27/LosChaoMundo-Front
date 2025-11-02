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
import AdminHome from "../pages/AdminHome";

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

            
                {/* --- Rutas Admin Ingeniero --- */}
                {/* <Route path="/admin">
                    <Route 
                        index 
                        element={
                            <ProtectedRoute allowedRoles={["admin"]}>
                                <DashboardAdmin />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="configuracion" 
                        element={
                            <ProtectedRoute allowedRoles={["admin"]}>
                                <ConfiguracionSistema />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="usuarios" 
                        element={
                            <ProtectedRoute allowedRoles={["admin"]}>
                                <Usuarios />
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
                                <DashboardEmpresarial />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="reportes" 
                        element={
                            <ProtectedRoute allowedRoles={["administrativo"]}>
                                <Reportes />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="gestion-datos" 
                        element={
                            <ProtectedRoute allowedRoles={["administrativo"]}>
                                <GestionDatos />
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
                                <PanelCajero />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="transacciones" 
                        element={
                            <ProtectedRoute allowedRoles={["cajero"]}>
                                <Transacciones />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="historial" 
                        element={
                            <ProtectedRoute allowedRoles={["cajero"]}>
                                <HistorialVentas />
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
                                <InicioUsuario />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="perfil" 
                        element={
                            <ProtectedRoute allowedRoles={["usuario"]}>
                                <PerfilUsuario />
                            </ProtectedRoute>
                        } 
                    />
                    <Route 
                        path="soporte" 
                        element={
                            <ProtectedRoute allowedRoles={["usuario"]}>
                                <Soporte />
                            </ProtectedRoute>
                        } 
                    />
                </Route> */}
                    

                {/* Redirección si no existe la ruta */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}