import React, { useEffect, useState } from "react";
import "../styles/events.css";
import dummyEvents from "../data/dummy_events.json";

export default function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bitsaEvents")) || [];
    setEvents(stored.length > 0 ? stored : dummyEvents);
  }, []);

  return (
    <section className="events-page">
      <h2>Upcoming Events</h2>
      <div className="events-grid">
        {events.length === 0 ? (
          <p>No events yet.</p>
        ) : (
          events.map((ev, i) => (
            <div key={i} className="event-card">
              {ev.image && <img src={ev.image} alt={ev.title} className="event-image" />}
              <h3>{ev.title}</h3>
              <p><strong>Date:</strong> {ev.date}</p>
              <p>{ev.desc}</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
