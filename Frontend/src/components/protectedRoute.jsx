// ProtectedRoute.js
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  // 1. Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 2. Logged in but role not allowed
  // ("allowedRole" is array so we use includes to check value ,
  //  usefull for multiUser allow case)
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (user.role === "admin" && !allowedRoles.includes("admin")) {
    return <Navigate to="/adminDashboard" replace />;
  }

  // 3. All good
  return children;
}
