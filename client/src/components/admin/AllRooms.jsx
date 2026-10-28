import React, { useState, useEffect } from "react";
import api from "../../services/api";

export default function AllRooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      setLoading(true);
      const data = await api.getAllRooms();
      setRooms(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="admin-card-container">
        {/* Blue Header matching screenshot */}
        <div className="admin-header-blue">
          <h3>Hotel Room Booking History</h3>
          <p>Total Rooms: {rooms.length}</p>
        </div>

        {/* Table Content */}
        <div className="table-responsive p-3">
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status"></div>
            </div>
          ) : (
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col" className="fw-semibold text-secondary">Room ID</th>
                  <th scope="col" className="fw-semibold text-secondary">Room Number</th>
                  <th scope="col" className="fw-semibold text-secondary">Capacity</th>
                  <th scope="col" className="fw-semibold text-secondary">Rent / Day</th>
                  <th scope="col" className="fw-semibold text-secondary">Type</th>
                  <th scope="col" className="fw-semibold text-secondary">Description</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => {
                  const isDelux = room.type?.toLowerCase().includes("delux");

                  return (
                    <tr key={room._id}>
                      <td className="small text-muted font-monospace">{room._id}</td>
                      <td className="fw-bold">{room.roomNumber}</td>
                      <td>{room.count}</td>
                      <td className="fw-semibold">₹ {room.rent}</td>
                      <td>
                        <span className={isDelux ? "type-badge-delux" : "type-badge-ordinary"}>
                          {room.type}
                        </span>
                      </td>
                      <td className="text-muted small text-truncate" style={{ maxWidth: "250px" }}>
                        {room.description}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
