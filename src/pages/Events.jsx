import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/events.css";
import dummyEvents from "../data/dummy_events.json";

export default function Events() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bitsaEvents")) || [];
    const eventsData = stored.length > 0 ? stored : dummyEvents;

    // Add status to events based on date (some ongoing, some upcoming)
    const eventsWithStatus = eventsData.map((event, index) => ({
      ...event,
      // Make first 2 events "ongoing" and rest "upcoming"
      status: index < 2 ? "ongoing" : "upcoming"
    }));

    setEvents(eventsWithStatus);
  }, []);

  const handleRegister = (eventTitle) => {
    if (!user) {
      alert("Please login first to register for events!");
      navigate("/login");
    } else {
      alert(`Successfully registered for "${eventTitle}"! We'll send you event details via email.`);
    }
  };

  return (
    <section className="events-page">
      <h2>BITSA Events</h2>
      <p style={{ textAlign: "center", color: "var(--text-muted)", marginBottom: "2rem" }}>
        Join us for exciting tech events, workshops, and networking opportunities
      </p>
      <div className="events-grid">
        {events.length === 0 ? (
          <p>No events yet.</p>
        ) : (
          events.map((ev, i) => (
            <div key={i} className="event-card">
              {ev.image && <img src={ev.image} alt={ev.title} className="event-image" />}

              {/* Status Badge */}
              <div style={{ marginTop: "1rem" }}>
                <span
                  className={`event-status ${ev.status === "ongoing" ? "status-ongoing" : "status-upcoming"}`}
                  style={{
                    padding: "0.3rem 0.8rem",
                    borderRadius: "20px",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    textTransform: "uppercase",
                    background: ev.status === "ongoing" ? "#d1fae5" : "#dbeafe",
                    color: ev.status === "ongoing" ? "#065f46" : "#1e40af"
                  }}
                >
                  {ev.status === "ongoing" ? "🔴 ONGOING" : "📅 UPCOMING"}
                </span>
              </div>

              <h3 style={{ marginTop: "1rem" }}>{ev.title}</h3>
              <p><strong>Date:</strong> {ev.date}</p>
              <p style={{ marginTop: "0.5rem" }}>{ev.desc}</p>

              {/* Register Button */}
              <button
                className="btn"
                onClick={() => handleRegister(ev.title)}
                style={{
                  marginTop: "1rem",
                  width: "100%",
                  background: ev.status === "ongoing" ? "#10b981" : "var(--color-accent)"
                }}
              >
                {ev.status === "ongoing" ? "Join Now" : "Register"}
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
