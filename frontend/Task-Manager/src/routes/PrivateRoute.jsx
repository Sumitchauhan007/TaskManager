import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserAuth } from "../hooks/useUserAuth"; // adjust path if needed

const PrivateRoute = ({ allowedRoles }) => {
  const { user, loading } = useUserAuth();

  console.log("PrivateRoute Debug:", { user, loading, allowedRoles });

  if (loading) {
    return <p>Loading...</p>; // ⏳ wait for auth check
  }

  // If not logged in → redirect to login
  if (!user) {
    console.log("No user found, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  // If roles are specified and user's role is not allowed → redirect to unauthorized
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    console.log("Role not allowed:", user.role, "Allowed:", allowedRoles);
    return <Navigate to="/unauthorized" replace />;
  }

  console.log("Access granted to user:", user.role);
  // Otherwise → render the nested route
  return <Outlet />;
};

export default PrivateRoute;
