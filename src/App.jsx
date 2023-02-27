import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { useState, useEffect } from "react";

// Pages
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";
import LoginPage from "./pages/LoginPage";
import EditProjectPage from "./pages/EditProjectPage";
import CreateProject from "./pages/CreateProject";

// Components
import Nav from "./components/Nav/Nav";

//CSS
import "./App.css";

const Layout = () => {
  const [loggedIn, setLoggedIn] = useState(
    window.localStorage.getItem("token") != null
  );
  const [user, setUser] = useState();

  useEffect(() => {
    const authToken = window.localStorage.getItem("token");

    fetch(`${import.meta.env.VITE_API_URL}users/me`, {
      method: "get",
      headers: {
        Authorization: `Token ${authToken}`,
      },
    })
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setUser(data);
      });
  }, [loggedIn]);

  return (
    <div>
      <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Outlet context={{ loggedIn, setLoggedIn, user }} />
    </div>
  );
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/project/:id", element: <ProjectPage /> },
      { path: "/create-project", element: <CreateProject /> },
      { path: "/project/:id/edit", element: <EditProjectPage /> },
      {},
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
