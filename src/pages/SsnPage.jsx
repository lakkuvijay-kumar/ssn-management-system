import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SsnForm from "../components/SsnForm";
import SsnTable from "../components/SsnTable";

export default function SsnPage() {
  const [ssn, setSsn] = useState("");
  const [list, setList] = useState([]);
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
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("ssnList")) || [];
    setList(saved);
  }, []);

  const maskSSN = (value) => {
    if (value.length !== 9) return "";
    return "XXX-XX-" + value.slice(-4);
  };

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
      const registeredUsers = JSON.parse(localStorage.getItem("users")) || [];
      const matchedUser = registeredUsers.find((user) => user.email === email);
      if (!matchedUser) {
        newErrors.email = "Email is not registered. Please register first.";
      }

      const duplicateEmailIndex = list.findIndex(
        (item, index) => item.email === email && index !== editIndex
      );
      if (duplicateEmailIndex !== -1) newErrors.email = "Email already exists";
    }
    if (!department) newErrors.department = "Department is required";
    if (!recordDate) newErrors.recordDate = "Record date is required";
    if (ssn.length !== 9) newErrors.ssn = "SSN must be exactly 9 digits";
    
    const duplicateIndex = list.findIndex(
      (item, index) => item.original === ssn && index !== editIndex
    );
    if (duplicateIndex !== -1) newErrors.ssn = "SSN already exists";
    
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
      localStorage.setItem("ssnList", JSON.stringify(updated));
      setEditIndex(null);
      addMessage("✓ SSN record updated successfully!", "success");
    } else {
      const updated = [...list, newItem];
      setList(updated);
      localStorage.setItem("ssnList", JSON.stringify(updated));
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
    const updated = list.filter((_, i) => i !== index);
    setList(updated);
    localStorage.setItem("ssnList", JSON.stringify(updated));
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
  };

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
            <SsnTable
              list={list}
              checkedRowId={checkedRowId}
              onRowCheck={(index) => setCheckedRowId(index)}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );

}
