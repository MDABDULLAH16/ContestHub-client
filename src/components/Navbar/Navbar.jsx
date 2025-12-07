import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Contests", href: "/contests" },
    { name: "Pricing", href: "/pricing" },
    { name: "About", href: "/about" },
  ];

  return (
    <nav className="w-full  bg-white shadow-md strick top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <div className="text-2xl font-bold text-indigo-600">
          ContestHub
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="text-gray-700 hover:text-indigo-600 font-medium transition"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Login Button */}
        <div className="hidden md:block">
          <Link
            to="/login"
            className="px-5 py-2 bg-primary text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {open && (
        <div className="md:hidden bg-white shadow-inner">
          <ul className="flex flex-col px-4 pt-2 pb-4 space-y-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="block text-gray-700 text-lg font-medium hover:text-indigo-600"
                >
                  {link.name}
                </a>
              </li>
            ))}
            <a
              href="/login"
              className="px-5 py-2 bg-indigo-600 text-white rounded-lg w-max"
            >
              Login
            </a>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
