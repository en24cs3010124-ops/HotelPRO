import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthIllustration from "./AuthIllustration";
import api from "../../services/api";

export default function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!credentials.email || !credentials.password) {
      setError("Please fill in both email and password.");
      return;
    }

    try {
      setLoading(true);
      const res = await api.login(credentials);

      // Save user & token in localStorage
      localStorage.setItem("user", JSON.stringify(res.user));
      localStorage.setItem("token", res.token || "token_" + res.user._id);

      // Redirect depending on role
      if (res.user.userType === "Admin") {
        navigate("/adminhome");
      } else {
        navigate("/userhome");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || err.message || "Invalid email or password");
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
          <h2>Login for the Account</h2>

          {error && <div className="alert alert-danger py-2 small">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="auth-input-group">
              <input
                type="email"
                name="email"
                className="auth-input"
                placeholder="Email address"
                value={credentials.email}
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
                value={credentials.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="auth-btn-primary mt-2" disabled={loading}>
              {loading ? "LOGGING IN..." : "LOGIN"}
            </button>

            <div className="auth-footer-text">
              Don't have an account? <Link to="/signup">Register</Link>
            </div>

            {/* Quick Demo Credentials Helper */}
            <div className="mt-4 p-2 bg-light rounded border text-muted small">
              <strong>Quick Demo Access:</strong>
              <div className="d-flex gap-2 mt-1">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => setCredentials({ email: "s@gmai.com", password: "admin123" })}
                >
                  Fill Admin
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => setCredentials({ email: "sid@gmail.com", password: "password123" })}
                >
                  Fill Ordinary User
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
