import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="container-fluid py-5" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <div className="container">
        <div className="text-center py-5">
          <h1 style={{ fontSize: "4rem", color: "#e74c3c" }}>404</h1>
          <h2 className="mb-3">Page Not Found</h2>
          <p className="text-muted mb-4">The page you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate("/")}
            className="btn btn-primary"
            style={{ borderRadius: "8px" }}
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}
