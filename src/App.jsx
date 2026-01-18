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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import PostDetails from "./components/PostDetails/PostDetails";

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
      {
        path: "PostDetails/:id",
        element: (
          <ProtectedRoute>
            <PostDetails />
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
        <QueryClientProvider client={query}>
          <RouterProvider router={router}></RouterProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
      </AuthContextProvider>
    </>
  );
}
