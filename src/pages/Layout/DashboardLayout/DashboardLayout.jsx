import React from "react";
import useRole from "../../../hooks/useUserRole";
import { Outlet } from "react-router";
import AdminDashboardLayout from "../../Dashboard/AdminDashboardLayout";
import CreatorDashboard from "../../Dashboard/CreatorDashboardLayout";
import UserDashboard from "../../Dashboard/UserDashboardLayout";

const DashboardLayout = () => {
  const { role } = useRole();
  return (
    <div>
      {role === "admin" && <AdminDashboardLayout />}
      {role === "creator" && <CreatorDashboard />}
      {role === "user" && (
       <UserDashboard/>
      )}
    </div>
  );
};

export default DashboardLayout;
