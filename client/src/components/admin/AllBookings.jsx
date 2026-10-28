import React, { useState, useEffect } from "react";
import api from "../../services/api";

export default function AllBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadAllBookings();
  }, []);

  const loadAllBookings = async () => {
    try {
      setLoading(true);
      const data = await api.getAllBookings();
      setBookings(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId, roomId) => {
    if (!window.confirm("Admin: Cancel this reservation?")) return;

    try {
      await api.cancelBooking(bookingId, roomId);
      setMessage("Reservation cancelled successfully by Admin.");
      loadAllBookings();
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error(err);
      alert("Failed to cancel reservation.");
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-center fw-bold mb-4" style={{ color: "#4B5563" }}>
        My Bookings
      </h2>

      {message && (
        <div className="alert alert-success text-center py-2 mb-4 mx-auto" style={{ maxWidth: "600px" }}>
          {message}
        </div>
      )}

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2 text-muted">Loading all system bookings...</p>
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-5 text-muted">No bookings registered yet.</div>
      ) : (
        <>
          <div className="row g-4 justify-content-center">
            {bookings.map((b) => {
              const isCancelled = b.status?.toLowerCase() === "cancelled";

              return (
                <div key={b._id} className="col-lg-6 col-md-6 col-sm-12">
                  <div className="booking-card">
                    {/* Header */}
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

                    {!isCancelled && (
                      <button
                        onClick={() => handleCancel(b._id, b.roomid)}
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

          <div className="text-center mt-5">
            <h6 className="fw-bold text-muted">Total Bookings: {bookings.length}</h6>
          </div>
        </>
      )}
    </div>
  );
}
