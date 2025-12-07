import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";

const PrivateRouter = ({ children }) => {
  const location = useLocation();
    const { user, loading } = useAuth();
    if (loading) {      
    return <div>Loading...</div>;
  } 

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRouter;
