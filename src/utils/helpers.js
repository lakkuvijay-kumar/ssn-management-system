// SSN Masking
export const maskSSN = (value) => {
  if (value.length !== 9) return "";
  return "XXX-XX-" + value.slice(-4);
};

// Email Validation
export const isValidEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

// Get all users
export const getAllUsers = () => {
  return JSON.parse(localStorage.getItem("users")) || [];
};

// Get all SSN records
export const getAllSSNRecords = () => {
  return JSON.parse(localStorage.getItem("ssnList")) || [];
};

// Save SSN records
export const saveSSNRecords = (records) => {
  localStorage.setItem("ssnList", JSON.stringify(records));
};

// Check if email is registered
export const isEmailRegistered = (email) => {
  const users = getAllUsers();
  return users.some((user) => user.email === email);
};

// Check if SSN already exists
export const isSSNExists = (ssn, excludeIndex = null) => {
  const records = getAllSSNRecords();
  return records.some((item, index) => item.original === ssn && index !== excludeIndex);
};

// Check if email already used in SSN records
export const isEmailUsedInSSN = (email, excludeIndex = null) => {
  const records = getAllSSNRecords();
  return records.some((item, index) => item.email === email && index !== excludeIndex);
};
