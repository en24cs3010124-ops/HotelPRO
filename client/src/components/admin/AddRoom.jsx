import React, { useState } from "react";
import api from "../../services/api";

export default function AddRoom({ onRoomAdded }) {
  const [formData, setFormData] = useState({
    roomNumber: "",
    count: "",
    rent: "",
    image1: "",
    image2: "",
    image3: "",
    type: "Delux",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    if (!formData.roomNumber || !formData.count || !formData.rent || !formData.description) {
      setMessage({ text: "Please fill in all required room details.", type: "danger" });
      return;
    }

    try {
      setLoading(true);

      const photos = [formData.image1, formData.image2, formData.image3].filter(
        (url) => url && url.trim().length > 0
      );

      const payload = {
        roomNumber: Number(formData.roomNumber),
        count: Number(formData.count),
        rent: Number(formData.rent),
        photos: photos.length > 0 ? photos : [
          "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
        ],
        type: formData.type,
        description: formData.description,
      };

      await api.addRoom(payload);
      setMessage({ text: "Room added successfully!", type: "success" });

      // Reset form
      setFormData({
        roomNumber: "",
        count: "",
        rent: "",
        image1: "",
        image2: "",
        image3: "",
        type: "Delux",
        description: "",
      });

      if (onRoomAdded) onRoomAdded();
    } catch (err) {
      console.error(err);
      setMessage({
        text: err.response?.data?.msg || err.message || "Failed to add room.",
        type: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="admin-card-container" style={{ maxWidth: "800px" }}>
        {/* Blue Header matching screenshot */}
        <div className="admin-header-blue">
          <h3>Add a New Room</h3>
        </div>

        <div className="p-4 p-md-5">
          {message.text && (
            <div className={`alert alert-${message.type} py-2 small`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Row 1: Room Number, Capacity, Rent */}
            <div className="row g-3 mb-4">
              <div className="col-md-4">
                <label className="form-label small fw-semibold text-secondary">Room Number</label>
                <input
                  type="number"
                  name="roomNumber"
                  className="form-control"
                  placeholder="Room Number"
                  value={formData.roomNumber}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label small fw-semibold text-secondary">Max. Capacity</label>
                <input
                  type="number"
                  name="count"
                  className="form-control"
                  placeholder="No. of people"
                  value={formData.count}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label small fw-semibold text-secondary">Room Rent</label>
                <input
                  type="number"
                  name="rent"
                  className="form-control"
                  placeholder="Rent per day"
                  value={formData.rent}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Room Photos */}
            <div className="mb-4">
              <label className="form-label small fw-semibold text-secondary">Room Photos</label>
              <input
                type="url"
                name="image1"
                className="form-control mb-2"
                placeholder="Image 1 URL"
                value={formData.image1}
                onChange={handleChange}
              />
              <input
                type="url"
                name="image2"
                className="form-control mb-2"
                placeholder="Image 2 URL"
                value={formData.image2}
                onChange={handleChange}
              />
              <input
                type="url"
                name="image3"
                className="form-control"
                placeholder="Image 3 URL"
                value={formData.image3}
                onChange={handleChange}
              />
            </div>

            {/* Room Type: Radio Buttons matching screenshot */}
            <div className="mb-4">
              <label className="form-label small fw-semibold text-secondary d-block">Room Type</label>
              <div className="d-flex gap-4">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="type"
                    id="typeDelux"
                    value="Delux"
                    checked={formData.type === "Delux"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="typeDelux">
                    Delux
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="type"
                    id="typeNonDelux"
                    value="Non-Delux"
                    checked={formData.type === "Non-Delux"}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="typeNonDelux">
                    Non-Delux
                  </label>
                </div>
              </div>
            </div>

            {/* Room Description */}
            <div className="mb-4">
              <label className="form-label small fw-semibold text-secondary">Room Description</label>
              <textarea
                name="description"
                rows="4"
                className="form-control"
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary px-5 py-2 fw-semibold"
                disabled={loading}
              >
                {loading ? "ADDING ROOM..." : "ADD ROOM"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
