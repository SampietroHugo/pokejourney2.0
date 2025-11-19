import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import "./Login.css";

export default function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            return setError("Passwords do not match.");
        }

        try {
            await api.post("/auth/register", {
                name,
                email,
                password
            });

            navigate("/login");
        } catch (err: any) {
            setError(err.response?.data?.error ?? "Registration failed.");
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
                    Begin your journey as a Pokémon Trainer today!
                </p>

                <div className="header-divider"></div>

                <h2 className="login-title">Create Account</h2>

                <form onSubmit={handleRegister}>

                    {/* NAME */}
                    <input
                        type="text"
                        placeholder="Trainer Name"
                        className="input-field"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    {/* EMAIL */}
                    <input
                        type="email"
                        placeholder="Email"
                        className="input-field"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    {/* PASSWORD */}
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

                    {/* CONFIRM PASSWORD */}
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        className="input-field"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    {error && <p className="error-msg">{error}</p>}

                    <button type="submit" className="login-btn">
                        Register
                    </button>
                </form>

                <p className="login-footer">
                    Already have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
}
