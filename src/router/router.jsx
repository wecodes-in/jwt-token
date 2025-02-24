import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import App from "../App.jsx";
import Cookies from "js-cookie"; 
import Login from "../components/Login.jsx";
import Register from "../components/Register.jsx";
import Dashboard from "../components/Dashboard.jsx";

const PrivateRoute = () => {
  const token = Cookies.get("token"); 
  return token ? <Outlet /> : <Navigate to="/login" />;
};

// 🚫 Redirect Logged-In Users Away from Login
const PublicRoute = ({ element }) => {
  const token = Cookies.get("token");
  return token ? <Navigate to="/dashboard" /> : element;
};


const router = createBrowserRouter([
  { path: "/", element: <App /> },
// ✅ Prevent logged-in users from accessing login/register pages
{ path: "/login", element: <PublicRoute element={<Login />} /> },
{ path: "/register", element: <PublicRoute element={<Register />} /> },

  {
    path: "/dashboard",
    element: <PrivateRoute />,
    children: [{ path: "", element: <Dashboard /> }],
  },
  { path: "*", element: <Navigate to="/login" /> },
]);

export default router;
