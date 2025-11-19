import { useLocation } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  const location = useLocation();

  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  return (
    <footer className="pj-footer">
      <video className="footer-video" autoPlay loop muted playsInline>
        <source src="/videos/hoenn-waterfall.MP4" type="video/mp4" />
      </video>

      <div className="footer-overlay" />

      <p className="footer-text">
        © {new Date().getFullYear()} PokéJourney — Made by SampietroHugo.
      </p>
    </footer>
  );
}
