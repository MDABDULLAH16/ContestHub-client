import { createBrowserRouter } from "react-router";
import RootLayout from "./../pages/Layout/RootLayout/RootLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRouter from "./PrivateRouter";
import Contests from "./../pages/Contests/Contests";
import About from "../pages/About/About";
import HowItWorks from "../pages/HowItWorks/HowItWorks";

import DashboardLayout from "./../pages/Layout/DashboardLayout/DashboardLayout";
import BeACreator from "./../pages/Dashboard/User/BeACreator/BeACreator";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import CreatorApply from "./../pages/Dashboard/Admin/CreatorApply/CreatorApply";
import NotFound from "../components/NotFound/NotFound";
import CreatorDashboard from "../pages/Dashboard/CreatorDashboardLayout";
import MyCreatedContest from "../pages/Dashboard/Creators/MyCreatedContest/MyCreatedContest";
import CreatorHome from "../pages/Dashboard/Creators/CreatorHome/CreatorHome";
import CreateContest from "../pages/Dashboard/Admin/Contests/CreateContest/CreateContest";
import Settings from "../pages/Settings/Settings";
import AppliedContests from "../pages/Dashboard/Admin/AppliedContests/AppliedContests";
import ContestDetails from "../pages/Contests/ContestDetails";
import PaymentCancelled from "../pages/Payments/PaymentCancelled/PaymentCancelled";
import PaymentSuccess from "../pages/Payments/PaymentSuccess/PaymentSuccess";
import Payment from "../pages/Payments/Payment";
import ContestParticipants from "../pages/Dashboard/Creators/ContestParticipants/ContestParticipants";
import AllParticipants from "../pages/Dashboard/Creators/AllParticipants/AllParticipants";
import UserManagement from "../pages/Dashboard/Admin/UserManagement/UserManagement";
import Leaderboard from "../pages/Leaderboard/Leaderboard";
import Profile from "../pages/Profile/Profile";
import WhyContestHub from "../pages/WhyContestHub/WhyContestHub";
import UserDashboard from "../pages/Dashboard/UserDashboardLayout";
import MyEntriesContest from "../pages/Dashboard/User/MyEntriesContest/MyEntriesContest";
import MyWinningContest from "../pages/Dashboard/User/MyWinningContest/MyWinningContest";
import UserHome from "../pages/Dashboard/User/UserHome/UserHome";
import MyStats from "../pages/Dashboard/User/MyStats/MyStats";
import StatsCreators from "../pages/Dashboard/Creators/StatsCreators/StatsCreators";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "contests",
        element: <Contests></Contests>,
      },
      {
        path: "contest-details/:id",
        element: (
          <PrivateRouter>
            <ContestDetails></ContestDetails>
          </PrivateRouter>
        ),
      },
      {
        path: "be-creator",
        Component: BeACreator,
      },
      {
        path: "about",
        Component: About,
      },

      {
        path: "how-it-works",
        Component: HowItWorks,
      },
      {
        path: "why-contestHub",
        Component: WhyContestHub,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "settings",
        Component: Settings,
      },
      {
        path: "profile",
        Component: Profile,
      },
      {
        path: "leaderboard",
        Component: Leaderboard,
      },
      {
        path: "payment-success",
        element: (
          <PrivateRouter>
            <PaymentSuccess></PaymentSuccess>
          </PrivateRouter>
        ),
      },
      {
        path: "payment-cancelled",
        element: (
          <PrivateRouter>
            <PaymentCancelled></PaymentCancelled>
          </PrivateRouter>
        ),
      },
      {
        path: "payment/:contestId",
        element: (
          <PrivateRouter>
            <Payment></Payment>
          </PrivateRouter>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRouter>
        <DashboardLayout></DashboardLayout>
      </PrivateRouter>
    ),
    children: [
      //admin routes
      {
        path: "admin",
        Component: DashboardHome,
        children: [
          { path: "creator-apply", element: <CreatorApply /> },
          { path: "applied-contests", element: <AppliedContests /> },
          { path: "user-management", element: <UserManagement /> },
          //creator
        ],
      },
      //creator routes
      {
        path: "creator",
        Component: CreatorHome,
        children: [
          {
            path: "creator-stats",
            Component: StatsCreators,
          },
          {
            path: "my-created-contests",
            Component: MyCreatedContest,
          },
          {
            path: "create-contest",
            Component: CreateContest,
          },
          {
            path: "contest-participants/:id",
            Component: ContestParticipants,
          },
          {
            path: "all-participants",
            Component: AllParticipants,
          },
        ],
      },
      {
        path: "user",
        Component: UserHome,
        children: [
          {
            path: "my-stats",
            Component: MyStats,
          },
          {
            path: "my-entries-contests",
            Component: MyEntriesContest,
          },
          {
            path: "my-winning-contests",
            Component: MyWinningContest,
          },
          {
            path: "my-profile",
            Component: Profile,
          },
        ],
      },
    ],
  },
  {
    path: "*", 
    Component: NotFound,
  },
]);
