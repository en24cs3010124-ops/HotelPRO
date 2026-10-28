import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import Home from "./components/common/Home";
import Login from "./components/common/Login";
import SignUp from "./components/common/SignUp";
import About from "./components/common/About";
import ProtectedRoute from "./components/common/ProtectedRoute";

import UserHome from "./components/user/UserHome";
import BookingHistory from "./components/user/BookingHistory";
import BookingStatus from "./components/user/BookingStatus";
import AdminHome from "./components/admin/AdminHome";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/about" element={<About />} />

            {/* Ordinary User Protected Routes */}
            <Route
              path="/userhome"
              element={
                <ProtectedRoute role="Ordinary">
                  <UserHome />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mybookings"
              element={
                <ProtectedRoute role="Ordinary">
                  <BookingHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bookinghistory"
              element={
                <ProtectedRoute role="Ordinary">
                  <BookingHistory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bookingstatus"
              element={
                <ProtectedRoute role="Ordinary">
                  <BookingStatus />
                </ProtectedRoute>
              }
            />

            {/* Admin Protected Routes */}
            <Route
              path="/adminhome"
              element={
                <ProtectedRoute role="Admin">
                  <AdminHome />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
