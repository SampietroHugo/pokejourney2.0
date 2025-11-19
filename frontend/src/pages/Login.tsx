import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import "./Login.css";

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const savedEmail = localStorage.getItem("pj_saved_email");
        const savedPassword = localStorage.getItem("pj_saved_password");

        if (savedEmail && savedPassword) {
            setEmail(savedEmail);
            setPassword(savedPassword);
            setRemember(true);
        }
    }, []);

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        try {
            const res = await api.post("/auth/login", { email, password });
            localStorage.setItem("pj_token", res.data.token);

            if (remember) {
                localStorage.setItem("pj_saved_email", email);
                localStorage.setItem("pj_saved_password", password);
            } else {
                localStorage.removeItem("pj_saved_email");
                localStorage.removeItem("pj_saved_password");
            }

            navigate("/dashboard");
        } catch (err: any) {
            setError(err.response?.data?.error ?? "Login failed.");
        }
    }

    return (
        <div className="login-container">
            <video className="bg-video" autoPlay loop muted playsInline>
                <source src="/videos/hoenn-waterfall.MP4" type="video/mp4" />
            </video>

            <div className="login-box">
                <h1 className="project-title">PokéJourney</h1>
                <p className="project-desc">
                    Record your adventures, register Pokémon, and track your legendary journey.
                </p>
                <div className="header-divider"></div>

                <h2 className="login-title">Trainer Login</h2>

                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        className="input-field"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <div className="password-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <button
                            type="button"
                            className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            👁
                        </button>
                    </div>

                    {error && <p className="error-msg">{error}</p>}

                    <div className="extra-options">
                        <label className="remember-me">
                            <input
                                type="checkbox"
                                checked={remember}
                                onChange={() => setRemember(!remember)}
                            />
                            Remember me
                        </label>
                    </div>

                    <button type="submit" className="login-btn">Login</button>
                </form>

                <p className="login-footer">
                    Need an account? <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    );
}
