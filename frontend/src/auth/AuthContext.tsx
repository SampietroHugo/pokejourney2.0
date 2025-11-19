import React, { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser } from "../api/auth";

type User = { id: number; email: string; name: string | null };

type AuthContextType = {
    user: User | null;
    token: string | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(() => {
        const saved = localStorage.getItem("pj_user");
        return saved ? JSON.parse(saved) : null;
    });

    const [token, setToken] = useState<string | null>(() =>
        localStorage.getItem("pj_token")
    );

    const [loading, setLoading] = useState(false);

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            const res = await loginUser({ email, password });

            const body = (res as any).data || res;

            const userReceived = body.user || body.data?.user;
            const tokenReceived = body.token || body.data?.token;

            if (!userReceived || !tokenReceived) {
                throw new Error("Invalid server response: Missing user or token");
            }

            localStorage.setItem("pj_token", tokenReceived);
            localStorage.setItem("pj_user", JSON.stringify(userReceived));

            setToken(tokenReceived);
            setUser(userReceived);

            setLoading(false);
            console.log("✅ Login saved successfully:", userReceived);
        } catch (err) {
            console.error("❌ Login failed:", err);
            setLoading(false);
            throw err;
        }
    };

    const register = async (name: string, email: string, password: string) => {
        setLoading(true);
        try {
            await registerUser({ name, email, password });
            await login(email, password);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            throw err;
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("pj_token");
        localStorage.removeItem("pj_user");
    };

    return (
        <AuthContext.Provider
            value={{ user, token, loading, login, register, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};