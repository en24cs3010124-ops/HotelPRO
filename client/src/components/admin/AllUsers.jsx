import React, { useState, useEffect } from "react";
import api from "../../services/api";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await api.getAllUsers();
      setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-4">
      <div className="admin-card-container">
        {/* Dark Header matching screenshot */}
        <div className="admin-header-dark">
          <h3>All Registered Users</h3>
          <p>Total Users: {users.length}</p>
        </div>

        {/* Users Table */}
        <div className="table-responsive p-3">
          {loading ? (
            <div className="text-center py-4">
              <div className="spinner-border text-primary" role="status"></div>
            </div>
          ) : (
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col" className="fw-semibold text-secondary">User ID</th>
                  <th scope="col" className="fw-semibold text-secondary">Name</th>
                  <th scope="col" className="fw-semibold text-secondary">Email</th>
                  <th scope="col" className="fw-semibold text-secondary">Phone</th>
                  <th scope="col" className="fw-semibold text-secondary">Type</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => {
                  const isAdmin = u.userType === "Admin";

                  return (
                    <tr key={u._id}>
                      <td className="small text-muted font-monospace">{u._id}</td>
                      <td className="fw-medium">{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.phone}</td>
                      <td>
                        <span className={isAdmin ? "role-badge-admin" : "role-badge-ordinary"}>
                          {u.userType}
                        </span>
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
