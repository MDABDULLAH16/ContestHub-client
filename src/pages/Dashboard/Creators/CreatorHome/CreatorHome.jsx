import { Outlet } from "react-router";
import StatsCreators from "../StatsCreators/StatsCreators";

const CreatorHome = () => {
  return (
    <>
      <StatsCreators></StatsCreators>
      <Outlet></Outlet>
    </>
  );
};

export default CreatorHome;
