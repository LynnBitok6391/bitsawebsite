import React, { useState } from "react";
import "../styles/dashboard.css";

export default function LecturerDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [materials, setMaterials] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddMaterial = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const file = e.target.file.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setMaterials([...materials, { title, description, fileURL }]);
    }
    e.target.reset();
    alert("Material uploaded successfully!");
  };

  const handleAddAnnouncement = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const content = e.target.content.value;
    setAnnouncements([...announcements, { title, content }]);
    e.target.reset();
    alert("Announcement posted!");
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const date = e.target.date.value;
    const details = e.target.details.value;
    setEvents([...events, { name, date, details }]);
    e.target.reset();
    alert("Event created!");
  };

  const filteredMaterials = materials.filter(m => m.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="dashboard-container">
      <div className="dashboard-sidebar">
        <h2 className="sidebar-title">Lecturer Panel</h2>
        <button className={activeTab === "overview" ? "active" : ""} onClick={() => setActiveTab("overview")}>Overview</button>
        <button className={activeTab === "materials" ? "active" : ""} onClick={() => setActiveTab("materials")}>Upload Materials</button>
        <button className={activeTab === "announcements" ? "active" : ""} onClick={() => setActiveTab("announcements")}>Announcements</button>
        <button className={activeTab === "events" ? "active" : ""} onClick={() => setActiveTab("events")}>Manage Events</button>
      </div>

      <div className="dashboard-content">
        {activeTab === "overview" && (
          <>
            <h2 className="dashboard-title">Lecturer Dashboard</h2>
            <p className="dashboard-subtitle">Manage your courses, announcements, and events.</p>

            <div className="dashboard-stats">
              <div className="stat-card">
                <h3>Materials Uploaded</h3>
                <p>{materials.length}</p>
              </div>
              <div className="stat-card">
                <h3>Announcements</h3>
                <p>{announcements.length}</p>
              </div>
              <div className="stat-card">
                <h3>Events Managed</h3>
                <p>{events.length}</p>
              </div>
            </div>
          </>
        )}

        {activeTab === "materials" && (
          <div className="dashboard-section">
            <h3>Upload Learning Materials</h3>
            <form className="dashboard-form" onSubmit={handleAddMaterial}>
              <input type="text" name="title" placeholder="Material Title" required />
              <textarea name="description" placeholder="Short Description" required />
              <input type="file" name="file" accept=".pdf,.ppt,.mp4,.docx" required />
              <button type="submit" className="btn">Upload</button>
            </form>

            <div style={{ marginTop: "2rem" }}>
              <h3>Uploaded Materials</h3>
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
                  <p>{m.description}</p>
                  <a href={m.fileURL} target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-accent)" }}>View File</a>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "announcements" && (
          <div className="dashboard-section">
            <h3>Post Announcements</h3>
            <form className="dashboard-form" onSubmit={handleAddAnnouncement}>
              <input type="text" name="title" placeholder="Announcement Title" required />
              <textarea name="content" placeholder="Content" required />
              <button type="submit" className="btn">Post</button>
            </form>
            <div style={{ marginTop: "2rem" }}>
              <h3>Recent Announcements</h3>
              {announcements.map((a, i) => (
                <div key={i} className="list-item">
                  <h4>{a.title}</h4>
                  <p>{a.content}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "events" && (
          <div className="dashboard-section">
            <h3>Add Events</h3>
            <form className="dashboard-form" onSubmit={handleAddEvent}>
              <input type="text" name="name" placeholder="Event Name" required />
              <input type="date" name="date" required />
              <textarea name="details" placeholder="Event Details" required />
              <button type="submit" className="btn">Add Event</button>
            </form>
            <div style={{ marginTop: "2rem" }}>
              <h3>Managed Events</h3>
              {events.map((e, i) => (
                <div key={i} className="list-item">
                  <h4>{e.name}</h4>
                  <small>{e.date}</small>
                  <p>{e.details}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
