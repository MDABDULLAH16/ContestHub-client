import React from "react";
import useRole from "../../../hooks/useUserRole";
import { Outlet } from "react-router";
import AdminDashboardLayout from "../../Dashboard/AdminDashboardLayout";
import CreatorDashboard from "../../Dashboard/CreatorDashboardLayout";

const DashboardLayout = () => {
  const { role } = useRole();
  return (
    <div>
      {role === "admin" && <AdminDashboardLayout />}
      {role === "creator" && <CreatorDashboard />}
      {role === "user" && (
        <h2 className="text-2xl font-bold">User Dashboard</h2>
      )}
    </div>
  );
};

export default DashboardLayout;
