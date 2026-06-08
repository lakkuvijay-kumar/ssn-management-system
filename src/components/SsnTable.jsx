import React from "react";

export default function SsnTable({ list, checkedRowId, onRowCheck, onEdit, onDelete }) {
  return (
    <div className="card shadow-sm" style={{ borderRadius: "10px", border: "none" }}>
      <div className="card-body p-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="card-title fw-bold m-0" style={{ color: "#2c3e50", fontSize: "1rem" }}>
            📋 Records ({list.length})
          </h5>
        </div>

        {list.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-muted mb-0">No records yet. Add your first SSN record above.</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="table table-hover mb-0" style={{ fontSize: "0.82rem" }}>
              <thead style={{ backgroundColor: "#f8f9fa", borderBottom: "2px solid #dee2e6" }}>
                <tr>
                  <th style={{ color: "#2c3e50", fontWeight: "600" }}>Enable</th>
                  <th style={{ color: "#2c3e50", fontWeight: "600" }}>#</th>
                  <th style={{ color: "#2c3e50", fontWeight: "600" }}>Name</th>
                  <th style={{ color: "#2c3e50", fontWeight: "600" }}>Email</th>
                  <th style={{ color: "#2c3e50", fontWeight: "600" }}>Masked SSN</th>
                  <th style={{ color: "#2c3e50", fontWeight: "600" }}>Birth Date</th>
                  <th style={{ color: "#2c3e50", fontWeight: "600" }}>Department</th>
                  <th style={{ color: "#2c3e50", fontWeight: "600" }}>Record Date</th>
                  <th style={{ color: "#2c3e50", fontWeight: "600" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item, index) => (
                  <tr key={index} style={{ borderBottom: "1px solid #dee2e6" }}>
                    <td>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={checkedRowId === index}
                        onChange={(e) => onRowCheck(e.target.checked ? index : null)}
                        style={{ cursor: "pointer" }}
                        title="Check to enable Edit/Delete"
                      />
                    </td>
                    <td>
                      <span className="badge bg-secondary">{index + 1}</span>
                    </td>
                    <td>
                      <strong>{item.name}</strong>
                    </td>
                    <td>
                      <small>{item.email}</small>
                    </td>
                    <td>
                      <code style={{ backgroundColor: "#f8f9fa", padding: "4px 8px", borderRadius: "4px" }}>
                        {item.masked}
                      </code>
                    </td>
                    <td>{item.dob}</td>
                    <td>{item.department || "-"}</td>
                    <td>{item.recordDate || "-"}</td>
                    <td>
                      <button
                        className={`btn btn-sm me-2 ${checkedRowId === index ? "btn-outline-warning" : "btn-outline-secondary"}`}
                        onClick={() => onEdit(index)}
                        disabled={checkedRowId !== index}
                        title={checkedRowId === index ? "Edit record" : "Check the box to enable edit"}
                        style={{ borderRadius: "6px", fontSize: "0.78rem", padding: "0.3rem 0.6rem" }}
                      >
                        ✎ Edit
                      </button>
                      <button
                        className={`btn btn-sm ${checkedRowId === index ? "btn-outline-danger" : "btn-outline-secondary"}`}
                        onClick={() => onDelete(index)}
                        disabled={checkedRowId !== index}
                        title={checkedRowId === index ? "Delete record" : "Check the box to enable delete"}
                        style={{ borderRadius: "6px", fontSize: "0.78rem", padding: "0.3rem 0.6rem" }}
                      >
                        🗑 Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
