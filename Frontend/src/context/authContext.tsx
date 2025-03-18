"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    user: { username: string } | null;
    loading: boolean;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<{ username: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");

        if (token) {
            try {
                const decoded: { username: string } = jwtDecode(token);
                setUser({ username: decoded.username });
            } catch (error) {
                console.error("Invalid token:", error);
                logout();
            }
        }

        setLoading(false); // Ensure state update is complete
    }, []);

    const login = (token: string) => {
        localStorage.setItem("accessToken", token);
        const decoded: { username: string } = jwtDecode(token);
        setUser({ username: decoded.username });

        setTimeout(() => {
            navigate("/dashboard");
        }, 100);
    };

    const logout = () => {
        localStorage.removeItem("accessToken");
        setUser(null);
        navigate("/");
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
