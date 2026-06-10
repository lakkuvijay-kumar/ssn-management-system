import React from "react";
import EditAction from "./EditAction";
import DeleteAction from "./DeleteAction";

export default function SsnTable({ list, checkedRowId, onRowCheck, onEdit, onDelete, onSort, sortField, sortDirection }) {
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
            <p className="text-muted mb-0">No records found. Try changing the search term or add a new record.</p>
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="table table-hover mb-0" style={{ fontSize: "0.82rem" }}>
              <thead style={{ backgroundColor: "#f8f9fa", borderBottom: "2px solid #dee2e6" }}>
                <tr>
                  <th style={{ color: "#2c3e50", fontWeight: "600" }}>Enable</th>
                  <th style={{ color: "#2c3e50", fontWeight: "600" }}>#</th>
                  <th
                    style={{ color: "#2c3e50", fontWeight: "600", cursor: "pointer" }}
                    onClick={() => onSort("name")}
                  >
                    Name {sortField === "name" ? (sortDirection === "asc" ? "▲" : "▼") : ""}
                  </th>
                  <th
                    style={{ color: "#2c3e50", fontWeight: "600", cursor: "pointer" }}
                    onClick={() => onSort("email")}
                  >
                    Email {sortField === "email" ? (sortDirection === "asc" ? "▲" : "▼") : ""}
                  </th>
                  <th
                    style={{ color: "#2c3e50", fontWeight: "600", cursor: "pointer" }}
                    onClick={() => onSort("masked")}
                  >
                    Masked SSN {sortField === "masked" ? (sortDirection === "asc" ? "▲" : "▼") : ""}
                  </th>
                  <th
                    style={{ color: "#2c3e50", fontWeight: "600", cursor: "pointer" }}
                    onClick={() => onSort("dob")}
                  >
                    Birth Date {sortField === "dob" ? (sortDirection === "asc" ? "▲" : "▼") : ""}
                  </th>
                  <th
                    style={{ color: "#2c3e50", fontWeight: "600", cursor: "pointer" }}
                    onClick={() => onSort("department")}
                  >
                    Department {sortField === "department" ? (sortDirection === "asc" ? "▲" : "▼") : ""}
                  </th>
                  <th
                    style={{ color: "#2c3e50", fontWeight: "600", cursor: "pointer" }}
                    onClick={() => onSort("recordDate")}
                  >
                    Record Date {sortField === "recordDate" ? (sortDirection === "asc" ? "▲" : "▼") : ""}
                  </th>
                  <th style={{ color: "#2c3e50", fontWeight: "600" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item, index) => {
                  const rowIndex = item._originalIndex ?? index;
                  return (
                    <tr key={rowIndex} style={{ borderBottom: "1px solid #dee2e6" }}>
                      <td>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={checkedRowId === rowIndex}
                          onChange={(e) => onRowCheck(e.target.checked ? rowIndex : null)}
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
                        <EditAction
                          onClick={() => onEdit(rowIndex)}
                          disabled={checkedRowId !== rowIndex}
                          title={checkedRowId === rowIndex ? "Edit record" : "Check the box to enable edit"}
                        />
                        <DeleteAction
                          onClick={() => onDelete(rowIndex)}
                          disabled={checkedRowId !== rowIndex}
                          title={checkedRowId === rowIndex ? "Delete record" : "Check the box to enable delete"}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
