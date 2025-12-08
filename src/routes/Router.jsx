import { createBrowserRouter } from "react-router";
import RootLayout from "./../pages/Layout/RootLayout/RootLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRouter from "./PrivateRouter";
import Contests from './../pages/Contests/Contests';
import About from "../pages/About/About";
import HowItWorks from "../pages/HowItWorks/HowItWorks";
import Settings from "../pages/Settings/Settings";
import DashboardLayout from './../pages/Layout/DashboardLayout/DashboardLayout';


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
        path:'contests',
        element: <PrivateRouter>
          <Contests></Contests>
        </PrivateRouter>
      },
      {
      path:"about",
        Component: About,
      },
      {
      path:"settings",
        Component: Settings,
      },
      {
      path:"how-it-works",
        Component: HowItWorks,
      },
      {
      path:"login",
        Component: Login,
      },
      {
        path:"register",
        Component: Register,
      },
    ],
  },
  {
    path: 'dashboard',
    element: <PrivateRouter>
      <DashboardLayout></DashboardLayout>
    </PrivateRouter>,
    children: [
      // Dashboard routes will go here

    ]
  }  
  
]);
