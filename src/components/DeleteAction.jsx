import React from "react";

export default function DeleteAction({ disabled, onClick, title }) {
  return (
    <button
      className={`btn btn-sm ${disabled ? "btn-outline-secondary" : "btn-outline-danger"}`}
      onClick={onClick}
      disabled={disabled}
      title={title}
      style={{ borderRadius: "6px", fontSize: "0.78rem", padding: "0.3rem 0.6rem" }}
    >
      🗑 Delete
    </button>
  );
}
