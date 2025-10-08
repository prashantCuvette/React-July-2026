import { useAuth } from "../contexts/AuthContext";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  let { user, loading } = useAuth();
  console.log(loading)

  if (loading) {
    return <h2> Data is Being Fetched</h2>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
