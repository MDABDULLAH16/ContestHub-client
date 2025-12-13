import { createBrowserRouter } from "react-router";
import RootLayout from "./../pages/Layout/RootLayout/RootLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRouter from "./PrivateRouter";
import Contests from './../pages/Contests/Contests';
import About from "../pages/About/About";
import HowItWorks from "../pages/HowItWorks/HowItWorks";
 
import DashboardLayout from './../pages/Layout/DashboardLayout/DashboardLayout';
import BeACreator from './../pages/Dashboard/User/BeACreator/BeACreator';
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import CreatorApply from './../pages/Dashboard/Admin/CreatorApply/CreatorApply';


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
      { index: true,Component:DashboardHome  },
      
      { path: "contests", element: <Contests /> },
      { path: "creator-apply", element: <CreatorApply /> },
      // { path: "analytics", element: <Analytics /> },
     
    ],
  },
]);
