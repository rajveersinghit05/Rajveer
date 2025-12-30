import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    username: "",
    email: "",
    role: "freelancer",
    password: "",
    password2: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("auth/register/", form);
      navigate("/projects");
      login(form.username, form.password);
    } catch {
      setError("Registration failed. Check details.");
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>

      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />

        <select name="role" onChange={handleChange}>
          <option value="freelancer">Freelancer</option>
          <option value="client">Client</option>
        </select>

        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <input name="password2" type="password" placeholder="Confirm Password" onChange={handleChange} required />

        <button type="submit">Register & Continue</button>
      </form>
    </div>
  );
};

export default Register;
