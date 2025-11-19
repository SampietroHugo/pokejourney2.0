import React, { createContext, useContext, useEffect, useState } from "react";
import { loginUser, registerUser } from "../api/auth";

type User = { id: number; email: string; name?: string };
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
        const raw = localStorage.getItem("pj_user");
        return raw ? JSON.parse(raw) : null;
    });
    const [token, setToken] = useState<string | null>(() => localStorage.getItem("pj_token"));
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (token) {
            localStorage.setItem("pj_token", token);
        } else {
            localStorage.removeItem("pj_token");
        }
    }, [token]);

    useEffect(() => {
        if (user) localStorage.setItem("pj_user", JSON.stringify(user));
        else localStorage.removeItem("pj_user");
    }, [user]);

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            const res = await loginUser({ email, password });
            const { token: t, message } = res.data;
            console.log(message);
            setToken(t);
            setUser({ id: 0, email });
            setLoading(false);
        } catch (err: any) {
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
        } catch (err: any) {
            setLoading(false);
            throw err;
        }
    };

    const logout = () => {
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};
