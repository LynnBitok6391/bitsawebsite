import React, { useEffect, useState } from "react";
import "../styles/blogs.css";
import dummyBlogs from "../data/dummy_blogs.json";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bitsaBlogs")) || [];
    setBlogs(stored.length > 0 ? stored : dummyBlogs);
  }, []);

  return (
    <section className="blogs-page">
      <h2>BITSA Blogs</h2>
      <div className="blogs-grid">
        {blogs.length === 0 ? (
          <p>No blogs available yet.</p>
        ) : (
          blogs.map((b, i) => (
            <div key={i} className="blog-card">
              {b.image && <img src={b.image} alt={b.title} className="blog-image" />}
              <h3>{b.title}</h3>
              <p><em>by {b.author} on {b.date}</em></p>
              <p>{b.content.slice(0, 150)}...</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
