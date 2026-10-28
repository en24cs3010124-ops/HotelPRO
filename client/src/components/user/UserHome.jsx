import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GetRooms from "./GetRooms";
import api from "../../services/api";

export default function UserHome() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  // Booking Modal State
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [bookingDays, setBookingDays] = useState(1);
  const [cardData, setCardData] = useState({
    cardholdername: user.name || "",
    cardnumber: "",
    cvvcode: "",
    expmonthyear: "",
  });
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState("");

  useEffect(() => {
    loadRooms();
    // Default dates (today and tomorrow in YYYY-MM-DD)
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const formatYMD = (d) => d.toISOString().split("T")[0];
    setFromDate(formatYMD(today));
    setToDate(formatYMD(tomorrow));
  }, []);

  const loadRooms = async () => {
    try {
      setLoading(true);
      const data = await api.getAllRooms();
      setRooms(data);
    } catch (err) {
      console.error("Failed to load rooms:", err);
    } finally {
      setLoading(false);
    }
  };

  // Recalculate days when dates change
  useEffect(() => {
    if (fromDate && toDate) {
      const d1 = new Date(fromDate);
      const d2 = new Date(toDate);
      const diffTime = d2 - d1;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setBookingDays(diffDays > 0 ? diffDays : 1);
    }
  }, [fromDate, toDate]);

  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
    setBookingError("");
    setBookingSuccess("");
    setCardData({
      cardholdername: user.name || "",
      cardnumber: "",
      cvvcode: "",
      expmonthyear: "",
    });
  };

  const handleCardChange = (e) => {
    setCardData({
      ...cardData,
      [e.target.name]: e.target.value,
    });
  };

  const handleConfirmBooking = async (e) => {
    e.preventDefault();
    setBookingError("");

    if (!cardData.cardholdername || !cardData.cardnumber || !cardData.cvvcode || !cardData.expmonthyear) {
      setBookingError("Please provide all card details to complete payment.");
      return;
    }

    try {
      setBookingLoading(true);

      // Format date to DD-MM-YYYY to match prompt screenshots
      const formatDMY = (dateStr) => {
        const parts = dateStr.split("-");
        return parts.length === 3 ? `${parts[2]}-${parts[1]}-${parts[0]}` : dateStr;
      };

      const totalRent = selectedRoom.rent * bookingDays;

      const payload = {
        roomid: selectedRoom._id,
        roomNumber: selectedRoom.roomNumber,
        type: `${selectedRoom.type} Room`,
        userid: user._id,
        username: user.name,
        fromdate: formatDMY(fromDate),
        todate: formatDMY(toDate),
        totalAmount: totalRent,
        totaldays: bookingDays,
        phone: user.phone || "9704927807",
        cardDetails: cardData,
      };

      const res = await api.bookRoom(payload);
      setBookingSuccess("Booking Confirmed Successfully! Redirecting to My Bookings...");

      setTimeout(() => {
        setSelectedRoom(null);
        navigate("/mybookings");
      }, 1500);
    } catch (err) {
      console.error(err);
      setBookingError(err.response?.data?.msg || err.message || "Failed to book room");
    } finally {
      setBookingLoading(false);
    }
  };

  const filteredRooms = rooms.filter((r) => {
    if (typeFilter !== "all" && r.type.toLowerCase() !== typeFilter.toLowerCase()) {
      return false;
    }
    return true;
  });

  return (
    <div className="container py-4">
      {/* Date & Filter Bar */}
      <div className="card shadow-sm border-0 p-3 mb-4 rounded-3 bg-white">
        <div className="row g-3 align-items-center">
          <div className="col-md-4">
            <label className="form-label small fw-semibold text-muted mb-1">Check-in Date</label>
            <input
              type="date"
              className="form-control"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label small fw-semibold text-muted mb-1">Check-out Date</label>
            <input
              type="date"
              className="form-control"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label small fw-semibold text-muted mb-1">Filter by Type</label>
            <select
              className="form-select"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Rooms</option>
              <option value="delux">Delux</option>
              <option value="ordinary">Ordinary</option>
            </select>
          </div>
        </div>
      </div>

      {/* Rooms Showcase */}
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2 text-muted">Loading available rooms...</p>
        </div>
      ) : (
        <GetRooms rooms={filteredRooms} onSelectRoom={handleSelectRoom} />
      )}

      {/* Booking Modal */}
      {selectedRoom && (
        <div className="modal-overlay">
          <div className="modal-content-box">
            <div className="p-3 bg-primary text-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0 fw-bold">Book Room #{selectedRoom.roomNumber} - {selectedRoom.type}</h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                onClick={() => setSelectedRoom(null)}
              ></button>
            </div>

            <div className="p-4">
              {bookingError && <div className="alert alert-danger py-2 small">{bookingError}</div>}
              {bookingSuccess && <div className="alert alert-success py-2 small">{bookingSuccess}</div>}

              {/* Room Snapshot */}
              <div className="d-flex gap-3 mb-3 p-3 bg-light rounded border">
                <img
                  src={
                    selectedRoom.photos?.[0] ||
                    "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=400&q=80"
                  }
                  alt="Room"
                  style={{ width: "120px", height: "80px", objectFit: "cover", borderRadius: "6px" }}
                />
                <div>
                  <h6 className="fw-bold mb-1">{selectedRoom.type} Suite</h6>
                  <p className="small text-muted mb-1">Capacity: {selectedRoom.count} Guest(s)</p>
                  <p className="small text-muted mb-0">
                    Dates: <strong>{fromDate}</strong> to <strong>{toDate}</strong> ({bookingDays} Day{bookingDays > 1 ? "s" : ""})
                  </p>
                  <h5 className="text-primary fw-bold mt-1 mb-0">
                    Total: ₹{selectedRoom.rent * bookingDays}
                  </h5>
                </div>
              </div>

              {/* Payment / Card Details Form */}
              <form onSubmit={handleConfirmBooking}>
                <h6 className="fw-bold text-secondary mb-3">
                  <i className="bi bi-credit-card me-1"></i> Enter Payment Information
                </h6>

                <div className="mb-2">
                  <label className="form-label small fw-semibold text-muted mb-1">Cardholder Name</label>
                  <input
                    type="text"
                    name="cardholdername"
                    className="form-control"
                    placeholder="e.g. Sid Sharma"
                    value={cardData.cardholdername}
                    onChange={handleCardChange}
                    required
                  />
                </div>

                <div className="mb-2">
                  <label className="form-label small fw-semibold text-muted mb-1">Card Number</label>
                  <input
                    type="text"
                    name="cardnumber"
                    maxLength="19"
                    className="form-control"
                    placeholder="4242 4242 4242 4242"
                    value={cardData.cardnumber}
                    onChange={handleCardChange}
                    required
                  />
                </div>

                <div className="row g-2 mb-3">
                  <div className="col-6">
                    <label className="form-label small fw-semibold text-muted mb-1">Expiry (MM/YY)</label>
                    <input
                      type="text"
                      name="expmonthyear"
                      maxLength="5"
                      className="form-control"
                      placeholder="12/28"
                      value={cardData.expmonthyear}
                      onChange={handleCardChange}
                      required
                    />
                  </div>
                  <div className="col-6">
                    <label className="form-label small fw-semibold text-muted mb-1">CVV</label>
                    <input
                      type="password"
                      name="cvvcode"
                      maxLength="4"
                      className="form-control"
                      placeholder="123"
                      value={cardData.cvvcode}
                      onChange={handleCardChange}
                      required
                    />
                  </div>
                </div>

                <div className="d-flex justify-content-end gap-2 pt-2 border-top">
                  <button
                    type="button"
                    className="btn btn-secondary px-3"
                    onClick={() => setSelectedRoom(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary px-4 fw-bold"
                    disabled={bookingLoading}
                  >
                    {bookingLoading ? "Processing Payment..." : `Pay ₹${selectedRoom.rent * bookingDays} & Book`}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
