import React from "react";
import { Link } from "react-router";
import {
  Trophy,
  Facebook,
  Twitter,
  Instagram,
  Github,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import trophyLogo from "/trophy.png";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-gray-300 pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* 1. Brand & Description */}
        <div className="space-y-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-linear-to-br from-indigo-600 to-purple-600 flex items-center justify-center relative">
              <Trophy className="text-white" />
              <img src={trophyLogo} className="absolute w-6 h-6" />
            </div>
            <span className="text-2xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              ContestHub
            </span>
          </Link>
          <p className="text-sm leading-relaxed text-gray-400">
            The world's leading platform for creators, developers, and designers
            to showcase their skills, compete in global challenges, and win
            extraordinary prizes.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="p-2 bg-white/5 rounded-full hover:bg-indigo-600 hover:text-white transition-all"
            >
              <Facebook size={18} />
            </a>
            <a
              href="#"
              className="p-2 bg-white/5 rounded-full hover:bg-indigo-600 hover:text-white transition-all"
            >
              <Twitter size={18} />
            </a>
            <a
              href="#"
              className="p-2 bg-white/5 rounded-full hover:bg-indigo-600 hover:text-white transition-all"
            >
              <Instagram size={18} />
            </a>
            <a
              href="#"
              className="p-2 bg-white/5 rounded-full hover:bg-indigo-600 hover:text-white transition-all"
            >
              <Github size={18} />
            </a>
          </div>
        </div>

        {/* 2. Platform Links (Roles) */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">
            Platform
          </h4>
          <ul className="space-y-4 text-sm">
            <li>
              <Link
                to="/all-contests"
                className="hover:text-indigo-400 transition-colors"
              >
                Browse Contests
              </Link>
            </li>
            <li>
              <Link
                to="/leaderboard"
                className="hover:text-indigo-400 transition-colors"
              >
                Leaderboard
              </Link>
            </li>
            <li>
              <Link
                to="/creator-portal"
                className="hover:text-indigo-400 transition-colors italic text-indigo-300"
              >
                Become a Creator
              </Link>
            </li>
            <li>
              <Link
                to="/admin-panel"
                className="hover:text-indigo-400 transition-colors"
              >
                Admin Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* 3. Resources */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">
            Support
          </h4>
          <ul className="space-y-4 text-sm">
            <li>
              <Link
                to="/help"
                className="hover:text-indigo-400 transition-colors"
              >
                Help Center
              </Link>
            </li>
            <li>
              <Link
                to="/guidelines"
                className="hover:text-indigo-400 transition-colors"
              >
                Contest Rules
              </Link>
            </li>
            <li>
              <Link
                to="/privacy"
                className="hover:text-indigo-400 transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/terms"
                className="hover:text-indigo-400 transition-colors"
              >
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* 4. Contact Info */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">
            Contact Us
          </h4>
          <ul className="space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="text-indigo-500 shrink-0" size={18} />
              <span>
                123 Challenge Ave, <br />
                Innovation City, IC 54321
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="text-indigo-500 shrink-0" size={18} />
              <span>+1 (555) 000-CONT</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-indigo-500 shrink-0" size={18} />
              <span>support@contesthub.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-gray-500">
          © {currentYear}{" "}
          <span className=" font-medium bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            ContestHub
          </span>
          . All rights reserved. Built for the next generation of champions.
        </p>
        <div className="flex gap-6 text-xs text-gray-500">
          <button className="hover:text-white transition-colors">
            English (US)
          </button>
          <button className="hover:text-white transition-colors">
            USD ($)
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
