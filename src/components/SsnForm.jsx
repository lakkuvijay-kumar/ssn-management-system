import React from "react";

export default function SsnForm({
  ssn,
  name,
  dob,
  address,
  email,
  department,
  recordDate,
  errors,
  editIndex,
  onSsnChange,
  onNameChange,
  onDobChange,
  onAddressChange,
  onEmailChange,
  onDepartmentChange,
  onRecordDateChange,
  onSubmit,
  onCancel,
}) {
  return (
    <div className="card shadow-sm" style={{ borderRadius: "10px", border: "none" }}>
      <div className="card-body p-3">
        <h5 className="card-title fw-bold mb-3" style={{ color: "#2c3e50", fontSize: "1rem" }}>
          {editIndex !== null ? "📝 Edit Record" : "➕ Add New Record"}
        </h5>

        <form onSubmit={onSubmit}>
          <div className="mb-2">
            <label htmlFor="name" className="form-label fw-500" style={{ fontSize: "0.7rem", marginBottom: "0.1rem" }}>
              Name
            </label>
            <input
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              id="name"
              placeholder="Enter full name"
              value={name}
              onChange={onNameChange}
              required
              style={{ borderRadius: "8px", fontSize: "0.72rem", padding: "0.35rem" }}
            />
            {errors.name && <div className="invalid-feedback d-block text-danger small mt-1">{errors.name}</div>}
          </div>

          <div className="mb-2">
            <label htmlFor="dob" className="form-label fw-500" style={{ fontSize: "0.7rem", marginBottom: "0.1rem" }}>
              Date of Birth
            </label>
            <input
              type="date"
              className={`form-control ${errors.dob ? "is-invalid" : ""}`}
              id="dob"
              value={dob}
              onChange={onDobChange}
              required
              style={{ borderRadius: "8px", fontSize: "0.72rem", padding: "0.35rem" }}
            />
            {errors.dob && <div className="invalid-feedback d-block text-danger small mt-1">{errors.dob}</div>}
          </div>

          <div className="mb-2">
            <label htmlFor="address" className="form-label fw-500" style={{ fontSize: "0.7rem", marginBottom: "0.1rem" }}>
              Address
            </label>
            <textarea
              className={`form-control ${errors.address ? "is-invalid" : ""}`}
              id="address"
              placeholder="Enter address"
              value={address}
              onChange={onAddressChange}
              rows="2"
              required
              style={{ borderRadius: "8px", resize: "none", fontSize: "0.72rem", padding: "0.35rem" }}
            />
            {errors.address && <div className="invalid-feedback d-block text-danger small mt-1">{errors.address}</div>}
          </div>

          <div className="mb-2">
            <label htmlFor="email" className="form-label fw-500" style={{ fontSize: "0.7rem", marginBottom: "0.1rem" }}>
              Email
            </label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              id="email"
              placeholder="Enter email address"
              value={email}
              onChange={onEmailChange}
              required
              style={{ borderRadius: "8px", fontSize: "0.72rem", padding: "0.35rem" }}
            />
            {errors.email && <div className="invalid-feedback d-block text-danger small mt-1">{errors.email}</div>}
          </div>

          <div className="mb-2">
            <label htmlFor="department" className="form-label fw-500" style={{ fontSize: "0.7rem", marginBottom: "0.1rem" }}>
              Department
            </label>
            <select
              id="department"
              className={`form-select ${errors.department ? "is-invalid" : ""}`}
              value={department}
              onChange={onDepartmentChange}
              required
              style={{ borderRadius: "8px", fontSize: "0.72rem", padding: "0.35rem" }}
            >
              <option value="">Select department</option>
              <option value="Finance">Finance</option>
              <option value="Human Resources">Human Resources</option>
              <option value="IT">IT</option>
              <option value="Operations">Operations</option>
              <option value="Customer Service">Customer Service</option>
            </select>
            {errors.department && <div className="invalid-feedback d-block text-danger small mt-1">{errors.department}</div>}
          </div>

          <div className="mb-2">
            <label htmlFor="recordDate" className="form-label fw-500" style={{ fontSize: "0.7rem", marginBottom: "0.1rem" }}>
              Record Date
            </label>
            <input
              type="date"
              className={`form-control ${errors.recordDate ? "is-invalid" : ""}`}
              id="recordDate"
              value={recordDate}
              onChange={onRecordDateChange}
              required
              style={{ borderRadius: "8px", fontSize: "0.72rem", padding: "0.35rem" }}
            />
            {errors.recordDate && <div className="invalid-feedback d-block text-danger small mt-1">{errors.recordDate}</div>}
          </div>

          <div className="mb-2">
            <label htmlFor="ssn" className="form-label fw-500" style={{ fontSize: "0.7rem", marginBottom: "0.1rem" }}>
              Social Security Number
            </label>
            <input
              type="text"
              className={`form-control ${errors.ssn ? "is-invalid" : ""}`}
              id="ssn"
              placeholder="9-digit SSN (numbers only)"
              value={ssn}
              onChange={onSsnChange}
              maxLength="9"
              required
              style={{ borderRadius: "8px", fontSize: "0.72rem", padding: "0.35rem" }}
            />
            <small className="text-muted d-block mt-1">{ssn.length}/9 digits</small>
            {errors.ssn && <div className="invalid-feedback d-block text-danger mt-1">{errors.ssn}</div>}
          </div>

          <div className="d-flex gap-2">
            <button
              type="submit"
              className="btn btn-primary btn-sm flex-grow-1"
              style={{ borderRadius: "8px", fontWeight: "500", fontSize: "0.82rem", padding: "0.4rem 0.72rem" }}
            >
              {editIndex !== null ? "Update" : "Add Record"}
            </button>
            {editIndex !== null && (
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={onCancel}
                style={{ borderRadius: "8px", fontWeight: "500", fontSize: "0.82rem", padding: "0.4rem 0.72rem" }}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
