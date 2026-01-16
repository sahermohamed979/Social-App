import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Notfound from "./components/Notfound/Notfound";
import AuthContextProvider from "./Context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import PostsContextProvider from "./Context/PostsContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const query = new QueryClient();

let router = createBrowserRouter([
  { path: "signup", element: <Register /> },
  { path: "login", element: <Login /> },
  { path: "*", element: <Notfound /> },
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Navigate to="home" replace />
          </ProtectedRoute>
        ),
      }, // <-- هنا
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default function App() {
  return (
    <>
      <AuthContextProvider>
        <PostsContextProvider>
          <QueryClientProvider client={query}>
            <RouterProvider router={router}></RouterProvider>
          </QueryClientProvider>
        </PostsContextProvider>
      </AuthContextProvider>
    </>
  );
}
