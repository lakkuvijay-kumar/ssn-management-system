import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Auditor() {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();
  const auditorConfig = {
    title: "Auditor Page",
    description: "Auditors can view the complete SSN records below.",
    note: "This auditor view displays the full SSN number for each record.",
  };

  const loadRecords = () => {
    const saved = JSON.parse(localStorage.getItem("ssnList")) || [];
    setRecords(saved);
  };

  useEffect(() => {
    loadRecords();
  }, []);

  return (
    <div className="container mt-5">
      <h2>{auditorConfig.title}</h2>
      <p>{auditorConfig.description}</p>
      <div className="text-muted mb-3">{auditorConfig.note}</div>

      <div className="mb-3 d-flex flex-wrap gap-2">
        <button className="btn btn-sm btn-outline-primary" onClick={loadRecords}>
          🔄 Refresh Records
        </button>
        <button className="btn btn-sm btn-outline-secondary" onClick={() => navigate("/ssn")}>{
          "📋 Go to SSN Management"
        }</button>
      </div>
      <div className="card shadow-sm mt-4">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="card-title mb-0">SSN Records</h5>
            <small className="text-muted">Total: {records.length}</small>
          </div>
          {records.length === 0 ? (
            <p className="text-muted">No SSN records available yet.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table className="table table-bordered table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Full SSN</th>
                    <th>Date of Birth</th>
                    <th>Department</th>
                    <th>Record Date</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.email || "-"}</td>
                      <td>{item.original}</td>
                      <td>{item.dob}</td>
                      <td>{item.department || "-"}</td>
                      <td>{item.recordDate || "-"}</td>
                      <td>{item.address}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
