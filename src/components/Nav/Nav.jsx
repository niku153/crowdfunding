import { Link, useNavigate } from "react-router-dom";

function Nav(props) {
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn } = props;

  const handleClick = () => {
    window.localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      <div>{!loggedIn && <Link to="/login">Login</Link>}</div>
      <div>{!loggedIn && <Link to="/register">Register</Link>}</div>
      <div>{loggedIn && <Link to="/profile">Profile</Link>}</div>
      <div>{loggedIn && <button onClick={handleClick}>Sign out</button>}</div>
    </nav>
  );
}

export default Nav;
