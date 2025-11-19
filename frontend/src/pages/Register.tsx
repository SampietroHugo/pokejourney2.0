// src/pages/Register.tsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Register() {
    const { register } = useAuth();
    const nav = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [busy, setBusy] = useState(false);
    const [msg, setMsg] = useState<string | null>(null);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setBusy(true);
        setMsg(null);
        try {
            await register(name, email, password);
            setBusy(false);
            nav("/dashboard");
        } catch (err: any) {
            setBusy(false);
            setMsg(err?.response?.data?.error || "Registration failed.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-slate-900/80 border border-slate-700 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-2">Create Trainer</h2>
                <p className="text-sm text-slate-300 mb-4">Join PokeJourney and start collecting.</p>

                {msg && <div className="text-sm text-red-300 bg-red-900/30 p-2 rounded mb-3">{msg}</div>}

                <form onSubmit={onSubmit} className="space-y-3">
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        className="w-full p-3 rounded bg-slate-800 border border-slate-700 text-white"
                        required
                    />
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full p-3 rounded bg-slate-800 border border-slate-700 text-white"
                        required
                        type="email"
                    />
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full p-3 rounded bg-slate-800 border border-slate-700 text-white"
                        required
                        type="password"
                    />
                    <button disabled={busy} className="w-full p-3 rounded bg-green-500 text-white font-semibold">
                        {busy ? "Creating..." : "Create account"}
                    </button>
                </form>

                <div className="mt-4 text-sm text-slate-400">
                    Already a trainer? <Link to="/" className="text-yellow-300 hover:underline">Login</Link>
                </div>
            </div>
        </div>
    );
}
