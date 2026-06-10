import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SsnForm from "../components/SsnForm";
import SsnTable from "../components/SsnTable";
import { useLocalStorageState } from "../hooks/useLocalStorage";
import {
  maskSSN,
  findUserByEmail,
  isSSNExists,
  isEmailUsedInSSN,
} from "../utils/helpers";

export default function SsnPage() {
  const [ssn, setSsn] = useState("");
  const [list, setList] = useLocalStorageState("ssnList", []);
  const [editIndex, setEditIndex] = useState(null);
  const [messages, setMessages] = useState([]);
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [recordDate, setRecordDate] = useState("");
  const [errors, setErrors] = useState({});
  const [checkedRowId, setCheckedRowId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const PAGE_SIZE = 5;


  const addMessage = (text, type = "success") => {
    const id = Date.now() + Math.random();
    setMessages((prev) => [...prev, { id, text, type }]);
    setTimeout(() => setMessages((prev) => prev.filter((m) => m.id !== id)), 3000);
  };

  const removeMessage = (id) => setMessages((prev) => prev.filter((m) => m.id !== id));

  const handleSsnChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 9) {
      setSsn(value);
      if (errors.ssn) setErrors({ ...errors, ssn: "" });
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    if (errors.name) setErrors({ ...errors, name: "" });
  };

  const handleDobChange = (e) => {
    setDob(e.target.value);
    if (errors.dob) setErrors({ ...errors, dob: "" });
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
    if (errors.address) setErrors({ ...errors, address: "" });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) setErrors({ ...errors, email: "" });
  };

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
    if (errors.department) setErrors({ ...errors, department: "" });
  };

  const handleRecordDateChange = (e) => {
    setRecordDate(e.target.value);
    if (errors.recordDate) setErrors({ ...errors, recordDate: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!dob) newErrors.dob = "Date of Birth is required";
    if (!address) newErrors.address = "Address is required";
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid";
    else {
      const matchedUser = findUserByEmail(email);
      if (!matchedUser) {
        newErrors.email = "Email is not registered. Please register first.";
      }

      if (isEmailUsedInSSN(email, editIndex)) {
        newErrors.email = "Email already exists in SSN records.";
      }
    }
    if (!department) newErrors.department = "Department is required";
    if (!recordDate) newErrors.recordDate = "Record date is required";
    if (ssn.length !== 9) newErrors.ssn = "SSN must be exactly 9 digits";
    if (isSSNExists(ssn, editIndex)) {
      newErrors.ssn = "SSN already exists";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newItem = {
      original: ssn,
      masked: maskSSN(ssn),
      name: name,
      email: email,
      dob: dob,
      address: address,
      department: department,
      recordDate: recordDate,
    };

    if (editIndex !== null) {
      const updated = [...list];
      updated[editIndex] = newItem;
      setList(updated);
      setEditIndex(null);
      addMessage("✓ SSN record updated successfully!", "success");
    } else {
      const updated = [...list, newItem];
      setList(updated);
      addMessage("✓ SSN record added successfully!", "success");
    }

    setSsn("");
    setName("");
    setDob("");
    setAddress("");
    setEmail("");
    setDepartment("");
    setRecordDate("");
    setErrors({});
    setCheckedRowId(null);
  };

  const handleEdit = (index) => {
    const item = list[index];
    setSsn(item.original);
    setName(item.name || "");
    setDob(item.dob || "");
    setAddress(item.address || "");
    setEmail(item.email || "");
    setDepartment(item.department || "");
    setRecordDate(item.recordDate || "");
    setEditIndex(index);
    setErrors({});
    setCheckedRowId(null);
  };

  const handleDelete = (index) => {
    const item = list[index];
    if (!item) return;

    const confirmed = window.confirm(`Delete SSN record for ${item.name}? This action cannot be undone.`);
    if (!confirmed) return;

    const updated = list.filter((_, i) => i !== index);
    setList(updated);
    if (checkedRowId === index) {
      setCheckedRowId(null);
    }
    addMessage("✓ SSN record deleted successfully!", "success");
  };

  const handleCancel = () => {
    setSsn("");
    setName("");
    setDob("");
    setAddress("");
    setEmail("");
    setDepartment("");
    setRecordDate("");
    setEditIndex(null);
    setErrors({});
    setCheckedRowId(null);
    setSearchTerm("");
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }
    setSortField(field);
    setSortDirection("asc");
  };

  useEffect(() => {
    setCurrentPage(1);
    setCheckedRowId(null);
  }, [searchTerm, list.length]);

  const compareText = (a, b) => {
    const textA = (a || "").toString().toLowerCase();
    const textB = (b || "").toString().toLowerCase();
    return textA.localeCompare(textB, undefined, { sensitivity: "base" });
  };

  const filteredList = list
    .map((item, index) => ({ ...item, _originalIndex: index }))
    .filter((item) => {
      const term = searchTerm.trim().toLowerCase();
      if (!term) return true;
      return (
        item.name.toLowerCase().includes(term) ||
        item.email.toLowerCase().includes(term) ||
        item.masked.toLowerCase().includes(term) ||
        item.original.includes(term)
      );
    });

  const sortedList = [...filteredList].sort((a, b) => {
    const valueA = a[sortField] || "";
    const valueB = b[sortField] || "";
    const result = compareText(valueA, valueB);
    return sortDirection === "asc" ? result : -result;
  });

  const pageCount = Math.max(1, Math.ceil(sortedList.length / PAGE_SIZE));

  useEffect(() => {
    if (currentPage > pageCount) {
      setCurrentPage(pageCount);
    }
  }, [currentPage, pageCount]);

  const paginatedList = sortedList.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="container-fluid py-4" style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <div className="container">
        {/* Header */}
        <div className="mb-4 d-flex flex-column flex-md-row align-items-start justify-content-between gap-3">
          <div>
            <h1 className="fw-bold" style={{ color: "#2c3e50", fontSize: "1.65rem" }}>SSN Management System</h1>
            <p className="text-muted" style={{ fontSize: "0.88rem" }}>Manage and track Social Security Numbers securely</p>
          </div>
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={() => navigate("/records")}
            style={{ borderRadius: "8px", height: "40px" }}
          >
            📁 View Records Page
          </button>
        </div>

        {/* Messages */}
        {messages.length > 0 && (
          <div style={{ position: "fixed", right: "2rem", top: "6rem", zIndex: 1050, width: "350px" }}>
            {messages.map((m) => (
              <div key={m.id} style={{ marginBottom: "1rem", cursor: "pointer" }} onClick={() => removeMessage(m.id)}>
                <div 
                  className={`alert alert-${m.type} alert-dismissible fade show py-3 px-4 shadow-sm`} 
                  role="alert"
                  style={{ borderRadius: "8px", border: "none" }}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="row g-3">
          <div className="col-lg-4">
            <SsnForm
              ssn={ssn}
              name={name}
              dob={dob}
              address={address}
              email={email}
              department={department}
              recordDate={recordDate}
              errors={errors}
              editIndex={editIndex}
              onSsnChange={handleSsnChange}
              onNameChange={handleNameChange}
              onDobChange={handleDobChange}
              onAddressChange={handleAddressChange}
              onEmailChange={handleEmailChange}
              onDepartmentChange={handleDepartmentChange}
              onRecordDateChange={handleRecordDateChange}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
            />
          </div>
          <div className="col-lg-8">
            <div className="mb-3 d-flex align-items-center gap-2">
              <input
                type="search"
                className="form-control form-control-sm"
                placeholder="Search by name, email, masked SSN or original SSN"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCheckedRowId(null);
                }}
                style={{ borderRadius: "8px", fontSize: "0.82rem" }}
              />
              {searchTerm && (
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => {
                    setSearchTerm("");
                    setCheckedRowId(null);
                  }}
                  style={{ borderRadius: "8px", fontSize: "0.82rem" }}
                >
                  Clear
                </button>
              )}
            </div>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div className="text-muted small">
                Showing {paginatedList.length} of {sortedList.length} record{sortedList.length === 1 ? "" : "s"}
              </div>
              <div className="btn-group btn-group-sm" role="group">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                >
                  Prev
                </button>
                <button type="button" className="btn btn-outline-secondary" disabled>
                  Page {currentPage}/{pageCount}
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  disabled={currentPage >= pageCount}
                  onClick={() => setCurrentPage((prev) => Math.min(pageCount, prev + 1))}
                >
                  Next
                </button>
              </div>
            </div>
            <SsnTable
              list={paginatedList}
              checkedRowId={checkedRowId}
              onRowCheck={(index) => setCheckedRowId(index)}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSort={handleSort}
              sortField={sortField}
              sortDirection={sortDirection}
            />
          </div>
        </div>
      </div>
    </div>
  );

}
