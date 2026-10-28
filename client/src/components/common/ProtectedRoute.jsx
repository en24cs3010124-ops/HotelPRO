import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const user = JSON.parse(localStorage.getItem("user") || "null");

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.userType !== role) {
    // If ordinary tries to access admin, or admin tries to access user page
    return user.userType === "Admin" ? (
      <Navigate to="/adminhome" replace />
    ) : (
      <Navigate to="/userhome" replace />
    );
  }

  return children;
}
