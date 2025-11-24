import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import logo from "../assets/bitsa-logo.jpg";

export default function Navbar() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [showNotifs, setShowNotifs] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const role = localStorage.getItem("role");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bitsaNotifications")) || [
      { text: "New event added: AI Bootcamp 2025" },
      { text: "Your Hackathon certificate is ready!" },
    ];
    setNotifications(stored);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="brand">
          <Link to="/">
            <img src={logo} alt="BITSA Logo" style={{ height: "40px", borderRadius: "50%" }} />
            BITSA CLUB
          </Link>
        </div>

        <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
          ☰
        </button>

        <div className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
          <Link to="/gallery" onClick={() => setIsMenuOpen(false)}>Gallery</Link>
          <Link to="/events" onClick={() => setIsMenuOpen(false)}>Events</Link>
          <Link to="/blogs" onClick={() => setIsMenuOpen(false)}>Blogs</Link>
          <Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>

          {isLoggedIn ? (
            <>
              {role === "admin" && <Link to="/dashboard/admin" onClick={() => setIsMenuOpen(false)}>Admin</Link>}
              {role === "lecturer" && <Link to="/dashboard/lecturer" onClick={() => setIsMenuOpen(false)}>Lecturer</Link>}
              {role === "student" && <Link to="/dashboard/user" onClick={() => setIsMenuOpen(false)}>Student</Link>}
              <button onClick={handleLogout} style={{ backgroundColor: "#dc2626", color: "white", border: "none", padding: "0.4rem 0.8rem", borderRadius: "5px", cursor: "pointer" }}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>Login</Link>
              <Link to="/register" onClick={() => setIsMenuOpen(false)}>Register</Link>
            </>
          )}

          <div className="nav-actions">
            <div className="notif-section">
              <span className="bell" onClick={() => setShowNotifs(!showNotifs)} aria-label="Notifications">🔔</span>
              {showNotifs && (
                <div className="notif-dropdown">
                  {notifications.map((n, i) => (
                    <p key={i}>{n.text}</p>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={toggleTheme}
              style={{
                background: "transparent",
                border: "1px solid",
                borderColor: theme === "light" ? "#0f172a" : "white",
                color: theme === "light" ? "#0f172a" : "white",
                borderRadius: "5px",
                padding: "0.3rem 0.8rem",
                cursor: "pointer"
              }}
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
