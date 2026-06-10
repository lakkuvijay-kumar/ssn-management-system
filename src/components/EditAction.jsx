import React from "react";

export default function EditAction({ disabled, onClick, title }) {
  return (
    <button
      className={`btn btn-sm ${disabled ? "btn-outline-secondary" : "btn-outline-warning"}`}
      onClick={onClick}
      disabled={disabled}
      title={title}
      style={{ borderRadius: "6px", fontSize: "0.78rem", padding: "0.3rem 0.6rem" }}
    >
      ✎ Edit
    </button>
  );
}
