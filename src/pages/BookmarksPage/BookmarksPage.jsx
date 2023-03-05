import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import ProjectCard from "../../components/ProjectCard/ProjectCard";
import "./BookmarksPage.css";

async function getProject(id) {
  return fetch(`${import.meta.env.VITE_API_URL}projects/${id}`).then(
    (results) => {
      return results.json();
    }
  );
}

function BookmarksPage() {
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
    <div className="profile-wrapper">
      <h2>Your bookmarked projects</h2>
      {projects.length ? (
        <div id="project-list">
          {projects.map((project, key) => {
            return <ProjectCard key={key} projectData={project} />;
          })}{" "}
        </div>
      ) : (
        <div className="profile-wrapper-empty">
          <h2>Oh no!</h2>
          <p>
            You don't have any bookmarked projects yet! Go to the{" "}
            <Link to="/">Home Page</Link> to explore.
          </p>
        </div>
      )}
    </div>
  );
}

export default BookmarksPage;
