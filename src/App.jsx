import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import RequireAuth from "./components/RequireAuth";
import Home from "./pages/Home";
import SsnPage from "./pages/SsnPage";
import Auditor from "./pages/Auditor";
import Customer from "./pages/Customer";
import Records from "./pages/Records";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import NotFound from "./pages/NotFound";

function App() {
  const { currentUser, logout, loading } = useContext(AuthContext);
  const isAuditorOrAdmin = currentUser?.role === "Auditor" || currentUser?.role === "Admin";
  const isCustomerOrAdmin = currentUser?.role === "Customer" || currentUser?.role === "Admin";

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container-fluid">
          <NavLink className="navbar-brand fw-bold" to="/" style={{ fontSize: "1.3rem", color: "#2c3e50" }}>
            🔐 SSN App
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              {currentUser && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/ssn">
                      📋 SSN Management
                    </NavLink>
                  </li>
                  {isAuditorOrAdmin && (
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/auditor">
                        🔍 Auditor
                      </NavLink>
                    </li>
                  )}
                  {isCustomerOrAdmin && (
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/customer">
                        👤 Customer
                      </NavLink>
                    </li>
                  )}
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/records">
                      📁 Records
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <span className="nav-link disabled text-muted" aria-disabled="true" style={{ fontSize: "0.9rem", cursor: "default" }}>
                      {currentUser.firstName} {currentUser.lastName}
                    </span>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link btn btn-outline-danger btn-sm"
                      onClick={handleLogout}
                      style={{ borderRadius: "4px" }}
                    >
                      🚪 Logout
                    </button>
                  </li>
                </>
              )}
              {!currentUser && !loading && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      🔐 Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register">
                      ✍️ Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/ssn"
          element={
            <RequireAuth>
              <SsnPage />
            </RequireAuth>
          }
        />
        <Route
          path="/auditor"
          element={
            <RequireAuth allowedRoles={["Auditor", "Admin"]}>
              <Auditor />
            </RequireAuth>
          }
        />
        <Route
          path="/customer"
          element={
            <RequireAuth allowedRoles={["Customer", "Admin"]}>
              <Customer />
            </RequireAuth>
          }
        />
        <Route
          path="/records"
          element={
            <RequireAuth>
              <Records />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
