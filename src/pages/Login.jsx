import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/auth.css";

export default function Login() {
  const navigate = useNavigate();
  const { loginAs } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Dummy users for testing
  const users = [
    { email: "admin@bitsa.com", password: "admin123", name: "Allan", role: "admin" },
    { email: "lecturer@bitsa.com", password: "lecturer123", name: "Mr Mwangi", role: "lecturer" },
    { email: "student@bitsa.com", password: "student123", name: "Lynn", role: "student" },
    { email: "alumni@bitsa.com", password: "alumni123", name: "Prof Justus", role: "alumni" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );
    if (foundUser) {
      // Use AuthContext login
      loginAs(foundUser.role);

      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("bitsaUser", JSON.stringify(foundUser));
      localStorage.setItem("role", foundUser.role);

      // Navigate to appropriate dashboard
      if (foundUser.role === "admin") navigate("/dashboard/admin");
      else if (foundUser.role === "lecturer") navigate("/dashboard/lecturer");
      else if (foundUser.role === "alumni") navigate("/dashboard/alumni");
      else navigate("/dashboard/user");
    } else {
      setError("Invalid email or password. Try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login to BITSA</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit">Login</button>
        </form>

        <p style={{ marginTop: "1rem" }}>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </div>
  );
}
