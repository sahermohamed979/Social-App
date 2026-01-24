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
import SettingChangePas from "./components/SettingsChangePas/SettingChangePas";

const query = new QueryClient();

// Router Configuration
const router = createBrowserRouter([
  // Public Routes (Login/Signup)
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Register />,
  },

  // Protected Routes with Layout
  {
    path: "/",
    element: <Layout />,
    children: [
      // Root redirect to home
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Navigate to="/home" replace />
          </ProtectedRoute>
        ),
      },
      // Home
      {
        path: "home",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      // Profile
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      // Post Details
      {
        path: "post/:id",
        element: (
          <ProtectedRoute>
            <PostDetails />
          </ProtectedRoute>
        ),
      },
      // Settings
      {
        path: "settings",
        element: (
          <ProtectedRoute>
            <SettingChangePas />
          </ProtectedRoute>
        ),
      },
    ],
  },

  // 404 Not Found - Must be last
  {
    path: "*",
    element: <Notfound />,
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
