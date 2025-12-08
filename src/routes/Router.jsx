import { createBrowserRouter } from "react-router";
import RootLayout from "./../pages/Layout/RootLayout/RootLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRouter from "./PrivateRouter";
import Contests from './../pages/Contests/Contests';
import About from "../pages/About/About";
import HowItWorks from "../pages/HowItWorks/HowItWorks";
import CreatorDashboard from "../pages/Dashboard/CreatorDashboard";
import UserDashboard from "../pages/Dashboard/UserDashboard";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
 

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
    path:"dashboard",
    element: <PrivateRouter>
      {/* Dashboard Layout can be added here */}  
    </PrivateRouter>,
    children:[
      // Dashboard related routes can be added here
      {
        path: 'creator',
        Component: CreatorDashboard,
      },
      {
        path: 'user',
        Component: UserDashboard,
      },
      {
        path:'admin',
        Component: AdminDashboard,
      }
    ] 
  }
]);
