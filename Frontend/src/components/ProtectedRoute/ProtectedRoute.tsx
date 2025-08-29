import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/authContext";

interface Props { roles?: string[] }

const ProtectedRoute = ({ roles }: Props) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" replace state={{ from: location }} />
    }

    if (roles && roles.length > 0) {
        const normalizedUserRole = (user.role || "").replace(/-/g, "_");
        const normalizedRoles = roles.map(r => r.replace(/-/g, "_"));
        const hasRole = normalizedRoles.includes(normalizedUserRole);
        if (!hasRole) {
            return <Navigate to="/dashboard" replace />;
        }
    }

    return <Outlet />;
};

export default ProtectedRoute;
