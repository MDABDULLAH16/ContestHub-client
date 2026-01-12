import { useState, useRef, useEffect } from "react";
import trophyLogo from "/trophy.png";
import {
  Menu,
  X,
  LogOut,
  Settings,
  BarChart3,
  User,
  Plus,
  ChevronDown,
  Home,
  Zap,
  Users,
  Trophy,
  Sparkles,
  ListOrdered,
  BadgeInfo,
  LogIn,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import useRole from "../../hooks/useUserRole";
import ThemeToggle from "../ThemeToggle/ThemeToggle";

/* -------------------- LINK CONFIG -------------------- */
const NAV_LINKS = {
  admin: [
    { name: "Home", href: "/", icon: Home },
    { name: "Leaderboard", href: "/leaderboard", icon: ListOrdered },
    { name: "Contests", href: "/contests", icon: Trophy },
    { name: "Why ContestHub", href: "/why-contestHub", icon: Zap },
    { name: "About Us", href: "/about", icon: BadgeInfo },
  ],
  user: [
    { name: "Home", href: "/", icon: Home },
    { name: "Contests", href: "/contests", icon: Trophy },
    { name: "Leaderboard", href: "/leaderboard", icon: ListOrdered },
    { name: "How It Works", href: "/how-it-works", icon: Zap },
    { name: "Why ContestHub", href: "/why-contestHub", icon: Zap },
  ],
  creator: [
    { name: "Home", href: "/", icon: Home },
    { name: "Contests", href: "/contests", icon: Trophy },
    { name: "Leaderboard", href: "/leaderboard", icon: ListOrdered },
    { name: "How It Works", href: "/how-it-works", icon: Zap },
    { name: "Why ContestHub", href: "/why-contestHub", icon: Zap },
  ],
};

const DASHBOARD_LINKS = {
  admin: [
    {
      name: "Dashboard",
      href: "/dashboard/admin/admin-stats",
      icon: BarChart3,
    },
    {
      name: "Manage Users",
      href: "/dashboard/admin/user-management",
      icon: Users,
    },
    { name: "Manage Contests", href: "/contests", icon: Trophy },
    { name: "Profile", href: "/profile", icon: User },
  ],
  creator: [
    {
      name: "My Dashboard",
      href: "/dashboard/creator/creator-stats",
      icon: BarChart3,
    },
    {
      name: "Create Contest",
      href: "dashboard/creator/create-contest",
      icon: Plus,
    },
    {
      name: "My Contests",
      href: "dashboard/creator/my-created-contests",
      icon: Trophy,
    },
    { name: "Profile", href: "/profile", icon: User },
  ],
  user: [
    { name: "My Dashboard", href: "/dashboard/user/my-stats", icon: BarChart3 },
    {
      name: "My Entries",
      href: "/dashboard/user/my-entries-contests",
      icon: Trophy,
    },
    { name: "Be a Creator", href: "/be-creator", icon: Sparkles },
    { name: "Profile", href: "/profile", icon: User },
  ],
};

/* -------------------- REUSABLE COMPONENTS -------------------- */
const NavItem = ({ link, onClick, size = 18, className = "" }) => {
  const Icon = link.icon;
  const location = useLocation();
  const isActive = location.pathname === link.href;

  return (
    <Link
      to={link.href}
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all ${
        isActive
          ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400"
          : "  hover:text-indigo-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
      } ${className}`}
    >
      <Icon size={size} /> {link.name}
    </Link>
  );
};

const UserAvatar = ({ user, size = "w-8 h-8" }) => (
  <div
    className={`${size} rounded-full bg-linear-to-br from-indigo-600 to-purple-600 flex items-center justify-center overflow-hidden shrink-0`}
  >
    {user?.photoURL ? (
      <img
        src={user.photoURL}
        alt="User"
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover"
      />
    ) : (
      <span className="text-white font-bold text-xs">
        {(user?.displayName || user?.email)?.[0]?.toUpperCase()}
      </span>
    )}
  </div>
);

/* -------------------- MAIN COMPONENT -------------------- */
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();
  const { role } = useRole();

  const userRole = role || "user";
  const navLinks = NAV_LINKS[userRole];
  const dashboardLinks = DASHBOARD_LINKS[userRole];

  useEffect(() => {
    const close = (e) =>
      userMenuRef.current &&
      !userMenuRef.current.contains(e.target) &&
      setUserMenuOpen(false);
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const handleLogout = async () => {
    await logoutUser();
    setIsMobileMenuOpen(false);
    setUserMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className="w-full bg-base-200 sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 rounded-lg bg-linear-to-br from-indigo-600 to-purple-600 flex items-center justify-center relative shadow-indigo-500/20 shadow-lg">
            {trophyLogo && (
              <img src={trophyLogo} className="absolute w-5 h-5" alt="" />
            )}
          </div>
          <span className="text-xl font-black bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent  ">
            ContestHub
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((l) => (
            <NavItem key={l.name} link={l} />
          ))}
        </div>

        {/* Desktop Action Area */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen((p) => !p)}
                className="flex items-center gap-2  p-1.5 pr-3 border border-slate-200 dark:border-slate-800 rounded-full hover:bg-slate-50 dark:hover:bg-slate-900 transition-all"
              >
                <UserAvatar user={user} />
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${
                    userMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {/* // Find the User Menu Dropdown (Desktop) and update the div
              classes: */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl py-2 overflow-hidden animate-in fade-in zoom-in duration-200 z-50">
                  {/* Header Section */}
                  <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 mb-2 bg-slate-50/50 dark:bg-slate-800/50">
                    <p className="font-bold truncate text-sm text-slate-900 dark:text-white">
                      {user.displayName || "Champion"}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {user.email}
                    </p>
                  </div>

                  {/* Dynamic Dashboard Links */}
                  <div className="px-2 space-y-0.5">
                    {dashboardLinks.map((l) => (
                      <NavItem
                        key={l.name}
                        link={l}
                        size={16}
                        onClick={() => setUserMenuOpen(false)}
                        className="text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-indigo-500/10 dark:hover:text-indigo-400"
                      />
                    ))}
                  </div>

                  {/* Logout Section */}
                  <div className="border-t border-slate-100 dark:border-slate-800 mt-2 pt-2 px-2">
                    <button
                      onClick={handleLogout}
                      className="w-full px-3 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-3 text-sm font-medium rounded-lg transition-all"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="px-6 py-2 text-white bg-linear-to-br from-indigo-600 to-purple-600   rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/20 hover:scale-105 transition-all"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Buttons (Toggle + Theme) */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2   dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40  bg-base-200 border-t border-slate-200 dark:border-slate-800 animate-in slide-in-from-top duration-300 overflow-y-auto">
          <div className="p-4 space-y-6">
            {/* User Profile Section in Mobile */}
            {user && (
              <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl">
                <UserAvatar user={user} size="w-12 h-12" />
                <div className="overflow-hidden">
                  <p className="font-bold text-slate-900 dark:text-white truncate">
                    {user.displayName || "Champion"}
                  </p>
                  <p className="text-xs text-slate-500 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            )}

            {/* General Navigation Section */}
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 px-2">
                Navigation
              </p>
              <div className="grid grid-cols-1 gap-1">
                {navLinks.map((l) => (
                  <NavItem
                    key={l.name}
                    link={l}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="py-3 px-4"
                  />
                ))}
              </div>
            </div>

            {/* Dashboard Section */}
            {user && (
              <div>
                <p className="text-[10px] bg-gray-500 font-black uppercase tracking-widest text-slate-400 mb-3 px-2">
                  Account Dashboard
                </p>
                <div className="grid grid-cols-1 gap-1">
                  {dashboardLinks.map((l) => (
                    <NavItem
                      key={l.name}
                      link={l}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="py-3 px-4"
                    />
                  ))}
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 flex items-center gap-3 text-sm font-medium rounded-xl transition-all mt-2"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              </div>
            )}

            {/* Guest Login Section */}
            {!user && (
              <Link
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-4 bg-linear-to-br from-indigo-600 to-purple-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-500/20"
              >
                <LogIn size={20} /> Login to ContestHub
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
