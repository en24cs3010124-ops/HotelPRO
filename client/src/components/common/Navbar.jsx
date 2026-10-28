import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  const isAdmin = user && user.userType === "Admin";

  return (
    <nav className={`navbar navbar-expand-lg ${isAdmin ? "admin-navbar" : "custom-navbar"}`}>
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Brand / Logo */}
        <Link to={user ? (isAdmin ? "/adminhome" : "/userhome") : "/"} className="brand-logo text-decoration-none">
          {user && !isAdmin ? "SB Hotel" : "RoomsForUse"}
        </Link>

        {/* Navigation items on the right */}
        <div className="d-flex align-items-center gap-3">
          {!user ? (
            <>
              <Link to="/" className="nav-link-btn text-decoration-none">
                Home
              </Link>
              <Link to="/login" className="nav-link-btn text-decoration-none">
                Login
              </Link>
              <Link to="/signup" className="nav-link-btn text-decoration-none">
                SignUp
              </Link>
            </>
          ) : isAdmin ? (
            <>
              <span className="fw-medium text-white me-2">Hi, {user.name}</span>
              <button onClick={handleLogout} className="logout-btn text-white">
                Logout
              </button>
            </>
          ) : (
            <>
              <span className="fw-medium text-dark me-2">Hi {user.name}</span>
              <Link to="/userhome" className="nav-link-btn text-decoration-none">
                Rooms
              </Link>
              <Link to="/mybookings" className="nav-link-btn text-decoration-none">
                My Bookings
              </Link>
              <button
                onClick={handleLogout}
                className="btn btn-outline-danger btn-sm rounded-pill px-3 py-1"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
