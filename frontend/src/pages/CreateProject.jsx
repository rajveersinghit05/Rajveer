import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const CreateProject = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("projects/", form);
      navigate("/projects");
    } catch (error) {
      console.error("Project creation failed", error);
    }
  };

  return (
    <div className="page">
      <h2>Create Project</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Project Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          required
        />

        <textarea
          placeholder="Project Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          required
        />

        <input
          type="number"
          placeholder="Budget"
          value={form.budget}
          onChange={(e) =>
            setForm({ ...form, budget: e.target.value })
          }
          required
        />

        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default CreateProject;
