import React, { useRef, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "./Header.css";

type DropKey = "games" | "dex" | null;

export default function Header() {
    const location = useLocation();
    const { user } = useAuth();

    if (location.pathname === "/login" || location.pathname === "/register") return null;

    const [open, setOpen] = useState<DropKey>(null);
    const enterTimer = useRef<number | null>(null);
    const leaveTimer = useRef<number | null>(null);

    const openDropdown = (key: DropKey) => {
        if (leaveTimer.current) {
            window.clearTimeout(leaveTimer.current);
            leaveTimer.current = null;
        }
        if (enterTimer.current) window.clearTimeout(enterTimer.current);
        enterTimer.current = window.setTimeout(() => setOpen(key), 100);
    };

    const closeDropdown = () => {
        if (enterTimer.current) {
            window.clearTimeout(enterTimer.current);
            enterTimer.current = null;
        }
        if (leaveTimer.current) window.clearTimeout(leaveTimer.current);
        leaveTimer.current = window.setTimeout(() => setOpen(null), 180);
    };

    const toggleDropdown = (key: DropKey) => {
        setOpen(prev => (prev === key ? null : key));
    };

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(null);
        };
        const onDocClick = (e: MouseEvent) => {
            const path = (e.composedPath ? e.composedPath() : (e as any).path) ?? [];
            const root = document.querySelector(".pj-navbar");
            if (root && !path.includes(root)) {
                setOpen(null);
            }
        };

        document.addEventListener("keydown", onKey);
        document.addEventListener("click", onDocClick);
        return () => {
            document.removeEventListener("keydown", onKey);
            document.removeEventListener("click", onDocClick);
        };
    }, []);

    return (
        <>
            <header className="pj-header">
                <div className="header-top">
                    <h1 className="header-title">PokéJourney</h1>
                    <p className="header-sub">
                        Welcome trainer <span className="trainer-name">{user?.name ?? "Guest"}</span>!
                    </p>
                </div>
            </header>

            <nav className="pj-navbar" aria-label="Main navigation">
                <ul className="pj-nav-list">
                    <li className="pj-nav-item">
                        <Link to="/dashboard" className="pj-link">Home</Link>
                    </li>

                    <li
                        className="pj-nav-item dropdown"
                        onMouseEnter={() => openDropdown("games")}
                        onMouseLeave={closeDropdown}
                    >
                        <button
                            className="drop-btn"
                            aria-haspopup="true"
                            aria-expanded={open === "games"}
                            onClick={() => toggleDropdown("games")}
                        >
                            Games
                        </button>

                        <div
                            className={`dropdown-content ${open === "games" ? "show" : ""}`}
                            role="menu"
                        >
                            <Link to="/games/official" className="dropdown-item">Official</Link>
                            <Link to="/games/hackroms" className="dropdown-item">Hackroms</Link>
                        </div>
                    </li>

                    <li
                        className="pj-nav-item dropdown"
                        onMouseEnter={() => openDropdown("dex")}
                        onMouseLeave={closeDropdown}
                    >
                        <button
                            className="drop-btn"
                            aria-expanded={open === "dex"}
                            onClick={() => toggleDropdown("dex")}
                        >
                            Dex
                        </button>

                        <div
                            className={`dropdown-content ${open === "dex" ? "show" : ""}`}
                            role="menu"
                        >
                            <Link to="/dex/pokedex" className="dropdown-item">Pokédex</Link>
                            <Link to="/dex/hackdex" className="dropdown-item">Hackdex</Link>
                        </div>
                    </li>

                    <li className="pj-nav-item">
                        <Link to="/gallery" className="pj-link">Gallery</Link>
                    </li>

                    <li className="pj-nav-item pj-profile">
                        <Link to="/profile" className="pj-link profile-link">Profile</Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}