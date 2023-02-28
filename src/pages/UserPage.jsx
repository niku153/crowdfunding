import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

//Components
import UserCard from "../components/UserCard/UserCard";

function UserPage() {
  const [user, setUser] = useState({});

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}users/${id}`
        );
        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  const isUser = () => {
    return user.id;
  };

  return (
    <div>
      {user.id && (
        <>
          <h2>{user.username}'s Profile</h2>
          <UserCard user={user} />
        </>
      )}
      {!user.id && <h2>Sorry, this user does not exist</h2>}
    </div>
  );
}

export default UserPage;
