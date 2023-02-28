import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function RegistrationForm() {
  const authToken = window.localStorage.getItem("token");
  const [users, setUsers] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (event) => {
    const { id, value } = event.target;
    setUsers((prevUsers) => ({ ...prevUsers, [id]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!authToken) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}users/`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(users),
        });
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    } else {
      navigate("/");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Register as a Researcher Below</h2>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            placeholder="Enter a username"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            id="password"
            placeholder="Enter a password"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Register User</button>
      </form>
    </div>
  );
}

export default RegistrationForm;
