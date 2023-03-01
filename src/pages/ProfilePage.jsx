import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

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
  // useEffect(() => {
  //   const _getProject = async (id) => {
  //     console.log(await getProject(1));
  //   };

  //   _getProject(1).catch((err) => console.error(err));
  // }, []);

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

  return <div></div>;
}

export default ProfilePage;
