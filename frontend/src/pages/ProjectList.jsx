import { useEffect, useState } from "react";
import api from "../api/axios";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("projects/")
      .then((res) => setProjects(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <h3 style={{ textAlign: "center" }}>Loading projects...</h3>;

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto" }}>
      <h2>Available Projects</h2>

      {projects.map((p) => (
        <div className="card" key={p.id}>
          <h3>{p.title}</h3>
          <p>{p.description}</p>
          <a href={`/projects/${p.id}`}>View Details</a>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
