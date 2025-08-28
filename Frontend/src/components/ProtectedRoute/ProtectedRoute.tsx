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
        const hasRole = roles.includes(user.role || "");
        if (!hasRole) {
            return <Navigate to="/dashboard" replace />;
        }
    }

    return <Outlet />;
};

export default ProtectedRoute;
