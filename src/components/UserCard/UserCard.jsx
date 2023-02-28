import { useState, useEffect } from "react";
import ProjectCard from "../ProjectCard/ProjectCard";

function UserCard(props) {
  const [userProjects, setUserProjects] = useState();
  const { user } = props;
  //   const { user } = useOutletContext();
  //   console.log(user);

  //   console.log(user.project);

  useEffect(() => {
    const getUserProjects = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}projects/`
        );
        console.log(response);
        // const data = await response.json();
        // setUserProjects(data);
      } catch (err) {
        console.log(err);
      }
      getUserProjects();
    };
  });

  return (
    <div>
      <h2>{user.username}</h2>
      <h4>{user.username}'s Projects</h4>
      <p>{user.bookmarked_projects}</p>
      {user.projects &&
        user.projects.map((project, key) => {
          return <ProjectCard key={key} projectData={project} />;
        })}
    </div>
  );
}

export default UserCard;
