import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";

export default function Home() {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [searchFilter, setSearchFilter] = useState({
    fromDate: "",
    toDate: "",
    type: "all",
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const data = await api.getAllRooms();
      setRooms(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBookClick = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    } else {
      navigate("/userhome");
    }
  };

  const filteredRooms = rooms.filter((room) => {
    if (searchFilter.type !== "all" && room.type.toLowerCase() !== searchFilter.type.toLowerCase()) {
      return false;
    }
    return true;
  });

  return (
    <div className="container py-4">
      {/* Hero Section */}
      <div className="hero-banner shadow-sm">
        <h1>Welcome to HotelPro</h1>
        <p>
          Experience premium hospitality, effortless room booking, and real-time reservation management tailored for modern travelers.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <button onClick={handleBookClick} className="btn btn-light btn-lg px-4 fw-bold text-primary">
            Explore Rooms
          </button>
          <Link to="/about" className="btn btn-outline-light btn-lg px-4 fw-semibold">
            About Our Service
          </Link>
        </div>
      </div>

      {/* Quick Filter Bar */}
      <div className="card shadow-sm border-0 p-4 mb-5 rounded-4">
        <h5 className="fw-bold mb-3 text-secondary">
          <i className="bi bi-search me-2"></i> Find Your Perfect Stay
        </h5>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label small text-muted fw-semibold">From Date</label>
            <input
              type="date"
              className="form-control"
              value={searchFilter.fromDate}
              onChange={(e) => setSearchFilter({ ...searchFilter, fromDate: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label small text-muted fw-semibold">To Date</label>
            <input
              type="date"
              className="form-control"
              value={searchFilter.toDate}
              onChange={(e) => setSearchFilter({ ...searchFilter, toDate: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label small text-muted fw-semibold">Room Type</label>
            <select
              className="form-select"
              value={searchFilter.type}
              onChange={(e) => setSearchFilter({ ...searchFilter, type: e.target.value })}
            >
              <option value="all">All Room Types</option>
              <option value="delux">Delux</option>
              <option value="ordinary">Ordinary</option>
            </select>
          </div>
        </div>
      </div>

      {/* Available Rooms Section matching screenshot styling */}
      <div className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="fw-bold text-dark mb-1">Featured Rooms</h3>
            <p className="text-muted mb-0">Discover our hand-picked luxury suites and cozy spaces</p>
          </div>
          <span className="badge bg-primary px-3 py-2 fs-6">
            {filteredRooms.length} Rooms Available
          </span>
        </div>

        <div className="row g-4">
          {filteredRooms.map((room) => {
            const photoUrl =
              room.photos && room.photos.length > 0
                ? room.photos[0]
                : "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80";

            return (
              <div key={room._id} className="col-md-4 col-sm-6">
                <div className="room-card-wrapper h-100 d-flex flex-column">
                  <img src={photoUrl} alt={`Room ${room.roomNumber}`} className="room-card-img" />
                  <div className="room-card-body d-flex flex-column flex-grow-1">
                    <h5>Room Type: {room.type}</h5>
                    <div className="room-card-meta">Room Capacity: {room.count} People</div>
                    <div className="room-card-meta">Rent: ₹{room.rent} per day</div>
                    <div className="room-card-meta">Type: {room.type}</div>
                    <div className="room-card-meta text-muted text-truncate">
                      Description: {room.description}
                    </div>

                    <div className="mt-auto pt-3">
                      <button onClick={handleBookClick} className="btn-learn-more w-100">
                        LEARN MORE / BOOK
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* About Section */}
      <div className="card border-0 bg-light p-4 rounded-4 my-5">
        <div className="row align-items-center">
          <div className="col-lg-8">
            <h4 className="fw-bold mb-2">About HotelPro / Roomly</h4>
            <p className="text-muted mb-0">
              HotelPro is your premier full-service hospitality partner. We combine state-of-the-art room management with seamless instant reservations, automated payment processing, and comprehensive administrative oversight to empower guests and hoteliers worldwide.
            </p>
          </div>
          <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">
            <Link to="/about" className="btn btn-outline-primary px-4 fw-semibold">
              Read More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
