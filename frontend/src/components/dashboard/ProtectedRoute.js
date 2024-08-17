import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ requiredTypes }) => {
  const token = localStorage.getItem("schoolcool-token");
  let userType = null;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userType = decodedToken.type;
      console.log(decodedToken);
    } catch (error) {
      console.error("Token decoding failed:", error);
    }
  }

  // If the user type matches one of the required types, render the component
  // Otherwise, redirect to the unauthorized page
  return userType && requiredTypes.includes(userType) ? (
    <Outlet />
  ) : (
    <Navigate to="/unauthorized" replace />
  );
};

export default ProtectedRoute;
