import { useState, useRef, useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router";
import { Plus, Menu, X, Home, Trophy, Wallet, Settings, LayoutDashboard, Edit2, User } from "lucide-react";
 
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";

const UserDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const navLinks = [
    { name: "Go Home", to: "/", icon: Home },
    { name: "Dashboard", to: "/dashboard/user", icon: LayoutDashboard },
    {
      name: "My Entries Contests",
      to: "/dashboard/user/my-entries-contests",
      icon: Edit2,
    },
 
    {
      name: "My Winning Contests",
      to: "/dashboard/user/my-winning-contests",
      icon: Trophy,
    },
    { name: "profile", to: "/profile", icon: User },
  ];

  // Close sidebar if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };

    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* ================= Sidebar ================= */}
      <aside
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-6 h-16 border-b">
          <h2
            className={`text-lg font-bold text-indigo-600 ${
              !sidebarOpen && "opacity-0"
            }`}
          >
            Creator Panel
          </h2>
          <button onClick={() => setSidebarOpen(false)}>
            <X size={22} />
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="p-4 space-y-2">
          {navLinks.map(({ name, to, icon: Icon }) => (
            <NavLink
              end={true}
              key={name}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition
                ${
                  isActive
                    ? "bg-indigo-100 text-indigo-600"
                    : "text-gray-600 hover:bg-gray-100"
                }
                ${!sidebarOpen ? "justify-center" : ""}`
              }
            >
              {/* Tooltip wrapper when sidebar closed */}
              <div
                className={`${!sidebarOpen ? "tooltip tooltip-right" : ""}`}
                data-tip={name}
              >
                <Icon size={20} />
              </div>
              {sidebarOpen && <span>{name}</span>}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* ================= Main Content ================= */}
      <div className="flex-1">
        {/* ================= Header ================= */}
        <header className="sticky top-0 z-30 bg-base-100 border-b">
          <div className="flex items-center justify-between w-full px-4 sm:px-6 h-16">
            <div className="flex items-center gap-3">
              {/* Toggle Button (All Devices) */}
              <button onClick={() => setSidebarOpen(!sidebarOpen)}>
                {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
              </button>

              <div>
                <h1 className="text-xl font-bold text-base-content">
                  My Dashboard
                </h1>
                <p className="text-sm text-base-content/70 hidden sm:block">
                  Manage your contests and earnings
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Create Contest Button */}
              <Link
                to="/be-creator"
                className="inline-flex items-center gap-2 px-4 py-2
                bg-linear-to-r from-indigo-600 to-purple-600
                text-white rounded-lg text-sm font-medium
                hover:shadow-lg transition"
              >
                <Plus size={18} />
                Be A Creator
              </Link>
            </div>
          </div>
        </header>
         
        {/* ================= Page Content ================= */}
        <main className="p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserDashboard;
