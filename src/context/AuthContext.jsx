import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // mock auth for now; replace with real auth later
  const [user, setUser] = useState(null);

  function loginAs(role = "student") {
    const templates = {
      student: { name: "Student User", email: "student@bitsa.edu", role: "student" },
      lecturer: { name: "Lecturer User", email: "lecturer@bitsa.edu", role: "lecturer" },
      admin: { name: "Admin User", email: "admin@bitsa.edu", role: "admin" },
    };
    setUser(templates[role] || templates.student);
  }

  function logout() { setUser(null); }

  return (
    <AuthContext.Provider value={{ user, loginAs, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
