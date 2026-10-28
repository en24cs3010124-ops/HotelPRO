import React, { useState } from "react";
import AllBookings from "./AllBookings";
import AllRooms from "./AllRooms";
import AddRoom from "./AddRoom";
import AllUsers from "./AllUsers";

export default function AdminHome() {
  const [activeTab, setActiveTab] = useState("bookings");

  return (
    <div>
      {/* Tab Navigation matching MDBTabs in screenshot */}
      <div className="admin-tab-nav">
        <button
          className={`admin-tab-btn ${activeTab === "bookings" ? "active" : ""}`}
          onClick={() => setActiveTab("bookings")}
        >
          ALL BOOKINGS
        </button>
        <button
          className={`admin-tab-btn ${activeTab === "rooms" ? "active" : ""}`}
          onClick={() => setActiveTab("rooms")}
        >
          ALL ROOMS
        </button>
        <button
          className={`admin-tab-btn ${activeTab === "addroom" ? "active" : ""}`}
          onClick={() => setActiveTab("addroom")}
        >
          ADD ROOM
        </button>
        <button
          className={`admin-tab-btn ${activeTab === "users" ? "active" : ""}`}
          onClick={() => setActiveTab("users")}
        >
          ALL USER
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content py-3">
        {activeTab === "bookings" && <AllBookings />}
        {activeTab === "rooms" && <AllRooms />}
        {activeTab === "addroom" && <AddRoom onRoomAdded={() => setActiveTab("rooms")} />}
        {activeTab === "users" && <AllUsers />}
      </div>
    </div>
  );
}
