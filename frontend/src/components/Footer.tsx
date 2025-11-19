import { useLocation } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  const location = useLocation();

  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  return (
    <footer className="pj-footer">
      <p className="footer-text">
        © {new Date().getFullYear()} PokéJourney — Made by{" "}
        <a
          className="footer-link"
          href="https://github.com/SampietroHugo"
          target="_blank"
          rel="noopener noreferrer"
        >
          SampietroHugo
        </a>.
      </p>
    </footer>
  );
}
