import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Notfound from "./components/Notfound/Notfound";

let router = createBrowserRouter([
  { path: "signup", element: <Register /> },
  { path: "login", element: <Login /> },
  { path: "*", element: <Notfound /> },
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "home", element: <Home /> },
      { path: "profile", element: <Profile /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router}></RouterProvider>;
}
