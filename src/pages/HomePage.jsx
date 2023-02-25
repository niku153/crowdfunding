import { useState, useEffect } from "react";

//Components
import ProjectCard from "../components/ProjectCard/ProjectCard";

// Data
import { allProjects } from "../data";

//Media
// import banner from "../media/drugs-banner.jpeg";
import logo from "../media/logo.png";
import banner from "../media/stethoscope.jpeg";

//CSS
import "./HomePage.css";

function HomePage() {
  //State
  const [projectList, setProjectList] = useState([]);

  //Effects
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}projects`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setProjectList(data);
      });
  }, []);
  return (
    <div>
      <section className="homepage-hero">
        <img src={banner} className="homepage-image"></img>
        {/* <div
          className="homepage-image"
          style={{ backgroundImage: `url(${banner})` }}
        >
          <div className="homepage-image-overlay"></div>
        </div> */}
        <div className="header">
          <div className="heading">
            <img src={logo} alt="" className="homepage-logo" />
            <h1>MedLab</h1>
          </div>
          <h3>crowdfund your research</h3>
        </div>
        <a href="/create-project" className="project-registration">
          Register your project
        </a>
      </section>
      <div id="project-list">
        {projectList.map((project, key) => {
          return <ProjectCard key={key} projectData={project} />;
        })}
      </div>
    </div>
  );
}

export default HomePage;
