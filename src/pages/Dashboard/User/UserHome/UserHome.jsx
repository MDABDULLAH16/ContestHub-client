import { Outlet } from "react-router";
import StatsCreators from "../../Creators/StatsCreators/StatsCreators";
 

const UserHome = () => {
  return (
    <>
      <StatsCreators></StatsCreators>
      <Outlet></Outlet>
    </>
  );
};

export default UserHome;
