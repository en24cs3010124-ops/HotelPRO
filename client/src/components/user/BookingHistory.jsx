import React, { useState, useEffect } from "react";
import api from "../../services/api";

export default function BookingHistory() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState("");

  useEffect(() => {
    fetchUserBookings();
  }, []);

  const fetchUserBookings = async () => {
    try {
      setLoading(true);
      const data = await api.getBookingsByUserId(user._id);
      setBookings(data);
    } catch (err) {
      console.error("Failed to load user bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId, roomId) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
    if (!confirmCancel) return;

    try {
      await api.cancelBooking(bookingId, roomId);
      setActionMessage("Booking cancelled successfully.");
      // Refresh list
      fetchUserBookings();
      setTimeout(() => setActionMessage(""), 3000);
    } catch (err) {
      console.error("Error cancelling booking:", err);
      alert("Failed to cancel booking. Please try again.");
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-center fw-bold mb-4" style={{ color: "#4B5563" }}>
        My Bookings
      </h2>

      {actionMessage && (
        <div className="alert alert-success text-center py-2 mb-4 mx-auto" style={{ maxWidth: "600px" }}>
          {actionMessage}
        </div>
      )}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2 text-muted">Loading your reservations...</p>
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-5">
          <h5 className="text-muted">You have no booking history yet.</h5>
          <a href="/userhome" className="btn btn-primary mt-3 px-4">
            Book a Room
          </a>
        </div>
      ) : (
        <>
          <div className="row g-4 justify-content-center">
            {bookings.map((b) => {
              const isCancelled = b.status?.toLowerCase() === "cancelled";

              return (
                <div key={b._id} className="col-lg-6 col-md-6 col-sm-12">
                  <div className="booking-card">
                    {/* Header: Room Type + Status Badge */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="fw-bold mb-0 text-dark">
                        {b.type || "Delux Room"}
                      </h5>
                      <span
                        className={
                          isCancelled
                            ? "badge-status-cancelled"
                            : "badge-status-booked"
                        }
                      >
                        {isCancelled ? "CANCELLED" : "BOOKED"}
                      </span>
                    </div>

                    {/* Booking Details matching screenshot */}
                    <div className="mb-2">
                      <span className="fw-bold text-dark">Booking ID: </span>
                      <span className="text-muted small">{b._id}</span>
                    </div>

                    <div className="mb-2">
                      <span className="fw-bold text-dark">From: </span>
                      <span className="text-muted">{b.fromdate}</span>
                      <span className="mx-2 text-muted">|</span>
                      <span className="fw-bold text-dark">To: </span>
                      <span className="text-muted">{b.todate}</span>
                    </div>

                    <div className="mb-2">
                      <span className="fw-bold text-dark">Total Amount: </span>
                      <span className="text-muted">₹{b.totalAmount}</span>
                    </div>

                    <div className="mb-3">
                      <span className="fw-bold text-dark">Customer Phone: </span>
                      <span className="text-muted">{b.phone}</span>
                    </div>

                    {/* Cancel Booking Button */}
                    {!isCancelled && (
                      <button
                        onClick={() => handleCancelBooking(b._id, b.roomid)}
                        className="cancel-booking-btn"
                      >
                        CANCEL BOOKING
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Centered Total Bookings Count matching screenshot */}
          <div className="text-center mt-5">
            <h6 className="fw-bold text-muted">Total Bookings: {bookings.length}</h6>
          </div>
        </>
      )}
    </div>
  );
}
