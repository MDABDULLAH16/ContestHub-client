import { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  LogOut,
  Settings,
  BarChart3,
  User,
  Trophy,
  Plus,
  ChevronDown,
  Home,
  Zap,
  Users,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  const { user, logoutUser } = useAuth();

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogOut = async () => {
    try {
      await logoutUser();
      setUserMenuOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  // Determine user role (you can fetch this from database/context)
  // For now, using placeholder - integrate with your backend
  const getUserRole = () => {
    // Replace with actual role fetching logic
    return localStorage.getItem("userRole") || "user";
  };

  const userRole = user ? getUserRole() : null;

  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Contests", href: "/contests", icon: Trophy },
    { name: "How It Works", href: "/how-it-works", icon: Zap },
  ];

  const dashboardLinks = {
    admin: [
      { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
      { name: "Manage Users", href: "/users", icon: Users },
      { name: "Manage Contests", href: "/contests", icon: Trophy },
      { name: "Analytics", href: "/analytics", icon: BarChart3 },
    ],
    creator: [
      { name: "My Dashboard", href: "/dashboard", icon: BarChart3 },
      { name: "Create Contest", href: "/create", icon: Plus },
      { name: "My Contests", href: "/contests", icon: Trophy },
      { name: "Earnings", href: "/creator/earnings", icon: Zap },
    ],
    user: [
      { name: "My Dashboard", href: "/dashboard", icon: BarChart3 },
      { name: "My Entries", href: "/entries", icon: Trophy },
      { name: "Wishlist", href: "/wishlist", icon: User },
    ],
  };

  const getUserMenuLinks = () => {
    if (!userRole || userRole === "user") {
      return dashboardLinks.user;
    } else if (userRole === "creator") {
      return dashboardLinks.creator;
    } else if (userRole === "admin") {
      return dashboardLinks.admin;
    }
    return [];
  };

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 left-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0 group cursor-pointer"
          >
            <div className="w-10 h-10 bg-linear-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:scale-105 transition-transform">
              <Trophy size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hidden sm:inline">
              ContestHub
            </span>
            <span className="text-2xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent sm:hidden">
              CH
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className="px-4 py-2 text-gray-700 hover:text-indigo-600 font-medium transition flex items-center gap-2 rounded-md hover:bg-gray-50"
                >
                  <IconComponent size={18} />
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="relative" ref={userMenuRef}>
                {/* User Avatar Button */}
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-3 px-4 py-2 rounded-lg bg-linear-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 transition border border-indigo-200"
                >
                  <div className="w-8 h-8 rounded-full bg-linear-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {user?.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt="User Avatar"
                          referrerPolicy="no-referrer"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : user?.displayName ? (
                        user.displayName.charAt(0).toUpperCase()
                      ) : (
                        user.email.charAt(0).toUpperCase()
                      )}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                    {user?.displayName || user?.email?.split("@")[0]}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-gray-600 transition-transform ${
                      userMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* User Dropdown Menu */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20 animate-in fade-in slide-in-from-top-2 duration-200">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">
                        {user?.displayName || "User"}
                      </p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                      {userRole && (
                        <div className="mt-2">
                          <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full capitalize">
                            {userRole === "user" ? "Participant" : userRole}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Dashboard Links */}
                    <div className="py-2 border-b border-gray-100">
                      {getUserMenuLinks().map((link) => {
                        const IconComponent = link.icon;
                        return (
                          <Link
                            key={link.name}
                            to={link.href}
                            className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition text-sm"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <IconComponent size={16} />
                            {link.name}
                          </Link>
                        );
                      })}
                    </div>

                    {/* Settings & Logout */}
                    <div className="py-2">
                      <Link
                        to="/settings"
                        className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition text-sm"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Settings size={16} />
                        Settings
                      </Link>
                      <button
                        onClick={handleLogOut}
                        className="w-full text-left flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition text-sm"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="px-5 py-2 text-indigo-600 font-medium hover:bg-indigo-50 rounded-lg transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Icon */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <X size={24} className="text-gray-700" />
            ) : (
              <Menu size={24} className="text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-3 space-y-2 max-h-96 overflow-y-auto">
            {/* Mobile Nav Links */}
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-indigo-600 rounded-lg transition text-sm font-medium"
                  onClick={() => setOpen(false)}
                >
                  <IconComponent size={18} />
                  {link.name}
                </Link>
              );
            })}

            {/* Mobile User Section */}
            {user && (
              <>
                <div className="border-t border-b border-gray-200 py-3 my-3">
                  <p className="px-4 text-xs font-semibold text-gray-500 uppercase">
                    Account
                  </p>
                  {getUserMenuLinks().map((link) => {
                    const IconComponent = link.icon;
                    return (
                      <Link
                        key={link.name}
                        to={link.href}
                        className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-indigo-600 rounded-lg transition text-sm"
                        onClick={() => setOpen(false)}
                      >
                        <IconComponent size={16} />
                        {link.name}
                      </Link>
                    );
                  })}
                </div>

                <Link
                  to="/settings"
                  className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-indigo-600 rounded-lg transition text-sm font-medium"
                  onClick={() => setOpen(false)}
                >
                  <Settings size={18} />
                  Settings
                </Link>

                <button
                  onClick={() => {
                    handleLogOut();
                    setOpen(false);
                  }}
                  className="w-full text-left flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition text-sm font-medium"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            )}

            {/* Mobile Auth Buttons */}
            {!user && (
              <div className="border-t border-gray-200 pt-3 space-y-2 mt-3">
                <Link
                  to="/login"
                  className="block px-4 py-2 text-indigo-600 font-medium hover:bg-indigo-50 rounded-lg transition text-center"
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition font-medium text-center"
                  onClick={() => setOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
