import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import Loader from "../components/Loader/Loader";

const PrivateRouter = ({ children }) => {
  const location = useLocation();
    const { user, loading } = useAuth();
    if (loading) {      
    return <Loader></Loader>;
  } 

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRouter;
