import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import ProjectCard from "../components/ProjectCard/ProjectCard";

async function getProject(id) {
  return fetch(`${import.meta.env.VITE_API_URL}projects/${id}`).then(
    (results) => {
      return results.json();
    }
  );
}

function ProfilePage() {
  const [projects, setProjects] = useState([]);
  const { user } = useOutletContext();

  useEffect(() => {
    if (!user) {
      return;
    }

    Promise.all(
      user.bookmarked_projects.map(async (projectId) => {
        return await getProject(projectId).catch((err) => console.error(err));
      })
    ).then((bookmarked_projects) => setProjects(bookmarked_projects));
  }, [user]);

  return (
    <div id="project-list">
      {projects.map((project, key) => {
        return <ProjectCard key={key} projectData={project} />;
      })}
    </div>
  );
}

export default ProfilePage;
