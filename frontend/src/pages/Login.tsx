import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "./Login.css";

export default function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

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
            await login(email, password);

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
                        autoComplete="username"
                    />

                    <div className="password-wrapper">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            className="input-field"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />

                        <button
                            type="button"
                            className="toggle-password"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                                    fill="none" stroke="currentColor" strokeWidth="2"
                                    viewBox="0 0 24 24">
                                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-5.52 0-10-4.48-10-10
                                     0-2.19.7-4.21 1.94-5.86M6.1 6.1A9.93 9.93 0 0 1 12 4c5.52 0 10 
                                     4.48 10 10 0 2.19-.7 4.21-1.94 5.86"/>
                                    <line x1="1" y1="1" x2="23" y2="23" strokeWidth="2" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                                    fill="none" stroke="currentColor" strokeWidth="2"
                                    viewBox="0 0 24 24">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12Z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                            )}
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