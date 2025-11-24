import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/dashboard.css";

export default function AlumniDashboard() {
    const { user, getProfile, updateProfile } = useContext(AuthContext);
    const [activeTab, setActiveTab] = useState("overview");

    // Profile state
    const [profile, setProfile] = useState({
        profilePicture: "",
        graduationYear: "",
        currentCompany: "",
        currentPosition: "",
        expertise: "",
        bio: "",
        linkedIn: ""
    });

    // Talks state
    const [talks, setTalks] = useState([]);
    const [talkForm, setTalkForm] = useState({
        title: "",
        date: "",
        topic: "",
        description: ""
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

    const handleScheduleTalk = (e) => {
        e.preventDefault();
        const newTalk = {
            id: Date.now(),
            ...talkForm,
            speaker: user.name,
            status: "scheduled"
        };
        setTalks([...talks, newTalk]);
        setTalkForm({ title: "", date: "", topic: "", description: "" });
        alert("Talk scheduled successfully!");
    };

    const upcomingEvents = [
        { id: 1, name: "AI Industry Panel", date: "2025-12-10", needsVolunteers: true },
        { id: 2, name: "Networking Bootcamp", date: "2025-12-15", needsVolunteers: false },
        { id: 3, name: "Career Fair 2026", date: "2026-01-20", needsVolunteers: true },
    ];

    return (
        <div className="dashboard-container">
            <div className="dashboard-sidebar">
                <h2 className="sidebar-title">Alumni Panel</h2>
                <button className={activeTab === "overview" ? "active" : ""} onClick={() => setActiveTab("overview")}>Overview</button>
                <button className={activeTab === "profile" ? "active" : ""} onClick={() => setActiveTab("profile")}>Profile</button>
                <button className={activeTab === "talks" ? "active" : ""} onClick={() => setActiveTab("talks")}>Schedule Talks</button>
                <button className={activeTab === "events" ? "active" : ""} onClick={() => setActiveTab("events")}>Participate in Events</button>
            </div>

            <div className="dashboard-content">
                {activeTab === "overview" && (
                    <>
                        <h2 className="dashboard-title">Welcome back, {user?.name}!</h2>
                        <p className="dashboard-subtitle">Stay connected with BITSA and give back to the community.</p>

                        <div className="dashboard-stats">
                            <div className="stat-card">
                                <h3>Talks Scheduled</h3>
                                <p>{talks.length}</p>
                            </div>
                            <div className="stat-card">
                                <h3>Events Participated</h3>
                                <p>3</p>
                            </div>
                            <div className="stat-card">
                                <h3>Students Mentored</h3>
                                <p>12</p>
                            </div>
                        </div>

                        <div className="dashboard-section">
                            <h3> Upcoming Opportunities</h3>
                            <p>Join us in shaping the future of our students!</p>
                            {upcomingEvents.slice(0, 2).map((event) => (
                                <div key={event.id} className="list-item">
                                    <h4>{event.name}</h4>
                                    <small>{event.date}</small>
                                    {event.needsVolunteers && (
                                        <p style={{ color: "var(--color-accent)", fontWeight: "bold" }}>🙋 Volunteers Needed!</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {activeTab === "profile" && (
                    <div className="dashboard-section">
                        <h3>My Alumni Profile</h3>
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
                                Graduation Year
                                <input
                                    type="text"
                                    placeholder="e.g., 2020"
                                    value={profile.graduationYear}
                                    onChange={(e) => setProfile({ ...profile, graduationYear: e.target.value })}
                                />
                            </label>

                            <label>
                                Current Company
                                <input
                                    type="text"
                                    placeholder="e.g., Google, Microsoft, Safaricom"
                                    value={profile.currentCompany}
                                    onChange={(e) => setProfile({ ...profile, currentCompany: e.target.value })}
                                />
                            </label>

                            <label>
                                Current Position
                                <input
                                    type="text"
                                    placeholder="e.g., Software Engineer, Data Scientist"
                                    value={profile.currentPosition}
                                    onChange={(e) => setProfile({ ...profile, currentPosition: e.target.value })}
                                />
                            </label>

                            <label>
                                Areas of Expertise
                                <input
                                    type="text"
                                    placeholder="e.g., Cloud Computing, AI/ML, Cybersecurity"
                                    value={profile.expertise}
                                    onChange={(e) => setProfile({ ...profile, expertise: e.target.value })}
                                />
                            </label>

                            <label>
                                LinkedIn Profile
                                <input
                                    type="url"
                                    placeholder="https://linkedin.com/in/yourprofile"
                                    value={profile.linkedIn}
                                    onChange={(e) => setProfile({ ...profile, linkedIn: e.target.value })}
                                />
                            </label>

                            <label>
                                Bio
                                <textarea
                                    placeholder="Share your journey and how you'd like to contribute to BITSA..."
                                    rows="4"
                                    value={profile.bio}
                                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                />
                            </label>

                            <button type="submit" className="btn">Save Profile</button>
                        </form>
                    </div>
                )}

                {activeTab === "talks" && (
                    <div className="dashboard-section">
                        <h3>Schedule a Talk</h3>
                        <p className="dashboard-subtitle">Share your industry experience with current students</p>
                        <form className="dashboard-form" onSubmit={handleScheduleTalk}>
                            <label>
                                Talk Title
                                <input
                                    type="text"
                                    placeholder="e.g., Breaking into Tech Industry"
                                    value={talkForm.title}
                                    onChange={(e) => setTalkForm({ ...talkForm, title: e.target.value })}
                                    required
                                />
                            </label>

                            <label>
                                Preferred Date
                                <input
                                    type="date"
                                    value={talkForm.date}
                                    onChange={(e) => setTalkForm({ ...talkForm, date: e.target.value })}
                                    required
                                />
                            </label>

                            <label>
                                Main Topic
                                <input
                                    type="text"
                                    placeholder="e.g., Career Development, Technical Skills"
                                    value={talkForm.topic}
                                    onChange={(e) => setTalkForm({ ...talkForm, topic: e.target.value })}
                                    required
                                />
                            </label>

                            <label>
                                Description
                                <textarea
                                    placeholder="Brief overview of what you'll discuss..."
                                    rows="4"
                                    value={talkForm.description}
                                    onChange={(e) => setTalkForm({ ...talkForm, description: e.target.value })}
                                    required
                                />
                            </label>

                            <button type="submit" className="btn">Schedule Talk</button>
                        </form>

                        {talks.length > 0 && (
                            <div style={{ marginTop: "2rem" }}>
                                <h3>My Scheduled Talks</h3>
                                {talks.map((talk) => (
                                    <div key={talk.id} className="list-item">
                                        <div className="blog-header">
                                            <h4>{talk.title}</h4>
                                            <span className="blog-status status-approved">{talk.status.toUpperCase()}</span>
                                        </div>
                                        <p><strong>Topic:</strong> {talk.topic}</p>
                                        <p><strong>Date:</strong> {talk.date}</p>
                                        <p>{talk.description}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "events" && (
                    <div className="dashboard-section">
                        <h3>Participate in Events</h3>
                        <p className="dashboard-subtitle">Help organize or volunteer at upcoming BITSA events</p>
                        {upcomingEvents.map((event) => (
                            <div key={event.id} className="list-item">
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <div>
                                        <h4>{event.name}</h4>
                                        <small>{event.date}</small>
                                        {event.needsVolunteers && (
                                            <p style={{ color: "var(--color-accent)", fontWeight: "bold", marginTop: "0.5rem" }}>
                                                🙋 Volunteers Needed!
                                            </p>
                                        )}
                                    </div>
                                    <button className="btn" onClick={() => alert(`Registered to help with ${event.name}`)}>
                                        Volunteer
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
