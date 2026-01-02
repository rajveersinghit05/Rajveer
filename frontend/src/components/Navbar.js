import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/login");
  };

  return (
    <div style={styles.navbar}>
      <h2 style={{ cursor: "pointer" }} onClick={() => navigate("/projects")}>
        TalentLink
      </h2>

      <button onClick={logout} style={styles.logoutBtn}>
        Logout
      </button>
    </div>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "#1e293b",
    color: "white",
  },
  logoutBtn: {
    padding: "8px 15px",
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default Navbar;
