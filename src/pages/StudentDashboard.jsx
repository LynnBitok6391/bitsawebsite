import React, { useState } from "react";
import "../styles/dashboard.css";

export default function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");

  const announcements = [
    { title: "Hackathon 2025", content: "Join our annual BITSA Hackathon on Dec 5th!" },
    { title: "Networking Bootcamp", content: "Sign up for the Cisco networking workshop this week!" },
  ];

  const events = [
    { id: 1, name: "AI Seminar", date: "2025-12-01", description: "Introduction to Machine Learning" },
    { id: 2, name: "Cloud Masterclass", date: "2025-12-08", description: "AWS, Azure, and GCP Overview" },
    { id: 3, name: "Cybersecurity Workshop", date: "2025-12-15", description: "Ethical Hacking Basics" },
  ];

  const materials = [
    { title: "React Basics", link: "#", author: "John Doe" },
    { title: "Database Design", link: "#", author: "Jane Smith" },
    { title: "Python for Data Science", link: "#", author: "Alice Kim" },
  ];

  const achievements = [
    { name: "Hackathon Participant", date: "2024" },
    { name: "Web Dev Module Complete", date: "2025" },
  ];

  const handleRegister = (eventName) => {
    alert(`Successfully registered for ${eventName}!`);
  };

  const filteredEvents = events.filter(e => e.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredMaterials = materials.filter(m => m.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="dashboard-container">
      <div className="dashboard-sidebar">
        <h2 className="sidebar-title">Student Panel</h2>
        <button className={activeTab === "overview" ? "active" : ""} onClick={() => setActiveTab("overview")}>Overview</button>
        <button className={activeTab === "events" ? "active" : ""} onClick={() => setActiveTab("events")}>Events</button>
        <button className={activeTab === "blogs" ? "active" : ""} onClick={() => setActiveTab("blogs")}>Blogs & Materials</button>
        <button className={activeTab === "achievements" ? "active" : ""} onClick={() => setActiveTab("achievements")}>Achievements</button>
      </div>

      <div className="dashboard-content">
        {activeTab === "overview" && (
          <>
            <h2 className="dashboard-title">Welcome back!</h2>
            <p className="dashboard-subtitle">Stay updated with your academic journey.</p>

            <div className="dashboard-stats">
              <div className="stat-card">
                <h3>Events Attended</h3>
                <p>5</p>
              </div>
              <div className="stat-card">
                <h3>Achievements</h3>
                <p>{achievements.length}</p>
              </div>
            </div>

            <div className="dashboard-section">
              <h3> Announcements</h3>
              {announcements.map((a, i) => (
                <div key={i} className="list-item">
                  <h4>{a.title}</h4>
                  <p>{a.content}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "events" && (
          <div className="dashboard-section">
            <h3>Upcoming Events</h3>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {filteredEvents.map((e) => (
              <div key={e.id} className="list-item">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <h4>{e.name}</h4>
                    <small>{e.date}</small>
                    <p>{e.description}</p>
                  </div>
                  <button className="btn" onClick={() => handleRegister(e.name)}>Register</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "blogs" && (
          <div className="dashboard-section">
            <h3>Learning Materials & Blogs</h3>
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search materials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {filteredMaterials.map((m, i) => (
              <div key={i} className="list-item">
                <h4>{m.title}</h4>
                <p>Author: {m.author}</p>
                <a href={m.link} style={{ color: "var(--color-accent)" }}>View Material</a>
              </div>
            ))}
          </div>
        )}

        {activeTab === "achievements" && (
          <div className="dashboard-section">
            <h3>My Achievements</h3>
            {achievements.map((a, i) => (
              <div key={i} className="list-item">
                <h4>{a.name}</h4>
                <small>{a.date}</small>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
