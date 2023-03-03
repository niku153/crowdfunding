import React, { useState } from "react";
import moment from "moment";
import Button from "../Button/button";
import "./ProjectForm.css";

function ProjectForm(props) {
  const handleChange = (event) => {
    const { id, value } = event.target;
    props.onChange(id, value);
  };
  const handleDateChange = (event) => {
    const { id, value } = event.target;
    props.onChange(id, moment(value).toISOString());
  };

  return (
    <div className="form-wrapper">
      <form>
        <div className="form-item">
          <input
            type="text"
            id="title"
            name="title"
            required="required"
            onChange={handleChange}
            value={props.project.title}
          />
          <label htmlFor="title">
            <span>Title</span>
          </label>
        </div>
        <div className="form-item">
          <input
            type="text"
            id="description"
            name="description"
            required="required"
            onChange={handleChange}
            value={props.project.description}
          />
          <label htmlFor="title">
            <span>Description</span>
          </label>
        </div>
        <div className="form-item">
          <input
            type="number"
            id="goal"
            name="goal"
            required="required"
            onChange={handleChange}
            value={props.project.goal}
          />
          <label htmlFor="title">
            <span>Goal</span>
          </label>
        </div>
        <div className="form-item">
          <input
            type="text"
            id="image"
            name="image"
            required="required"
            onChange={handleChange}
            value={props.project.image}
          />
          <label htmlFor="title">
            <span>Image</span>
          </label>
        </div>

        <div className="form-item2">
          <label htmlFor="is_open">
            Activate Project
            <input
              type="checkbox"
              id="is_open"
              onChange={handleChange}
              value={props.project.is_open}
            />
          </label>
        </div>
        <div className="form-item2">
          <label htmlFor="date_created">
            Date Created
            <input
              type="date"
              id="date_created"
              onChange={handleDateChange}
              value={moment(props.project.date_created).format("YYYY-MM-DD")}
            />
          </label>
        </div>
        <div className="form-item2">
          <label htmlFor="closing_date">
            Project Deadline
            <input
              type="date"
              id="closing_date"
              onChange={handleDateChange}
              value={moment(props.project.closing_date).format("YYYY-MM-DD")}
            />
          </label>
        </div>
        <Button
          type="submit"
          handleClick={props.onSubmit}
          label={props.label}
        />
      </form>
    </div>
  );
}

export default ProjectForm;
