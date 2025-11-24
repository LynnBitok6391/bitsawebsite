import React, { useState, useEffect } from "react";
import "../styles/dashboard.css";

export default function DashboardLecturer() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({ title: "", content: "" });
  const user = JSON.parse(localStorage.getItem("bitsaUser"));

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bitsaBlogs")) || [];
    setBlogs(stored);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addBlog = (e) => {
    e.preventDefault();
    if (!form.title || !form.content) return;
    const newPost = {
      ...form,
      author: user?.name || "Lecturer",
      date: new Date().toLocaleDateString(),
    };
    const updated = [...blogs, newPost];
    setBlogs(updated);
    localStorage.setItem("bitsaBlogs", JSON.stringify(updated));
    setForm({ title: "", content: "" });
  };

  const deleteBlog = (index) => {
    const updated = blogs.filter((_, i) => i !== index);
    setBlogs(updated);
    localStorage.setItem("bitsaBlogs", JSON.stringify(updated));
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Welcome, {user?.name}(Lecturer)</h2>
      </div>

      <section className="blog-admin">
        <h3>Manage Blog Posts</h3>
        <form onSubmit={addBlog} className="blog-form">
          <input
            name="title"
            placeholder="Blog Title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="content"
            placeholder="Write your blog content..."
            value={form.content}
            onChange={handleChange}
            required
          />
          <button type="submit">Publish Blog</button>
        </form>

        <div className="blog-list">
          {blogs.length === 0 && <p>No posts yet.</p>}
          {blogs.map((b, i) => (
            <div key={i} className="blog-item">
              <h4>{b.title}</h4>
              <p><em>by {b.author} on {b.date}</em></p>
              <p>{b.content.slice(0, 100)}...</p>
              <button onClick={() => deleteBlog(i)}>Delete</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
