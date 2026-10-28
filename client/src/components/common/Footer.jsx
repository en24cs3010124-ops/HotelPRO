import React from "react";

export default function Footer() {
  return (
    <footer className="bg-white border-top py-4 text-center text-muted mt-auto">
      <div className="container">
        <p className="mb-1 fw-semibold text-dark">HotelPro / RoomsForUse Hospitality System</p>
        <p className="mb-0 small">
          © {new Date().getFullYear()} HotelPro Management Solutions. All rights reserved. Built with MERN Stack.
        </p>
      </div>
    </footer>
  );
}
