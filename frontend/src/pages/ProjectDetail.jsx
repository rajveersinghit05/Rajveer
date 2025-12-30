import { useParams, useNavigate } from "react-router-dom";
import {
  useEffect,
  useState,
  useContext,
  useCallback
} from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { role } = useContext(AuthContext);

  const [project, setProject] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    cover_letter: "",
    bid_amount: "",
  });

  // ✅ FIXED: wrapped in useCallback
  const loadData = useCallback(async () => {
    try {
      const projectRes = await api.get(`projects/${id}/`);
      const proposalRes = await api.get(`proposals/my/`);

      setProject(projectRes.data);

      // Client sees proposals on own project
      if (role === "client") {
        setProposals(
          proposalRes.data.filter(
            (p) => p.project === projectRes.data.id
          )
        );
      } else {
        setProposals([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [id, role]);

  // ✅ FIXED: correct dependency
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Freelancer submits proposal
  const submitProposal = async (e) => {
    e.preventDefault();

    await api.post("proposals/submit/", {
      project: id,
      cover_letter: form.cover_letter,
      bid_amount: form.bid_amount,
    });

    setForm({ cover_letter: "", bid_amount: "" });
    loadData();
  };

  // Client accepts/rejects proposal
  const handleDecision = async (proposalId, status) => {
    await api.post(`proposals/decision/${proposalId}/`, { status });
    loadData();
  };

  // Client deletes project
  const deleteProject = async () => {
    await api.delete(`projects/${id}/`);
    navigate("/projects");
  };

  if (loading) return <p className="loading">Loading...</p>;

  return (
    <div className="page">
      {/* PROJECT INFO */}
      <div className="card">
        <h2>{project.title}</h2>
        <p>{project.description}</p>

        {role === "client" && (
          <button
            style={{ background: "red", marginTop: "10px" }}
            onClick={deleteProject}
          >
            Delete Project
          </button>
        )}
      </div>

      {/* FREELANCER: SUBMIT PROPOSAL */}
      {role === "freelancer" && (
        <div className="card">
          <h3>Submit Proposal</h3>

          <form onSubmit={submitProposal}>
            <textarea
              placeholder="Cover letter"
              value={form.cover_letter}
              onChange={(e) =>
                setForm({ ...form, cover_letter: e.target.value })
              }
              required
            />

            <input
              type="number"
              placeholder="Bid Amount"
              value={form.bid_amount}
              onChange={(e) =>
                setForm({ ...form, bid_amount: e.target.value })
              }
              required
            />

            <button type="submit">Submit Proposal</button>
          </form>
        </div>
      )}

      {/* CLIENT: VIEW PROPOSALS */}
      {role === "client" && (
        <>
          <h3>Proposals</h3>

          {proposals.length === 0 && <p>No proposals yet.</p>}

          {proposals.map((p) => (
            <div className="card" key={p.id}>
              <p><strong>Freelancer:</strong> {p.freelancer}</p>
              <p>{p.cover_letter}</p>
              <p><strong>Bid:</strong> ₹{p.bid_amount}</p>
              <p>Status: <b>{p.status}</b></p>

              {p.status === "pending" && (
                <>
                  <button
                    onClick={() => handleDecision(p.id, "accepted")}
                  >
                    Accept
                  </button>

                  <button
                    style={{ background: "red", marginLeft: "10px" }}
                    onClick={() => handleDecision(p.id, "rejected")}
                  >
                    Reject
                  </button>
                </>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ProjectDetail;
