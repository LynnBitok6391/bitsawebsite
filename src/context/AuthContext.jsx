import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("bitsa_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [blogs, setBlogs] = useState(() => {
    try {
      const saved = localStorage.getItem("bitsa_blogs");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [profiles, setProfiles] = useState(() => {
    try {
      const saved = localStorage.getItem("bitsa_profiles");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("bitsa_user", JSON.stringify(user));
    } catch { }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem("bitsa_blogs", JSON.stringify(blogs));
    } catch { }
  }, [blogs]);

  useEffect(() => {
    try {
      localStorage.setItem("bitsa_profiles", JSON.stringify(profiles));
    } catch { }
  }, [profiles]);

  function loginAs(role = "student") {
    const templates = {
      student: {
        id: "student_1",
        name: "Student User",
        email: "student@bitsa.edu",
        role: "student"
      },
      lecturer: {
        id: "lecturer_1",
        name: "Lecturer User",
        email: "lecturer@bitsa.edu",
        role: "lecturer"
      },
      admin: {
        id: "admin_1",
        name: "Admin User",
        email: "admin@bitsa.edu",
        role: "admin"
      },
      alumni: {
        id: "alumni_1",
        name: "Alumni User",
        email: "alumni@bitsa.edu",
        role: "alumni"
      },
    };
    setUser(templates[role] || templates.student);
  }

  function logout() {
    setUser(null);
  }

  function updateProfile(userId, profileData) {
    setProfiles(prev => ({
      ...prev,
      [userId]: {
        ...prev[userId],
        ...profileData,
        updatedAt: new Date().toISOString()
      }
    }));
  }

  function getProfile(userId) {
    return profiles[userId] || null;
  }

  function submitBlog(blogData) {
    const newBlog = {
      id: `blog_${Date.now()}`,
      ...blogData,
      authorId: user.id,
      authorName: user.name,
      status: "pending",
      createdAt: new Date().toISOString()
    };
    setBlogs(prev => [...prev, newBlog]);
    return newBlog;
  }

  function approveBlog(blogId) {
    setBlogs(prev => prev.map(blog =>
      blog.id === blogId ? { ...blog, status: "approved", approvedAt: new Date().toISOString() } : blog
    ));
  }

  function rejectBlog(blogId) {
    setBlogs(prev => prev.map(blog =>
      blog.id === blogId ? { ...blog, status: "rejected", rejectedAt: new Date().toISOString() } : blog
    ));
  }

  function deleteBlog(blogId) {
    setBlogs(prev => prev.filter(blog => blog.id !== blogId));
  }

  function getApprovedBlogs() {
    return blogs.filter(blog => blog.status === "approved");
  }

  function getPendingBlogs() {
    return blogs.filter(blog => blog.status === "pending");
  }

  function getUserBlogs(userId) {
    return blogs.filter(blog => blog.authorId === userId);
  }

  return (
    <AuthContext.Provider value={{
      user,
      loginAs,
      logout,
      updateProfile,
      getProfile,
      submitBlog,
      approveBlog,
      rejectBlog,
      deleteBlog,
      getApprovedBlogs,
      getPendingBlogs,
      getUserBlogs,
      blogs
    }}>
      {children}
    </AuthContext.Provider>
  );
}
