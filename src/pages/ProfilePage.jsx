import { useOutletContext } from "react-router-dom";

function ProfilePage() {
  const { user } = useOutletContext();
  //   console.log(user.bookmarked_projects);
}

export default ProfilePage;
