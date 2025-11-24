import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/dashboard.css";

export default function AdminDashboard() {
  const { user, getPendingBlogs, approveBlog, rejectBlog, getProfile, updateProfile } = useContext(AuthContext);
  const [activeTab, setActiveTab] = React.useState("overview");
  const [blogForm, setBlogForm] = React.useState({ title: "", content: "", author: "" });
  const [eventForm, setEventForm] = React.useState({ title: "", date: "", location: "", description: "" });

  // Profile state
  const [profile, setProfile] = useState({
    profilePicture: "",
    role: "Administrator",
    department: "",
    bio: ""
  });

  useEffect(() => {
    if (user) {
      const userProfile = getProfile(user.id);
      if (userProfile) {
        setProfile(userProfile);
      }
    }
  }, [user, getProfile]);

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    if (user) {
      updateProfile(user.id, profile);
      alert("Profile updated successfully!");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const stats = [
    { title: "Total Users", value: 120 },
    { title: "Lecturers", value: 8 },
    { title: "Materials Uploaded", value: 34 },
    { title: "Upcoming Events", value: 6 },
  ];

  const users = [
    { id: 1, name: "Lynn Bitok", role: "Admin", email: "lynn@bitsa.org" },
    { id: 2, name: "John Doe", role: "Lecturer", email: "john@bitsa.org" },
    { id: 3, name: "Alice Kim", role: "Student", email: "alice@student.bitsa.org" },
    { id: 4, name: "Mark Otieno", role: "Student", email: "mark@student.bitsa.org" },
  ];

  const handlePostBlog = (e) => {
    e.preventDefault();
    alert(`Blog posted: ${blogForm.title}`);
    setBlogForm({ title: "", content: "", author: "" });
  };

  const handlePostEvent = (e) => {
    e.preventDefault();
    alert(`Event posted: ${eventForm.title}`);
    setEventForm({ title: "", date: "", location: "", description: "" });
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-sidebar">
        <h2 className="sidebar-title">Admin Panel</h2>
        <button className={activeTab === "overview" ? "active" : ""} onClick={() => setActiveTab("overview")}>Overview</button>
        <button className={activeTab === "profile" ? "active" : ""} onClick={() => setActiveTab("profile")}>Profile</button>
        <button className={activeTab === "users" ? "active" : ""} onClick={() => setActiveTab("users")}>Users</button>
        <button className={activeTab === "approveblogs" ? "active" : ""} onClick={() => setActiveTab("approveblogs")}>Approve Blogs</button>
        <button className={activeTab === "blogs" ? "active" : ""} onClick={() => setActiveTab("blogs")}>Post Blog</button>
        <button className={activeTab === "events" ? "active" : ""} onClick={() => setActiveTab("events")}>Post Event</button>
        <button className={activeTab === "analytics" ? "active" : ""} onClick={() => setActiveTab("analytics")}>Analytics</button>
      </div>

      <div className="dashboard-content">
        {activeTab === "overview" && (
          <>
            <h2 className="dashboard-title">Dashboard Overview</h2>
            <div className="dashboard-stats">
              {stats.map((s, i) => (
                <div className="stat-card" key={i}>
                  <h3>{s.title}</h3>
                  <p>{s.value}</p>
                </div>
              ))}
            </div>
            <div className="dashboard-section">
              <h3>Recent Activity</h3>
              <p>User Lynn Bitok logged in.</p>
              <p>New material uploaded by John Doe.</p>
            </div>
          </>
        )}

        {activeTab === "profile" && (
          <div className="dashboard-section">
            <h3>My Profile</h3>
            <form className="dashboard-form" onSubmit={handleProfileUpdate}>
              <div className="profile-picture-section">
                {profile.profilePicture && (
                  <img src={profile.profilePicture} alt="Profile" className="profile-picture-preview" />
                )}
                <label className="profile-picture-label">
                  Profile Picture
                  <input type="file" accept="image/*" onChange={handleImageUpload} />
                </label>
              </div>

              <label>
                Role
                <input
                  type="text"
                  placeholder="Administrator"
                  value={profile.role}
                  onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                />
              </label>

              <label>
                Department
                <input
                  type="text"
                  placeholder="e.g., Administration, IT Management"
                  value={profile.department}
                  onChange={(e) => setProfile({ ...profile, department: e.target.value })}
                />
              </label>

              <label>
                Bio
                <textarea
                  placeholder="Brief description of your role and responsibilities..."
                  rows="4"
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                />
              </label>

              <button type="submit" className="btn">Save Profile</button>
            </form>
          </div>
        )}

        {activeTab === "users" && (
          <div className="dashboard-section">
            <h3>Registered Users</h3>
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.id}</td>
                    <td>{u.name}</td>
                    <td>{u.role}</td>
                    <td>{u.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "approveblogs" && (
          <div className="dashboard-section">
            <h3>Pending Blog Approvals</h3>
            <p className="dashboard-subtitle">Review and approve student blog submissions</p>
            {getPendingBlogs().length === 0 ? (
              <p>No pending blog submissions at this time.</p>
            ) : (
              getPendingBlogs().map((blog) => (
                <div key={blog.id} className="list-item" style={{ border: "1px solid var(--border-color)", borderRadius: "8px", marginBottom: "1rem", padding: "1.5rem" }}>
                  <div className="blog-header">
                    <h4>{blog.title}</h4>
                    <span className="blog-status status-pending">PENDING</span>
                  </div>
                  <p style={{ marginTop: "0.5rem", color: "var(--text-muted)" }}>
                    <strong>Author:</strong> {blog.authorName} | <strong>Submitted:</strong> {new Date(blog.createdAt).toLocaleString()}
                  </p>
                  {blog.tags && (
                    <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
                      <strong>Tags:</strong> {blog.tags}
                    </p>
                  )}
                  <div style={{ marginTop: "1rem", padding: "1rem", background: "var(--input-bg)", borderRadius: "8px" }}>
                    <p>{blog.content}</p>
                  </div>
                  <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                    <button
                      className="btn"
                      style={{ background: "#10b981" }}
                      onClick={() => {
                        approveBlog(blog.id);
                        alert("Blog approved successfully!");
                      }}
                    >
                      ✓ Approve
                    </button>
                    <button
                      className="btn"
                      style={{ background: "#ef4444" }}
                      onClick={() => {
                        rejectBlog(blog.id);
                        alert("Blog rejected.");
                      }}
                    >
                      ✗ Reject
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "blogs" && (
          <div className="dashboard-section">
            <h3>Post New Blog</h3>
            <form className="dashboard-form" onSubmit={handlePostBlog}>
              <input placeholder="Blog Title" value={blogForm.title} onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })} required />
              <input placeholder="Author" value={blogForm.author} onChange={(e) => setBlogForm({ ...blogForm, author: e.target.value })} required />
              <textarea placeholder="Content" rows="5" value={blogForm.content} onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })} required />
              <button type="submit" className="btn">Publish Blog</button>
            </form>
          </div>
        )}

        {activeTab === "events" && (
          <div className="dashboard-section">
            <h3>Post New Event</h3>
            <form className="dashboard-form" onSubmit={handlePostEvent}>
              <input placeholder="Event Title" value={eventForm.title} onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} required />
              <input type="date" value={eventForm.date} onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })} required />
              <input placeholder="Location" value={eventForm.location} onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })} required />
              <textarea placeholder="Description" rows="4" value={eventForm.description} onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })} required />
              <button type="submit" className="btn">Create Event</button>
            </form>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="dashboard-section" style={{ background: "transparent", boxShadow: "none", padding: 0 }}>
            <h2 className="dashboard-title">Website Performance</h2>
            <p className="dashboard-subtitle">Real-time metrics and traffic analysis.</p>

            <div className="analytics-grid">
              <div className="analytics-card">
                <h4>Avg. Load Time</h4>
                <div className="value">0.8s</div>
                <div className="trend positive">↓ 12% vs last week</div>
              </div>
              <div className="analytics-card">
                <h4>Uptime</h4>
                <div className="value">99.9%</div>
                <div className="trend positive">Stable</div>
              </div>
              <div className="analytics-card">
                <h4>Error Rate</h4>
                <div className="value">0.12%</div>
                <div className="trend positive">↓ 0.05% improvement</div>
              </div>
              <div className="analytics-card">
                <h4>Bounce Rate</h4>
                <div className="value">45%</div>
                <div className="trend negative">↑ 2% vs last week</div>
              </div>
            </div>

            <div className="chart-container">
              <div className="chart-header">
                <h3>Traffic Overview (Last 7 Days)</h3>
              </div>
              {/* SVG Line Chart */}
              <svg className="chart-svg" viewBox="0 0 800 200">
                {/* Grid Lines */}
                <line x1="0" y1="150" x2="800" y2="150" className="chart-grid-line" />
                <line x1="0" y1="100" x2="800" y2="100" className="chart-grid-line" />
                <line x1="0" y1="50" x2="800" y2="50" className="chart-grid-line" />

                {/* Data Path: Mock data points */}
                <path
                  d="M0,150 C100,140 150,100 200,80 S300,120 400,60 S500,90 600,40 S700,20 800,50"
                  className="line-path"
                />

                {/* Labels */}
                <text x="0" y="170" className="chart-label">Mon</text>
                <text x="133" y="170" className="chart-label">Tue</text>
                <text x="266" y="170" className="chart-label">Wed</text>
                <text x="400" y="170" className="chart-label">Thu</text>
                <text x="533" y="170" className="chart-label">Fri</text>
                <text x="666" y="170" className="chart-label">Sat</text>
                <text x="780" y="170" className="chart-label">Sun</text>
              </svg>
            </div>

            <div className="analytics-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
              <div className="chart-container">
                <h3>Device Distribution</h3>
                <div className="doughnut-chart-container">
                  <svg width="150" height="150" viewBox="0 0 42 42">
                    <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="#e2e8f0" strokeWidth="5"></circle>
                    <circle cx="21" cy="21" r="15.91549430918954" fill="transparent" stroke="var(--color-accent)" strokeWidth="5" strokeDasharray="70 30" strokeDashoffset="25"></circle>
                    <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="0.3rem" fill="var(--text-color)">70% Desktop</text>
                  </svg>
                </div>
                <div style={{ textAlign: "center", marginTop: "1rem", fontSize: "0.9rem", color: "var(--text-muted)" }}>
                  <span style={{ color: "var(--color-accent)", fontWeight: "bold" }}>●</span> Desktop (70%) &nbsp;
                  <span style={{ color: "#e2e8f0", fontWeight: "bold" }}>●</span> Mobile (30%)
                </div>
              </div>

              <div className="chart-container">
                <h3>Server Response Times</h3>
                <div style={{ marginTop: "1.5rem" }}>
                  <div className="progress-item">
                    <div className="progress-label"><span>Database Query</span><span>120ms</span></div>
                    <div className="progress-bar-bg"><div className="progress-bar-fill" style={{ width: "30%" }}></div></div>
                  </div>
                  <div className="progress-item">
                    <div className="progress-label"><span>API Latency</span><span>45ms</span></div>
                    <div className="progress-bar-bg"><div className="progress-bar-fill" style={{ width: "15%" }}></div></div>
                  </div>
                  <div className="progress-item">
                    <div className="progress-label"><span>Asset Loading</span><span>350ms</span></div>
                    <div className="progress-bar-bg"><div className="progress-bar-fill" style={{ width: "65%" }}></div></div>
                  </div>
                  <div className="progress-item">
                    <div className="progress-label"><span>Rendering</span><span>200ms</span></div>
                    <div className="progress-bar-bg"><div className="progress-bar-fill" style={{ width: "40%" }}></div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
