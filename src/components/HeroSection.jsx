import React from "react";
import { Link } from "react-router-dom";
import "../styles/hero.css";
import LetterGlitch from "./LetterGlitch";

export default function HeroSection() {
  return (
    <section className="hero-section">
      <LetterGlitch
        glitchSpeed={50}
        centerVignette={true}
        outerVignette={false}
        smooth={true}
      />
      <div className="hero-content">
        <h1 className="glitch" data-text="Welcome to BITSA">Welcome to BITSA</h1>
        <p className="hero-sub">Connecting Software Engineering, BBIT & Networking students at ISC.</p>
        <div className="hero-ctas">
          <Link to="/login" className="btn">Join BITSA</Link>
          <Link to="/events" className="btn-ghost">Explore Events</Link>
        </div>
      </div>
    </section>
  );
}
