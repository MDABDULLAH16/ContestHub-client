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
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const userMenuRef = useRef(null);
  const navigate = useNavigate();
  const { user, logoutUser } = useAuth();

  // Click outside to close user dropdown
  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Get role
  const userRole = user ? localStorage.getItem("userRole") || "user" : null;

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
      { name: "My Contests", href: "/creator/contests", icon: Trophy },
      { name: "Earnings", href: "/creator/earnings", icon: Zap },
    ],
    user: [
      { name: "My Dashboard", href: "/dashboard", icon: BarChart3 },
      { name: "My Entries", href: "/entries", icon: Trophy },
      { name: "Wishlist", href: "/wishlist", icon: User },
    ],
  };

  const userMenuLinks = userRole ? dashboardLinks[userRole] : [];

  // Logout
  const handleLogOut = async () => {
    try {
      await logoutUser();
      navigate("/");
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  // Reusable NavLink component
  const NavItem = ({ link, onClick, size = 18 }) => {
    const Icon = link.icon;
    return (
      <Link
        to={link.href}
        className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-indigo-600 rounded-lg transition text-sm font-medium"
        onClick={onClick}
      >
        <Icon size={size} /> {link.name}
      </Link>
    );
  };

  // User Avatar Component
  const UserAvatar = () => (
    <div className="w-8 h-8 rounded-full bg-linear-to-br from-indigo-600 to-purple-600 flex items-center justify-center overflow-hidden">
      {user?.photoURL ? (
        <img
          src={user.photoURL}
          referrerPolicy="no-referrer"
          alt="Avatar"
          className="w-full h-full object-cover"
        />
      ) : (
        <span className="text-white font-bold text-sm">
          {user?.displayName?.charAt(0)?.toUpperCase() ||
            user?.email?.charAt(0)?.toUpperCase()}
        </span>
      )}
    </div>
  );

  // User Dropdown Component
  const UserDropdown = () => (
    <div
      className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border py-2 z-20"
      ref={userMenuRef}
    >
      {/* User Info */}
      <div className="px-4 py-3 border-b">
        <p className="font-semibold">{user?.displayName || "User"}</p>
        <p className="text-xs text-gray-500">{user?.email}</p>
        {userRole && (
          <span className="mt-2 inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full capitalize">
            {userRole === "user" ? "Participant" : userRole}
          </span>
        )}
      </div>

      {/* Dashboard Links */}
      <div className="border-b py-2">
        {userMenuLinks.map((l) => (
          <NavItem
            key={l.name}
            link={l}
            size={16}
            onClick={() => setUserMenuOpen(false)}
          />
        ))}
      </div>

      {/* Settings + Logout */}
      <NavItem
        link={{ name: "Settings", href: "/settings", icon: Settings }}
        size={16}
        onClick={() => setUserMenuOpen(false)}
      />
      <button
        className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 text-sm"
        onClick={handleLogOut}
      >
        <LogOut size={16} /> Logout
      </button>
    </div>
  );

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50 border-b">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative w-10 h-10 rounded-lg bg-linear-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
            <Trophy size={24} className="text-white" />
            <img src={trophyLogo} className="w-6 h-6 absolute" />
          </div>
          <span className="text-2xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hidden sm:inline">
            ContestHub
          </span>
          <span className="text-2xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent sm:hidden">
            CH
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavItem key={link.name} link={link} />
          ))}
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen((p) => !p)}
                className="flex items-center gap-3 px-4 py-2 rounded-lg bg-indigo-50/40 border"
              >
                <UserAvatar />
                <span className="hidden sm:inline text-sm">
                  {user.displayName || user.email.split("@")[0]}
                </span>
                <ChevronDown
                  size={16}
                  className={`transition ${userMenuOpen ? "rotate-180" : ""}`}
                />
              </button>
              {userMenuOpen && <UserDropdown />}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-5 py-2 bg-indigo-600 text-white rounded-lg"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setOpen((p) => !p)} className="md:hidden p-2">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="md:hidden border-t bg-white px-4 py-3 space-y-2">
          {/* Nav links */}
          {navLinks.map((link) => (
            <NavItem
              key={link.name}
              link={link}
              onClick={() => setOpen(false)}
            />
          ))}

          {/* User section */}
          {user && (
            <>
              <div className="border-y py-3">
                <p className="px-4 text-xs text-gray-500">Account</p>
                {userMenuLinks.map((l) => (
                  <NavItem
                    key={l.name}
                    link={l}
                    onClick={() => setOpen(false)}
                  />
                ))}
              </div>

              <NavItem
                link={{ name: "Settings", href: "/settings", icon: Settings }}
                onClick={() => setOpen(false)}
              />

              <button
                onClick={handleLogOut}
                className="w-full flex items-center gap-3 px-4 py-2 text-red-600"
              >
                <LogOut size={18} /> Logout
              </button>
            </>
          )}

          {/* Guest */}
          {!user && (
            <div className="pt-3 space-y-2">
              <Link
                to="/login"
                className="block px-4 py-2 text-indigo-600 text-center"
                onClick={() => setOpen(false)}
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block px-4 py-2 bg-indigo-600 text-white rounded-lg text-center"
                onClick={() => setOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
