import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/dashboard.css";

export default function StudentDashboard() {
  const { user, getProfile, updateProfile, submitBlog, getUserBlogs } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");

  // Profile state
  const [profile, setProfile] = useState({
    profilePicture: "",
    yearOfStudy: "",
    course: "",
    interests: "",
    bio: ""
  });

  // Blog state
  const [blogForm, setBlogForm] = useState({
    title: "",
    content: "",
    tags: ""
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

  const handleBlogSubmit = (e) => {
    e.preventDefault();
    if (user) {
      submitBlog(blogForm);
      alert("Blog submitted for approval!");
      setBlogForm({ title: "", content: "", tags: "" });
    }
  };

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

  const userBlogs = user ? getUserBlogs(user.id) : [];

  return (
    <div className="dashboard-container">
      <div className="dashboard-sidebar">
        <h2 className="sidebar-title">Student Panel</h2>
        <button className={activeTab === "overview" ? "active" : ""} onClick={() => setActiveTab("overview")}>Overview</button>
        <button className={activeTab === "profile" ? "active" : ""} onClick={() => setActiveTab("profile")}>Profile</button>
        <button className={activeTab === "events" ? "active" : ""} onClick={() => setActiveTab("events")}>Events</button>
        <button className={activeTab === "createblog" ? "active" : ""} onClick={() => setActiveTab("createblog")}>Create Blog</button>
        <button className={activeTab === "myblogs" ? "active" : ""} onClick={() => setActiveTab("myblogs")}>My Blogs</button>
        <button className={activeTab === "materials" ? "active" : ""} onClick={() => setActiveTab("materials")}>Materials</button>
        <button className={activeTab === "achievements" ? "active" : ""} onClick={() => setActiveTab("achievements")}>Achievements</button>
      </div>

      <div className="dashboard-content">
        {activeTab === "overview" && (
          <>
            <h2 className="dashboard-title">Welcome back, {user?.name}!</h2>
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
              <div className="stat-card">
                <h3>Blogs Posted</h3>
                <p>{userBlogs.filter(b => b.status === "approved").length}</p>
              </div>
            </div>

            <div className="dashboard-section">
              <h3>📢 Announcements</h3>
              {announcements.map((a, i) => (
                <div key={i} className="list-item">
                  <h4>{a.title}</h4>
                  <p>{a.content}</p>
                </div>
              ))}
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
                Year of Study
                <select value={profile.yearOfStudy} onChange={(e) => setProfile({ ...profile, yearOfStudy: e.target.value })}>
                  <option value="">Select Year</option>
                  <option value="Year 1">Year 1</option>
                  <option value="Year 2">Year 2</option>
                  <option value="Year 3">Year 3</option>
                  <option value="Year 4">Year 4</option>
                </select>
              </label>

              <label>
                Course
                <select value={profile.course} onChange={(e) => setProfile({ ...profile, course: e.target.value })}>
                  <option value="">Select Course</option>
                  <option value="Software Engineering">Software Engineering</option>
                  <option value="BBIT">BBIT (Business & IT)</option>
                  <option value="Networking">Networking</option>
                </select>
              </label>

              <label>
                Interests (comma-separated)
                <input
                  type="text"
                  placeholder="e.g., Web Development, AI, Cloud Computing"
                  value={profile.interests}
                  onChange={(e) => setProfile({ ...profile, interests: e.target.value })}
                />
              </label>

              <label>
                Bio
                <textarea
                  placeholder="Tell us about yourself..."
                  rows="4"
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                />
              </label>

              <button type="submit" className="btn">Save Profile</button>
            </form>
          </div>
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

        {activeTab === "createblog" && (
          <div className="dashboard-section">
            <h3>Create Blog Post</h3>
            <p className="dashboard-subtitle">Your blog will be reviewed by an admin before being published.</p>
            <form className="dashboard-form" onSubmit={handleBlogSubmit}>
              <label>
                Title
                <input
                  type="text"
                  placeholder="Blog title"
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  required
                />
              </label>

              <label>
                Content
                <textarea
                  placeholder="Write your blog content here..."
                  rows="10"
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  required
                />
              </label>

              <label>
                Tags (comma-separated)
                <input
                  type="text"
                  placeholder="e.g., technology, programming, AI"
                  value={blogForm.tags}
                  onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
                />
              </label>

              <button type="submit" className="btn">Submit for Approval</button>
            </form>
          </div>
        )}

        {activeTab === "myblogs" && (
          <div className="dashboard-section">
            <h3>My Blog Posts</h3>
            {userBlogs.length === 0 ? (
              <p>You haven't submitted any blogs yet.</p>
            ) : (
              userBlogs.map((blog) => (
                <div key={blog.id} className="list-item">
                  <div className="blog-header">
                    <h4>{blog.title}</h4>
                    <span className={`blog-status status-${blog.status}`}>{blog.status.toUpperCase()}</span>
                  </div>
                  <p>{blog.content.substring(0, 150)}...</p>
                  <small>Created: {new Date(blog.createdAt).toLocaleDateString()}</small>
                  {blog.status === "approved" && blog.approvedAt && (
                    <small style={{ marginLeft: "1rem" }}>Approved: {new Date(blog.approvedAt).toLocaleDateString()}</small>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "materials" && (
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
                <h4>🏆 {a.name}</h4>
                <small>{a.date}</small>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
