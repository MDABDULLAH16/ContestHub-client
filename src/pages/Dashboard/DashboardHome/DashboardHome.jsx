import { Outlet } from "react-router";
import StatsGrid from "../StatsGrid/StatsGrid";
import DashboardHeader from "./DashboardHeader";

const DashboardHome = () => {
  return (
    <>
    
      <StatsGrid />
      <Outlet></Outlet>
    </>
  );
};

export default DashboardHome;
