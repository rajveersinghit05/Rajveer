// src/utils/auth.js

// ===============================
// GET TOKENS
// ===============================
export const getToken = () => {
  return localStorage.getItem("access_token");
};

export const getRefreshToken = () => {
  return localStorage.getItem("refresh_token");
};

// ===============================
// SET TOKENS
// ===============================
export const setToken = (accessToken, refreshToken = null) => {
  localStorage.setItem("access_token", accessToken);

  if (refreshToken) {
    localStorage.setItem("refresh_token", refreshToken);
  }
};

// ===============================
// CLEAR TOKENS (LOGOUT)
// ===============================
export const clearToken = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};
