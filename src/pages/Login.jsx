import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { isValidEmail, getAllUsers } from "../utils/helpers";

export default function Login() {
  const [email, setEmail] = useState("demo@example.com");
  const [password, setPassword] = useState("demo123");
  const [errors, setErrors] = useState({});
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const validateForm = () => {
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!isValidEmail(email)) newErrors.email = "Email is invalid";
    if (!password) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Check if user exists
    const users = getAllUsers();
    const user = users.find((u) => u.email === email);

    if (!user) {
      setMessages([{ text: "❌ User not found. Please register first.", type: "danger" }]);
      return;
    }

    if (user.password !== password) {
      setMessages([{ text: "❌ Incorrect password.", type: "danger" }]);
      return;
    }

    // Login successful
    login(user);
    setMessages([{ text: "✅ Login successful! Redirecting...", type: "success" }]);
    setTimeout(() => navigate("/"), 1500);
  };

  return (
    <div className="container-fluid py-5" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow-lg" style={{ borderRadius: "12px" }}>
            <div className="card-body p-5">
              <h2 className="card-title text-center mb-4 fw-bold" style={{ color: "#2c3e50" }}>🔐 Login</h2>

              {messages.map((msg) => (
                <div key={msg.text} className={`alert alert-${msg.type} alert-dismissible fade show py-3`} role="alert">
                  {msg.text}
                </div>
              ))}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label fw-500">Email</label>
                  <input
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: "" });
                    }}
                    placeholder="Enter your email"
                    style={{ borderRadius: "8px" }}
                  />
                  {errors.email && <div className="invalid-feedback d-block">{errors.email}</div>}
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="form-label fw-500">Password</label>
                  <input
                    type="password"
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    id="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) setErrors({ ...errors, password: "" });
                    }}
                    placeholder="Enter your password"
                    style={{ borderRadius: "8px" }}
                  />
                  {errors.password && <div className="invalid-feedback d-block">{errors.password}</div>}
                </div>

                <button type="submit" className="btn btn-primary w-100 mb-3 fw-500" style={{ borderRadius: "8px" }}>
                  Login
                </button>
              </form>

              <hr />

              <p className="text-center text-muted mb-3">
                Don't have an account? <Link to="/register" className="fw-bold">Register here</Link>
              </p>

              <div className="alert alert-info py-2 px-3" style={{ fontSize: "0.85rem", borderRadius: "8px" }}>
                <strong>Demo Account:</strong><br />
                Email: demo@example.com<br />
                Password: demo123<br />
                Name: Demo User<br />
                Phone: 1234567890
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
