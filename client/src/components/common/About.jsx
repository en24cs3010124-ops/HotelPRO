import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-9">
          <div className="card shadow-sm border-0 p-4 p-md-5 rounded-4 bg-white">
            <h1 className="fw-bold mb-4 text-primary">About HotelPro (Roomly)</h1>

            <p className="lead text-secondary mb-4">
              Your ultimate hotel management and booking solution, engineered for the modern hospitality era with security, scalability, and seamless user experiences at its core.
            </p>

            <h4 className="fw-bold mt-4 mb-2">Our Mission</h4>
            <p className="text-muted">
              At HotelPro, we offer a reliable and intuitive hotel management platform designed to meet the evolving needs of modern hospitality. Whether you're handling reservations, managing guest information, or processing card payments, our platform ensures seamless operations with advanced security and scalability.
            </p>

            <h4 className="fw-bold mt-4 mb-2">Key System Capabilities</h4>
            <div className="row g-3 my-2">
              <div className="col-md-6">
                <div className="p-3 border rounded-3 bg-light h-100">
                  <h6 className="fw-bold text-dark">
                    <i className="bi bi-shield-check text-primary me-2"></i> Role-Based Security
                  </h6>
                  <p className="small text-muted mb-0">
                    JWT-based authentication with distinct roles for ordinary guests and administrators, securing every reservation and sensitive operation.
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 border rounded-3 bg-light h-100">
                  <h6 className="fw-bold text-dark">
                    <i className="bi bi-calendar2-check text-primary me-2"></i> Real-Time Booking
                  </h6>
                  <p className="small text-muted mb-0">
                    Instant availability tracking, flexible date range selections, instant total rent computation, and streamlined cancellation workflows.
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 border rounded-3 bg-light h-100">
                  <h6 className="fw-bold text-dark">
                    <i className="bi bi-credit-card text-primary me-2"></i> Card Payment Simulation
                  </h6>
                  <p className="small text-muted mb-0">
                    Secure card detail capture, CVV handling, and real-time transaction verification for immediate booking confirmation.
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3 border rounded-3 bg-light h-100">
                  <h6 className="fw-bold text-dark">
                    <i className="bi bi-speedometer2 text-primary me-2"></i> Admin Operations
                  </h6>
                  <p className="small text-muted mb-0">
                    Complete administrative oversight over all bookings, room inventories, image assets, user accounts, and platform activity logs.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 text-center">
              <Link to="/" className="btn btn-primary px-4 py-2 fw-semibold me-3">
                Back to Home
              </Link>
              <Link to="/login" className="btn btn-outline-secondary px-4 py-2 fw-semibold">
                Login / Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
