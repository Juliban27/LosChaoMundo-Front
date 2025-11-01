import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function ProtectedRoute({ children, allowedRoles }) {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Redirigir al dashboard correspondiente según el rol
        const redirectPaths = {
            admin: "/admin",
            administrativo: "/administrativo",
            cajero: "/cajero",
            usuario: "/usuario"
        };
        return <Navigate to={redirectPaths[user.role] || "/"} replace />;
    }

    return children;
}