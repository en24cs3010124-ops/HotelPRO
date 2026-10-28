import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthIllustration from "./AuthIllustration";
import api from "../../services/api";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    userType: "Ordinary", // Default Ordinary or Admin
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formData.name || !formData.email || !formData.password || !formData.phone) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await api.signUp(formData);
      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || err.message || "Email already register");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        {/* Left Side: Graphic / Illustration matching screenshot */}
        <div className="auth-illustration">
          <AuthIllustration />
        </div>

        {/* Right Side: Form */}
        <div className="auth-form-side">
          <h2>Register for the Account</h2>

          {error && <div className="alert alert-danger py-2 small">{error}</div>}
          {success && <div className="alert alert-success py-2 small">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="auth-input-group">
              <input
                type="text"
                name="name"
                className="auth-input"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-input-group">
              <input
                type="email"
                name="email"
                className="auth-input"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-input-group">
              <input
                type="password"
                name="password"
                className="auth-input"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-input-group">
              <input
                type="text"
                name="phone"
                className="auth-input"
                placeholder="Enter Mobile no."
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            {/* Select User dropdown matching screenshot button */}
            <div className="mb-3">
              <select
                name="userType"
                className="auth-select"
                value={formData.userType}
                onChange={handleChange}
              >
                <option value="Ordinary">ORDINARY</option>
                <option value="Admin">ADMIN</option>
              </select>
            </div>

            <button type="submit" className="auth-btn-primary" disabled={loading}>
              {loading ? "REGISTERING..." : "REGISTER"}
            </button>

            <div className="auth-footer-text">
              Had an account? <Link to="/login">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
