import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [user, setUser] = useState(null);

  // -------- PROJECT FORM --------
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    budget: "",
    duration: "",
    required_skills: "",
  });

  // -------- PROPOSAL FORM --------
  const [applyProjectId, setApplyProjectId] = useState(null);
  const [proposalData, setProposalData] = useState({
    cover_letter: "",
    bid_amount: "",
  });

  // -------- FILTERS --------
  const [filters, setFilters] = useState({
    skill: "",
    min_budget: "",
    max_budget: "",
  });

  const token = getToken();
  const navigate = useNavigate();

  const authHeaders = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // ================= FETCH USER =================
  const fetchUser = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/api/auth/me/",
        authHeaders
      );
      setUser(res.data);
    } catch {
      console.error("User fetch failed");
    }
  };

  // ================= FETCH PROJECTS =================
  const fetchProjects = async () => {
    try {
      const params = new URLSearchParams();

      if (filters.skill) params.append("skill", filters.skill);
      if (filters.min_budget) params.append("min_budget", filters.min_budget);
      if (filters.max_budget) params.append("max_budget", filters.max_budget);

      const res = await axios.get(
        `http://127.0.0.1:8000/api/projects/?${params.toString()}`,
        authHeaders
      );
      setProjects(res.data);
    } catch {
      console.error("Project fetch failed");
    }
  };

  useEffect(() => {
    fetchUser();
    fetchProjects();
  }, []);

  // ================= HANDLERS =================
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(
          `http://127.0.0.1:8000/api/projects/${editId}/`,
          formData,
          authHeaders
        );
      } else {
        await axios.post(
          "http://127.0.0.1:8000/api/projects/",
          formData,
          authHeaders
        );
      }

      setEditId(null);
      setFormData({
        title: "",
        description: "",
        budget: "",
        duration: "",
        required_skills: "",
      });

      fetchProjects();
    } catch {
      alert("Not allowed");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    await axios.delete(
      `http://127.0.0.1:8000/api/projects/${id}/`,
      authHeaders
    );
    fetchProjects();
  };

  const handleEdit = (project) => {
    setEditId(project.id);
    setFormData({
      title: project.title,
      description: project.description,
      budget: project.budget,
      duration: project.duration,
      required_skills: project.required_skills,
    });
  };

  const handleApply = (projectId) => {
    setApplyProjectId(projectId);
  };

  const submitProposal = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/proposals/create/",
        {
          project: applyProjectId,
          cover_letter: proposalData.cover_letter,
          bid_amount: proposalData.bid_amount,
        },
        authHeaders
      );

      alert("Proposal submitted");
      setApplyProjectId(null);
      setProposalData({ cover_letter: "", bid_amount: "" });
    } catch {
      alert("You already applied or action not allowed");
    }
  };

  return (
    <>
      <Navbar />

      <div style={{ padding: "20px", maxWidth: "1000px", margin: "auto" }}>
        <h2>Projects</h2>

        {/* ================= FILTERS ================= */}
        <div style={styles.filterBox}>
          <input
            placeholder="Skill"
            value={filters.skill}
            onChange={(e) =>
              setFilters({ ...filters, skill: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Min Budget"
            value={filters.min_budget}
            onChange={(e) =>
              setFilters({ ...filters, min_budget: e.target.value })
            }
          />
          <input
            type="number"
            placeholder="Max Budget"
            value={filters.max_budget}
            onChange={(e) =>
              setFilters({ ...filters, max_budget: e.target.value })
            }
          />
          <button onClick={fetchProjects}>Apply</button>
          <button
            onClick={() => {
              setFilters({ skill: "", min_budget: "", max_budget: "" });
              fetchProjects();
            }}
          >
            Reset
          </button>
        </div>

        {/* ================= CLIENT FORM ================= */}
        {user?.role === "client" && (
          <>
            <h3>{editId ? "Edit Project" : "Create Project"}</h3>
            <form onSubmit={handleSubmit} style={styles.form}>
              <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
              <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
              <input name="budget" placeholder="Budget" value={formData.budget} onChange={handleChange} required />
              <input name="duration" placeholder="Duration" value={formData.duration} onChange={handleChange} required />
              <input name="required_skills" placeholder="Skills" value={formData.required_skills} onChange={handleChange} required />
              <button type="submit">{editId ? "Update" : "Create"}</button>
            </form>
            <hr />
          </>
        )}

        {/* ================= PROPOSAL FORM ================= */}
        {applyProjectId && (
          <div style={styles.applyBox}>
            <h3>Submit Proposal</h3>
            <form onSubmit={submitProposal}>
              <textarea
                placeholder="Cover Letter"
                value={proposalData.cover_letter}
                onChange={(e) =>
                  setProposalData({
                    ...proposalData,
                    cover_letter: e.target.value,
                  })
                }
                required
              />
              <input
                placeholder="Bid Amount"
                value={proposalData.bid_amount}
                onChange={(e) =>
                  setProposalData({
                    ...proposalData,
                    bid_amount: e.target.value,
                  })
                }
                required
              />
              <button type="submit">Submit</button>
              <button type="button" onClick={() => setApplyProjectId(null)}>
                Cancel
              </button>
            </form>
          </div>
        )}

        {/* ================= PROJECT LIST ================= */}
        {projects.map((project) => (
          <div key={project.id} style={styles.card}>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p>💰 {project.budget}</p>
            <p>🛠 {project.required_skills}</p>

            {user?.role === "client" && user.id === project.client && (
              <div style={styles.actions}>
                <button onClick={() => handleEdit(project)}>Edit</button>
                <button onClick={() => handleDelete(project.id)}>Delete</button>
                <button onClick={() => navigate(`/projects/${project.id}/proposals`)}>
                  View Proposals
                </button>
              </div>
            )}

            {user?.role === "freelancer" && (
              <button onClick={() => handleApply(project.id)}>Apply</button>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

const styles = {
  filterBox: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    maxWidth: "400px",
  },
  card: {
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    padding: "15px",
    marginBottom: "15px",
    background: "#f9fafb",
  },
  actions: {
    display: "flex",
    gap: "10px",
  },
  applyBox: {
    border: "1px solid #999",
    padding: "15px",
    marginBottom: "20px",
  },
};

export default Projects;
