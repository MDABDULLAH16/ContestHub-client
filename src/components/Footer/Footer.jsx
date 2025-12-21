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
  ArrowRight,
} from "lucide-react";

import trophyLogo from "/trophy.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 pt-20 pb-10 border-t border-white/5 relative overflow-hidden">
      {/* Subtle background glow effect */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16 relative z-10">
        {/* 1. Brand & Description */}
        <div className="space-y-8">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center relative  group-hover:scale-105 transition-transform duration-300">
              <img
                src={trophyLogo}
                className="absolute w-8 h-8 "
                alt="logo shadow"
              />
            </div>
            <span className="text-2xl font-black   tracking-tighter text-white  ">
              <span className="text-2xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                ContestHub
              </span>
            </span>
          </Link>

          <p className="text-sm leading-relaxed opacity-70 font-medium">
            Empowering the next generation of digital champions. Compete in
            world-class challenges, showcase your expertise, and unlock
            extraordinary opportunities.
          </p>

          <div className="flex gap-3">
            {[Facebook, Twitter, Instagram, Github].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="p-2.5 bg-slate-900 border border-white/5 rounded-xl hover:border-indigo-500/50 hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-lg"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* 2. Platform Links */}
        <div>
          <h4 className="text-white font-black mb-8 uppercase text-[10px] tracking-[0.3em] opacity-50">
            Navigation
          </h4>
          <ul className="space-y-4">
            {[
              { label: "Browse Contests", path: "/contests" },
              { label: "Leaderboard", path: "/leaderboard" },
              {
                label: "Create Account",
                path: "/register",
                highlight: true,
              },
              { label: "why ContestHub", path: "/why-contestHub" },
            ].map((link) => (
              <li key={link.label}>
                <Link
                  to={link.path}
                  className={`text-sm font-bold flex items-center group transition-colors ${
                    link.highlight
                      ? "text-indigo-400 hover:text-indigo-300"
                      : "hover:text-white"
                  }`}
                >
                  <ArrowRight
                    size={12}
                    className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all"
                  />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 3. Support & Legal */}
        <div>
          <h4 className="text-white font-black mb-8 uppercase text-[10px] tracking-[0.3em] opacity-50">
            Resources
          </h4>
          <ul className="space-y-4 text-sm font-bold">
            {[
              "Help Center",
              "Contest Rules",
              "Privacy Policy",
              "Terms of Service",
            ].map((item) => (
              <li key={item}>
                <Link
                  to="#"
                  className="hover:text-white transition-colors block"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* 4. Contact Info */}
        <div>
          <h4 className="text-white font-black mb-8 uppercase text-[10px] tracking-[0.3em] opacity-50">
            Get In Touch
          </h4>
          <ul className="space-y-6 text-sm font-medium">
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center shrink-0 text-indigo-500">
                <MapPin size={18} />
              </div>
              <span className="opacity-80 pt-1">
                123 Challenge Ave, <br />
                Innovation City, IC 54321
              </span>
            </li>
            <li className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center shrink-0 text-indigo-500">
                <Phone size={18} />
              </div>
              <span className="opacity-80">+1 (555) 000-CONT</span>
            </li>
            <li className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center shrink-0 text-indigo-500">
                <Mail size={18} />
              </div>
              <span className="opacity-80">support@contesthub.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-[10px] font-bold uppercase tracking-widest opacity-40">
          © {currentYear} <span className="text-indigo-500">ContestHub</span> //
          ENGINEERED FOR CHAMPIONS
        </div>

        <div className="flex gap-8">
          <button className="text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">
            English (US)
          </button>
          <button className="text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">
            USD ($)
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
