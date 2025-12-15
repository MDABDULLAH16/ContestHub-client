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
        element: (
          <PrivateRouter>
            <Contests></Contests>
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
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
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
          { path: "contests", element: <Contests /> },
          //creator
        ],
      },
      //creator routes
      {
        path: "creator",
        Component: CreatorHome,
        children: [
          {
            path: "my-created-contests",
            Component: MyCreatedContest,
          },          
          {
            path: "create-contest",
            Component: CreateContest,
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
