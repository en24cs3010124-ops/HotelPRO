import React from "react";
import { Link } from "react-router-dom";

export default function BookingStatus() {
  return (
    <div className="container py-5 text-center">
      <div className="card shadow-sm border-0 p-5 mx-auto rounded-4" style={{ maxWidth: "550px" }}>
        <div className="mb-3 text-success">
          <i className="bi bi-check-circle-fill" style={{ fontSize: "3.5rem" }}></i>
        </div>
        <h3 className="fw-bold mb-2">Booking Confirmed!</h3>
        <p className="text-muted mb-4">
          Thank you for choosing HotelPro. Your reservation details have been secured and a confirmation has been registered to your account.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <Link to="/mybookings" className="btn btn-primary px-4 fw-semibold">
            View My Bookings
          </Link>
          <Link to="/userhome" className="btn btn-outline-secondary px-4 fw-semibold">
            Back to Rooms
          </Link>
        </div>
      </div>
    </div>
  );
}
