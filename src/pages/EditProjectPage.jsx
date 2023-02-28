import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ProjectForm from "../components/ProjectForm/ProjectForm";
import ProjectPage from "./ProjectPage";

function EditProjectPage(props) {
  const authToken = window.localStorage.getItem("token");
  const [project, setProject] = useState({
    title: "",
    description: "",
    goal: null,
    image: "",
    is_open: true,
    date_created: null,
    closing_date: null,
  });
  const [changed, setChanged] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}projects/${id}`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setProject(data);
      });
  }, []);

  const handleChange = (id, value) => {
    // setChanged(true);
    setProject((prevProject) => ({
      ...prevProject,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const authToken = window.localStorage.getItem("token");

    if (authToken) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}projects/${id}`,
          {
            method: "put",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${authToken}`,
            },
            body: JSON.stringify(project),
          }
        );
        if (!response.ok) {
          throw new Error(await response.text());
        }
        navigate(`/project/${project.id}`);
      } catch (err) {
        console.error(err);
        alert(`Error: ${err.message}`);
      }
    } else {
      navigate(`/login`);
    }
  };

  // const handleCancel = (id, value) => {
  //   setProject((prevProject) => ({
  //     ...prevProject,
  //     [id]: value,
  //   }));
  //   setChanged(false);
  // };

  return (
    <>
      {authToken ? (
        <ProjectForm
          onChange={handleChange}
          onSubmit={handleSubmit}
          project={project}
        />
      ) : (
        <p>
          <Link to="/login">Log in</Link> to create a project
        </p>
      )}
      {/* {changed ? (
        <>
          <button>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : null} */}
    </>
  );
}

export default EditProjectPage;
