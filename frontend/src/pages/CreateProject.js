import React, { useState } from "react";
import api from "../api/axios";

function CreateProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  const [duration, setDuration] = useState("");
  const [skills, setSkills] = useState("");

  const submitProject = async (e) => {
    e.preventDefault();

    try {
      await api.post("projects/create/", {
        title,
        description,
        budget,
        duration,
        required_skills: skills,
      });

      alert("Project created successfully");

      setTitle("");
      setDescription("");
      setBudget("");
      setDuration("");
      setSkills("");
    } catch {
      alert("Error creating project");
    }
  };

  return (
    <div>
      <h2>Create Project</h2>

      <form onSubmit={submitProject}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <br /><br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="number"
          placeholder="Budget"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          required
        />
        <br /><br />

        <input
          placeholder="Duration (e.g. 2 weeks)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
        <br /><br />

        <input
          placeholder="Required Skills (comma separated)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">Create Project</button>
      </form>
    </div>
  );
}

export default CreateProject;
