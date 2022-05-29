import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, isAdmin }) {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (isAdmin === true && user.role !== "admin") {
    <Navigate to="/login" />;
  }

  return <>{loading === false && children}</>;
}
