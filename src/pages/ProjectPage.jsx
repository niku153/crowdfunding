import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ProjectPage.css";
import logo from "../media/logo.png";
import moment from "moment";
import PledgeForm from "../components/PledgeForm/PledgeForm";
import { Link } from "react-router-dom";

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

  // Variables
  const currentDate = moment();
  const closingDate = moment(project.closing_date);

  const diff = closingDate.diff(currentDate, "days");
  console.log(diff);

  return (
    <div>
      <div
        id="variable-background"
        className="background-image"
        style={{ backgroundImage: `url(${project.image})` }}
      >
        <div className="image-overlay"></div>
      </div>
      <img src={logo} className="logo"></img>
      <div className="project-wrapper">
        <section>
          <h2>{project.title}</h2>
          <h6>{project.owner}</h6>
          <h6>{project.is_open ? <p>Active</p> : <p>Inactive</p>}</h6>
        </section>
        <section>
          <div className="project-metrics">
            {/* <h3>Created on: {project.date_created}</h3> */}
            <p>
              ${project.total} <span>of ${project.goal} raised</span>
            </p>
            <p>
              3 <span>total supporters</span>
            </p>
            {/* <h3>{`Status: ${project.is_open}`}</h3> */}

            <p>
              {diff} <span>days left</span>
            </p>
          </div>
        </section>
        <section className="about-project">
          <h3>About this project</h3>
          <p>{project.description}</p>
        </section>
        <section className="pledges">
          <h3>Pledges</h3>
          <ul>
            {project.pledges.map((pledge, key) => {
              return (
                <li key={key}>
                  ${pledge.amount} from {pledge.supporter}
                  <div className="pledge-comment">{pledge.comment}</div>
                </li>
              );
            })}
          </ul>
        </section>
        <Link to="/project/pledge" project={project}>
          Make a pledge
        </Link>
      </div>
    </div>
  );
}

export default ProjectPage;
