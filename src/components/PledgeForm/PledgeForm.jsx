import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import "./PledgeForm.css";

function PledgeForm(props) {
  const { project } = props;
  const authToken = window.localStorage.getItem("token");

  const [pledges, setPledges] = useState({
    amount: null,
    comment: "",
    anonymous: false,
  });

  const navigate = useNavigate();

  const { id } = useParams();

  const handleChange = (event) => {
    const { id, value } = event.target;
    setPledges((prevPledges) => ({
      ...prevPledges,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const authToken = window.localStorage.getItem("token");

    if (authToken) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}pledges/`,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Token ${authToken}`,
            },
            body: JSON.stringify({ project: project.id, ...pledges }),
          }
        );
        if (!response.ok) {
          throw new Error(await response.text());
        }
        location.reload();
      } catch (err) {
        console.error(err);
        alert(`Error: ${err.message}`);
      }
    } else {
      navigate(`/login`);
    }
  };

  return (
    <div className="pledge-form-wrapper">
      <h6>Make a pledge</h6>
      {authToken ? (
        <form onSubmit={handleSubmit}>
          <div className="pledge-form-item">
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              id="amount"
              placeholder="Enter amount"
              onChange={handleChange}
            />
          </div>
          <div className="pledge-form-item">
            <label htmlFor="comment">Comment:</label>
            <input
              type="text"
              id="comment"
              placeholder="Enter Comment"
              onChange={handleChange}
            />
          </div>
          <div className="pledge-form-item">
            <label htmlFor="anonymous">Anonymous:</label>
            <input type="checkbox" id="anonymous" onChange={handleChange} />
          </div>

          <button type="submit">Pledge</button>
        </form>
      ) : (
        <p className="back-up-text">
          <Link to="/login">Log in</Link> to make a pledge
        </p>
      )}
    </div>
  );
}

export default PledgeForm;
