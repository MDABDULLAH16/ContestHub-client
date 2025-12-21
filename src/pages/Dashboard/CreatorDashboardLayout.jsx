import { useState, useRef, useEffect } from "react";
import { Link, NavLink, Outlet } from "react-router";
import {
  Plus,
  Menu,
  X,
  Home,
  Trophy,
  Wallet,
  Settings,
  LayoutDashboard,
  Sparkles,
} from "lucide-react";
import ThemeToggle from "../../components/ThemeToggle/ThemeToggle";

const CreatorDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const navLinks = [
    { name: "Go Home", to: "/", icon: Home },
    { name: "Dashboard", to: "/dashboard/creator/creator-stats", icon: LayoutDashboard },
    {
      name: "My Created Contests",
      to: "/dashboard/creator/my-created-contests",
      icon: Trophy,
    },
    {
      name: "All Submissions",
      to: "/dashboard/creator/all-participants",
      icon: Wallet,
    },
    { name: "Settings", to: "/settings", icon: Settings },
  ];

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-base-200 flex text-base-content transition-colors duration-300">
      {/* ================= Sidebar ================= */}
      <aside
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-base-100 border-r border-base-300
        transform transition-all duration-300 ease-in-out shadow-2xl
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-6 h-20 border-b border-base-300 bg-base-100/50 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-600 rounded-lg">
              <Sparkles size={20} className="text-white" />
            </div>
            <h2
              className={`text-xl font-black tracking-tighter text-indigo-500 uppercase ${
                !sidebarOpen && "opacity-0"
              }`}
            >
              Creator<span className="text-base-content">Panel</span>
            </h2>
          </div>
          <button
            className="p-1 hover:bg-base-300 rounded-full transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={22} />
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="p-4 space-y-1">
          {navLinks.map(({ name, to, icon: Icon }) => (
            <NavLink
              end={true}
              key={name}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-200
                ${
                  isActive
                    ? "bg-indigo-600/10 text-indigo-500 border border-indigo-600/20 shadow-sm"
                    : "text-base-content/60 hover:bg-base-300 hover:text-base-content"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div
                    className={`${!sidebarOpen ? "tooltip tooltip-right" : ""}`}
                    data-tip={name}
                  >
                    <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  </div>
                  {sidebarOpen && (
                    <span className="tracking-tight">{name}</span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* ================= Main Content ================= */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* ================= Header ================= */}
        <header className="sticky top-0 z-30 bg-base-100/80 backdrop-blur-lg border-b border-base-300">
          <div className="flex items-center justify-between w-full px-4 sm:px-8 h-20">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 bg-base-200 border border-base-300 rounded-xl hover:bg-base-300 transition-all active:scale-95"
              >
                {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

              <div className="hidden sm:block">
                <h1 className="text-2xl font-black tracking-tight text-base-content uppercase italic">
                  Creator <span className="text-indigo-500">Hub</span>
                </h1>
                <p className="text-[10px] font-bold text-base-content/40 uppercase tracking-[0.2em]">
                  Manage contests & analytics
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-1 bg-base-200 border border-base-300 rounded-full">
                <ThemeToggle />
              </div>

              <Link
                to="/dashboard/creator/create-contest"
                className="inline-flex items-center gap-2 px-5 py-2.5
                bg-indigo-600 hover:bg-indigo-700
                text-white rounded-xl text-xs font-black uppercase tracking-widest
                shadow-[0_10px_20px_-10px_rgba(79,70,229,0.5)] 
                hover:shadow-[0_15px_25px_-10px_rgba(79,70,229,0.6)] 
                active:scale-95 transition-all"
              >
                <Plus size={16} strokeWidth={3} />
                Create Contest
              </Link>
            </div>
          </div>
        </header>

        {/* ================= Page Content ================= */}
        <main className="p-4 sm:p-10 flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default CreatorDashboard;
