import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/auth.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Dummy users for testing
  const users = [
    { email: "admin@bitsa.com", password: "admin123", name: "Admin User", role: "admin" },
    { email: "lecturer@bitsa.com", password: "lecturer123", name: "Lecturer User", role: "lecturer" },
    { email: "student@bitsa.com", password: "student123", name: "Student User", role: "student" },
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );
    if (foundUser) {
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("bitsaUser", JSON.stringify(foundUser));
      localStorage.setItem("role", foundUser.role);
      if (foundUser.role === "admin") navigate("/dashboard/admin");
      else if (foundUser.role === "lecturer") navigate("/dashboard/lecturer");
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
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    </div>
  );
}
