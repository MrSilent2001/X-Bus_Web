import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const ProtectedRoute = () => {
    const { user, loading } = useAuth();
    console.log("Protected Route - User:", user);

    if (loading) {
        return <div>Loading...</div>;
    }

    return user ? <Outlet /> : <Navigate to="/login" replace />;
};



export default ProtectedRoute;
