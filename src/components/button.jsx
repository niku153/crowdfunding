import React from "react";

const Button = ({ label, handleClick }) => {
  return (
    <button className="primary-button" onClick={handleClick}>
      {label}
    </button>
  );
};

export default Button;
