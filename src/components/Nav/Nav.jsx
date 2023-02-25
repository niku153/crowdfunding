import { Link } from "react-router-dom";

function Nav(props) {
  const { loggedIn, setLoggedIn } = props;

  const handleClick = () => {
    window.localStorage.removeItem("token");
    setLoggedIn(false);
  };

  return (
    <nav>
      <div>{!loggedIn && <Link to="/login">Login</Link>}</div>
      <Link to="/">Home</Link>
      <div>{loggedIn && <button onClick={handleClick}>Sign out</button>}</div>
    </nav>
  );
}

export default Nav;
