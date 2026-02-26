import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserAuth } from "../hooks/useUserAuth"; // adjust path if needed

const PrivateRoute = ({ allowedRoles }) => {
  const { user, loading } = useUserAuth();

  if (loading) {
    return <p>Loading...</p>; // ⏳ wait for auth check
  }

  // If not logged in → redirect to login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If roles are specified and user's role is not allowed → redirect to unauthorized
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Otherwise → render the nested route
  return <Outlet />;
};

export default PrivateRoute;
