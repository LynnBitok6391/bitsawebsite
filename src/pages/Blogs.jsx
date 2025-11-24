import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import dummyBlogs from "../data/dummy_blogs.json";
import "../styles/blogs.css";

export default function Blogs() {
  const { getApprovedBlogs } = useContext(AuthContext);
  const approvedBlogs = getApprovedBlogs();

  // Show approved student blogs if they exist, otherwise show dummy blogs
  const blogsToDisplay = approvedBlogs.length > 0 ? approvedBlogs : dummyBlogs.map((blog, index) => ({
    id: `dummy_${index}`,
    title: blog.title,
    authorName: blog.author,
    content: blog.content,
    createdAt: blog.date,
    approvedAt: blog.date,
    image: blog.image,
    tags: ""
  }));

  return (
    <section className="blogs-page">
      <h2>BITSA Blogs</h2>
      <p style={{ textAlign: "center", color: "var(--text-muted)", marginBottom: "2rem" }}>
        Insights and experiences shared by our BITSA community
      </p>
      <div className="blogs-grid">
        {blogsToDisplay.map((blog) => (
          <div key={blog.id} className="blog-card">
            {blog.image && <img src={blog.image} alt={blog.title} className="blog-image" />}
            <h3>{blog.title}</h3>
            <p><em>by {blog.authorName}</em></p>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
              Published: {new Date(blog.approvedAt || blog.createdAt).toLocaleDateString()}
            </p>
            {blog.tags && (
              <div style={{ marginTop: "0.5rem", fontSize: "0.8rem" }}>
                <span style={{ color: "var(--color-accent)", fontWeight: "bold" }}>
                  Tags: {blog.tags}
                </span>
              </div>
            )}
            <p style={{ marginTop: "1rem" }}>{blog.content.slice(0, 200)}...</p>
          </div>
        ))}
      </div>
    </section>
  );
}
