import RegistrationForm from "../components/RegistrationForm/RegistrationForm";
import { Link } from "react-router-dom";

function RegistrationPage(props) {
  const authToken = window.localStorage.getItem("token");

  return (
    <div>
      {!authToken ? (
        <>
          <h2>Join the medical research community</h2>
          <p>
            Register now to pledge to a research project or to create your own
            project to be crowdfunded
          </p>
          <RegistrationForm />
        </>
      ) : (
        <>
          <h2>You are already logged in!</h2>
          <Link to="/">Back to Home Page</Link>
        </>
      )}
    </div>
  );
}

export default RegistrationPage;
