// SSN Masking
export const maskSSN = (value) => {
  if (value.length !== 9) return "";
  return "XXX-XX-" + value.slice(-4);
};

// Email Validation
export const isValidEmail = (email) => {
  return /\S+@\S+\.\S+/.test(email);
};

const loadJSON = (key, fallback) => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.warn(`helpers: error loading ${key} from localStorage`, error);
    return fallback;
  }
};

const saveJSON = (key, value) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`helpers: error saving ${key} to localStorage`, error);
  }
};

// Get all users
export const getAllUsers = () => {
  return loadJSON("users", []);
};

// Save users
export const saveUsers = (users) => {
  saveJSON("users", users);
};

// Get all SSN records
export const getAllSSNRecords = () => {
  return loadJSON("ssnList", []);
};

// Save SSN records
export const saveSSNRecords = (records) => {
  saveJSON("ssnList", records);
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

// Find a user by email
export const findUserByEmail = (email) => {
  return getAllUsers().find((user) => user.email === email);
};
