import React, { useState } from "react";
import moment from "moment";
import Button from "../button";

function ProjectForm(props) {
  const handleChange = (event) => {
    const { id, value } = event.target;
    props.onChange(id, value);
  };
  const handleDateChange = (event) => {
    const { id, value } = event.target;
    props.onChange(id, moment(value).toISOString());
  };

  console.log(props.project);

  return (
    <div>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          placeholder="Enter title"
          onChange={handleChange}
          value={props.project.title}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          placeholder="Enter description"
          onChange={handleChange}
          value={props.project.description}
        />
      </div>
      <div>
        <label htmlFor="goal">Goal:</label>
        <input
          type="number"
          id="goal"
          placeholder="enter a goal"
          onChange={handleChange}
          value={props.project.goal}
        />
      </div>
      <div>
        <label htmlFor="image">Image URL:</label>
        <input
          type="text"
          id="image"
          onChange={handleChange}
          value={props.project.image}
        />
      </div>
      <div>
        <label htmlFor="is_open">Activate Project:</label>
        <input
          type="checkbox"
          id="is_open"
          onChange={handleChange}
          value={props.project.is_open}
        />
      </div>
      <div>
        <label htmlFor="date_created">Date Created:</label>
        <input
          type="date"
          id="date_created"
          onChange={handleDateChange}
          value={moment(props.project.date_created).format("YYYY-MM-DD")}
        />
      </div>
      <div>
        <label htmlFor="closing_date">Project Deadline:</label>
        <input
          type="date"
          id="closing_date"
          onChange={handleDateChange}
          value={moment(props.project.closing_date).format("YYYY-MM-DD")}
        />
      </div>
      <Button type="submit" handleClick={props.onSubmit} label={props.label} />
      {/* <button type="submit" onClick={props.onSubmit}>
        {" "}
        Create Project
      </button> */}
    </div>
  );
}

export default ProjectForm;
