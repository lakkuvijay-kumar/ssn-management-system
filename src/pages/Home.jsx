import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Home() {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="container-fluid py-5" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-lg" style={{ borderRadius: "12px" }}>
              <div className="card-body p-5">
                <h1 className="text-center mb-4 fw-bold" style={{ color: "#2c3e50", fontSize: "2.2rem" }}>
                  🔐 SSN Management System
                </h1>
                <p className="text-center text-muted mb-5" style={{ fontSize: "1.1rem" }}>
                  Secure SSN record management with role-based access for auditors, customers, and administrators.
                </p>

                {currentUser ? (
                  <div className="text-center">
                    <div className="alert alert-info py-3 mb-4" role="alert">
                      <p className="mb-0">Welcome, <strong>{currentUser.firstName} {currentUser.lastName}</strong>!</p>
                      <p className="mb-1 text-muted">Email: {currentUser.email}</p>
                      {currentUser.phone && <p className="mb-1 text-muted">Phone: {currentUser.phone}</p>}
                      {currentUser.role && <p className="mb-0 text-muted">Role: {currentUser.role}</p>}
                    </div>

                    <h3 className="mb-4" style={{ color: "#34495e" }}>Available Options:</h3>

                    <div className="row g-3">
                      <div className="col-md-6">
                        <button
                          type="button"
                          onClick={() => navigate("/ssn")}
                          className="btn btn-primary btn-lg w-100"
                          style={{ borderRadius: "8px", cursor: "pointer" }}
                        >
                          📋 Manage SSN Records
                        </button>
                      </div>
                      {currentUser?.role === "Auditor" || currentUser?.role === "Admin" ? (
                        <div className="col-md-6">
                          <button
                            type="button"
                            onClick={() => navigate("/auditor")}
                            className="btn btn-warning btn-lg w-100"
                            style={{ borderRadius: "8px", cursor: "pointer" }}
                          >
                            🔍 Auditor View
                          </button>
                        </div>
                      ) : null}
                      {currentUser?.role === "Customer" || currentUser?.role === "Admin" ? (
                        <div className="col-md-6">
                          <button
                            type="button"
                            onClick={() => navigate("/customer")}
                            className="btn btn-info btn-lg w-100"
                            style={{ borderRadius: "8px", cursor: "pointer" }}
                          >
                            👤 Customer View
                          </button>
                        </div>
                      ) : null}
                      <div className="col-md-6">
                        <button
                          type="button"
                          onClick={() => navigate("/records")}
                          className="btn btn-secondary btn-lg w-100"
                          style={{ borderRadius: "8px", cursor: "pointer" }}
                        >
                          📁 View Records
                        </button>
                      </div>
                      <div className="col-md-6">
                        <button
                          type="button"
                          onClick={() => navigate("/login")}
                          className="btn btn-outline-secondary btn-lg w-100"
                          style={{ borderRadius: "8px", cursor: "pointer" }}
                        >
                          🔄 Switch User
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="mb-4" style={{ fontSize: "1rem", color: "#555" }}>
                      You need to log in to access the application.
                    </p>

                    <div className="d-flex gap-3 justify-content-center">
                      <button
                        onClick={() => navigate("/login")}
                        className="btn btn-primary btn-lg"
                        style={{ borderRadius: "8px", padding: "0.75rem 2rem" }}
                      >
                        🔐 Login
                      </button>
                      <button
                        onClick={() => navigate("/register")}
                        className="btn btn-success btn-lg"
                        style={{ borderRadius: "8px", padding: "0.75rem 2rem" }}
                      >
                        ✍️ Register
                      </button>
                    </div>

                    <div className="mt-5 p-4" style={{ backgroundColor: "#e8f4f8", borderRadius: "8px" }}>
                      <h5 className="mb-3">Demo Credentials:</h5>
                      <p className="mb-1"><strong>Email:</strong> demo@example.com</p>
                      <p className="mb-0"><strong>Password:</strong> demo123</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
