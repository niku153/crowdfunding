import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { useState } from "react";

// Pages
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";
import LoginPage from "./pages/LoginPage";
import PledgePage from "./pages/PledgePage";

// Components
import Nav from "./components/Nav/Nav";

//CSS
import "./App.css";
import CreateProject from "./pages/CreateProject";

const Layout = () => {
  const [loggedIn, setLoggedIn] = useState(
    window.localStorage.getItem("token") != null
  );
  return (
    <div>
      <Nav loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Outlet context={[loggedIn, setLoggedIn]} />
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
      { path: "/project/pledge", element: <PledgePage /> },
      { path: "/create-project", element: <CreateProject /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
