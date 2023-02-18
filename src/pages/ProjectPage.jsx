import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function ProjectPage() {
  //State
  const [project, setProject] = useState({ pledges: [] });

  //Hooks
  const { id } = useParams();

  //Effects
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}projects/${id}`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setProject(data);
      });
  }, []);

  return (
    <div>
      <h2>{project.title}</h2>
      <h3>Created at: {project.date_created}</h3>
      <h3>{`Status: ${project.is_open}`}</h3>
      <img src={project.image}></img>
      <h3>Pledges:</h3>
      <ul>
        {project.pledges.map((pledge, key) => {
          return (
            <li key={key}>
              {pledge.amount} from {pledge.supporter}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ProjectPage;
