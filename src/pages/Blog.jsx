import React, { useEffect, useState } from "react";
import "../styles/blog.css";

export default function Blog() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("bitsaPosts")) || [];
    setPosts(storedPosts);
  }, []);

  return (
    <section className="blog-section">
      <h2>BITSA Blog</h2>
      <div className="blog-grid">
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <div key={index} className="blog-card">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <small>By {post.author}</small>
            </div>
          ))
        ) : (
          <p>No blog posts yet.</p>
        )}
      </div>
    </section>
  );
}
