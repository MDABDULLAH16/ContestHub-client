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
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import useRole from "../../hooks/useUserRole";

/* -------------------- LINK CONFIG -------------------- */
const NAV_LINKS = {
  admin: [
    { name: "Home", href: "/", icon: Home },
    { name: "Contests", href: "/contests", icon: Trophy },
  ],
  user: [
    { name: "Home", href: "/", icon: Home },
    { name: "Contests", href: "/contests", icon: Trophy },
    { name: "How It Works", href: "/how-it-works", icon: Zap },
    { name: "Be a Creator", href: "/be-creator", icon: Sparkles },
  ],
  creator: [
    { name: "Home", href: "/", icon: Home },
    {
      name: "Create Contest",
      href: "/dashboard/creator/create-contest",
      icon: Plus,
    },
    { name: "Contests", href: "/contests", icon: Trophy },
    { name: "How It Works", href: "/how-it-works", icon: Zap },
  ],
};

const DASHBOARD_LINKS = {
  admin: [
    { name: "Dashboard", href: "/dashboard/admin", icon: BarChart3 },
    { name: "Manage Users", href: "/users", icon: Users },
    { name: "Manage Contests", href: "/contests", icon: Trophy },
    { name: "Analytics", href: "/analytics", icon: BarChart3 },
  ],
  creator: [
    { name: "My Dashboard", href: "/dashboard/creator", icon: BarChart3 },
    {
      name: "Create Contest",
      href: "dashboard/creator/create-contest",
      icon: Plus,
    },
    { name: "My Contests", href: "/creator/contests", icon: Trophy },
    { name: "Earnings", href: "/creator/earnings", icon: Zap },
  ],
  user: [
    { name: "My Dashboard", href: "/dashboard/user", icon: BarChart3 },
    { name: "My Entries", href: "/entries", icon: Trophy },
    { name: "Wishlist", href: "/wishlist", icon: User },
    { name: "Be a Creator", href: "/creator", icon: Sparkles },
  ],
};

/* -------------------- REUSABLE COMPONENTS -------------------- */
const NavItem = ({ link, onClick, size = 18 }) => {
  const Icon = link.icon;
  return (
    <Link
      to={link.href}
      onClick={onClick}
      className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-indigo-600 rounded-lg transition"
    >
      <Icon size={size} /> {link.name}
    </Link>
  );
};

const UserAvatar = ({ user }) => (
  <div className="w-8 h-8 rounded-full bg-linear-to-br from-indigo-600 to-purple-600 flex items-center justify-center overflow-hidden">
    {user?.photoURL ? (
      <img
        src={user.photoURL}
        referrerPolicy="no-referrer"
        className="w-full h-full object-cover"
      />
    ) : (
      <span className="text-white font-bold text-sm">
        {(user?.displayName || user?.email)?.[0]?.toUpperCase()}
      </span>
    )}
  </div>
);

/* -------------------- MAIN COMPONENT -------------------- */
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();
  const { role } = useRole();

  const userRole = role || "user";
  const navLinks = NAV_LINKS[userRole];
  const dashboardLinks = DASHBOARD_LINKS[userRole];

  /* Click outside user dropdown */
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
    navigate("/");
  };

  return (
    <nav className="w-full bg-white sticky top-0 z-50 border-b shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-linear-to-br from-indigo-600 to-purple-600 flex items-center justify-center relative">
            <Trophy className="text-white" />
            <img src={trophyLogo} className="absolute w-6 h-6" />
          </div>
          <span className="text-2xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            ContestHub
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex">
          {navLinks.map((l) => (
            <NavItem key={l.name} link={l} />
          ))}
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen((p) => !p)}
                className="flex items-center gap-3 px-4 py-2 border rounded-lg bg-indigo-50/40"
              >
                <UserAvatar user={user} />
                <ChevronDown
                  size={16}
                  className={userMenuOpen ? "rotate-180" : ""}
                />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg">
                  <div className="px-4 py-3 border-b">
                    <p className="font-semibold">
                      {user.displayName || "User"}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>

                  {dashboardLinks.map((l) => (
                    <NavItem
                      key={l.name}
                      link={l}
                      size={16}
                      onClick={() => setUserMenuOpen(false)}
                    />
                  ))}

                  <NavItem
                    link={{
                      name: "Settings",
                      href: "/settings",
                      icon: Settings,
                    }}
                    size={16}
                  />
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-red-600 flex gap-2"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 text-indigo-600">
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setOpen((p) => !p)} className="md:hidden">
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
