import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import trophyLogo from "/trophy.png";
import {
  LucideHome,
  LayoutDashboard,
  Users2,
  UserRoundPlus,
  Bike,
  LogOut,
  Trophy,
  UserCheck,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import DashboardHeader from "./DashboardHome/DashboardHeader";
import UserManagement from "./Admin/UserManagement/UserManagement";

const AdminDashboardLayout = () => {
  const { logoutUser } = useAuth();

  const handleLogOut = () => logoutUser();

  // Admin links
  const adminLinks = [
    { to: "/", label: "Home", icon: LucideHome },
    { to: "/dashboard/admin", label: "Dashboard", icon: LayoutDashboard },
    {
      to: "/dashboard/admin/user-management",
      label: "User Management",
      icon: UserCheck,
    },
    {
      to: "/dashboard/admin/creator-apply",
      label: "Creator Management",
      icon: Users2,
    },
    {
      to: "/dashboard/admin/Applied-contests",
      label: "applied-contests",
      icon: Trophy,
    },
  ];

  return (
    <div className="drawer lg:drawer-open min-h-screen">
      {/* Drawer controller */}
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col">
        {/* Top Navbar */}
        <nav className="navbar bg-base-300 px-4">
          <label
            htmlFor="my-drawer"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="size-5"
            >
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </svg>
          </label>
          <DashboardHeader />
        </nav>
        {/* Page Content */}
        <div className="p-6">
          <Outlet />
          
        </div>
      </div>

      {/* Sidebar / Drawer */}
      <div className="drawer-side is-drawer-close:overflow-visible">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>

        <div
          className="flex min-h-full flex-col bg-base-200
          is-drawer-close:w-16 is-drawer-open:w-64 transition-all duration-300"
        >
          {/* Sidebar Menu */}
          <ul className="menu w-full grow p-2">
            {/* Admin Links */}
            <li className="menu-title text-xs">
              <span className="is-drawer-close:hidden">
                {/* logo  */}
                <Link to="/" className="flex items-center gap-2 group">
                  <div className="relative w-10 h-10 rounded-lg bg-linear-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                    <Trophy size={24} className="text-white" />
                    <img src={trophyLogo} className="w-6 h-6 absolute" />
                  </div>
                  <span className="text-2xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hidden sm:inline">
                    ContestHub
                  </span>
                  <span className="text-2xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent sm:hidden">
                    ContestHub
                  </span>
                </Link>
              </span>
            </li>
            {adminLinks.map((link, idx) => (
              <li key={idx}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 
                    is-drawer-close:tooltip is-drawer-close:tooltip-right
                  is-drawer-close:tooltip-primary

                    
                    ${isActive ? "bg-primary text-white" : " "}`
                  }
                  data-tip={link.label}
                  end={true}
                >
                  <link.icon size={20} />
                  <span className="is-drawer-close:hidden">{link.label}</span>
                </NavLink>
              </li>
            ))}

            {/* Logout */}
            <li className="">
              <button
                onClick={handleLogOut}
                className="flex items-center gap-3 text-error
                is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Logout"
              >
                <LogOut size={20} />
                <span className="is-drawer-close:hidden">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
