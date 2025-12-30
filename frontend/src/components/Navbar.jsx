import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated, role, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav style={styles.nav}>
      <h3 style={styles.logo}>TalentLink</h3>

      <div style={styles.links}>
        {!isAuthenticated && (
          <>
            <Link style={styles.link} to="/">
              Login
            </Link>
            <Link style={styles.link} to="/register">
              Register
            </Link>
          </>
        )}

        {isAuthenticated && (
          <>
            <Link style={styles.link} to="/projects">
              Projects
            </Link>

            {/* CLIENT ONLY */}
            {role === "client" && (
              <Link style={styles.link} to="/projects/create">
                Add Project
              </Link>
            )}

            <Link style={styles.link} to="/my-proposals">
              My Proposals
            </Link>

            <button style={styles.logout} onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 30px",
    background: "#1e40af",
    color: "white",
  },
  logo: { margin: 0 },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
  },
  logout: {
    background: "#ef4444",
    border: "none",
    color: "white",
    padding: "6px 12px",
    cursor: "pointer",
  },
};

export default Navbar;
