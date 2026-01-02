import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";
import { useParams } from "react-router-dom";

const ProjectProposals = () => {
  const { projectId } = useParams();
  const [proposals, setProposals] = useState([]);
  const token = getToken();

  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/proposals/project/${projectId}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setProposals(res.data);
  };

  const decideProposal = async (proposalId, action) => {
    await axios.post(
      `http://127.0.0.1:8000/api/proposals/decision/${proposalId}/`,
      { action },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    alert(`Proposal ${action}ed`);
    fetchProposals();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Project Proposals</h2>

      {proposals.length === 0 && <p>No proposals yet.</p>}

      {proposals.map((p) => (
        <div
          key={p.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <p><b>Freelancer:</b> {p.freelancer_username}</p>
          <p><b>Bid:</b> ₹{p.bid_amount}</p>
          <p>{p.cover_letter}</p>
          <p><b>Status:</b> {p.status}</p>

          {/* ✅ ACCEPT / REJECT ONLY IF PENDING */}
          {p.status === "pending" && (
            <>
              <button onClick={() => decideProposal(p.id, "accept")}>
                Accept
              </button>
              <button
                onClick={() => decideProposal(p.id, "reject")}
                style={{ marginLeft: "10px" }}
              >
                Reject
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProjectProposals;
