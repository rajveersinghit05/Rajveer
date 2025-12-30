import { useEffect, useState } from "react";
import api from "../api/axios";

const MyProposals = () => {
  const [proposals, setProposals] = useState([]);

  useEffect(() => {
    api.get("proposals/my/").then((res) => setProposals(res.data));
  }, []);

  return (
    <div className="page">
      <h2>My Proposals</h2>

      {proposals.length === 0 && <p>No proposals yet.</p>}

      {proposals.map((p) => (
        <div className="card" key={p.id}>
          <p><strong>Project ID:</strong> {p.project}</p>
          <p>{p.cover_letter}</p>
          <p><strong>Bid:</strong> ₹{p.bid_amount}</p>
          <p>
            Status:{" "}
            <b
              style={{
                color:
                  p.status === "accepted"
                    ? "green"
                    : p.status === "rejected"
                    ? "red"
                    : "orange",
              }}
            >
              {p.status}
            </b>
          </p>
        </div>
      ))}
    </div>
  );
};

export default MyProposals;
