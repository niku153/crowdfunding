import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ChangePasswordForm() {
  const authToken = window.localStorage.getItem("token");
  const [password, setPassword] = useState({
    password: "",
    old_password: "",
  });
}
