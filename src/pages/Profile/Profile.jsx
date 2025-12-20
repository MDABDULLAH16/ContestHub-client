import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import "aos/dist/aos.css";
import {
  FaUserEdit,
  FaWallet,
  FaBriefcase,
  FaMapMarkerAlt,
  FaEnvelope,
  FaIdBadge,
} from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useAuth } from "../../hooks/useAuth";
import Loader from "../../components/Loader/Loader";
import AOS from "aos";
import { Link } from "react-router";
import { Phone } from "lucide-react";

const Profile = () => {
  const axiosSecure = useAxiosSecure();
  const { user: authUser } = useAuth();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const {
    data: user = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users", authUser?.email],
    enabled: !!authUser?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${authUser?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-bold">
        Error loading profile. Please refresh.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: User Identity Card */}
        <div className="lg:col-span-4 space-y-6" data-aos="fade-right">
          <div className="bg-white rounded-4xl shadow-sm border border-slate-200 overflow-hidden text-center p-8 relative">
            {/* Role Badge */}
            <div className="absolute top-4 right-4 bg-indigo-50 text-indigo-600 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-indigo-100">
              {user?.role}
            </div>

            {/* Profile Image with Status Indicator */}
            <div className="relative inline-block mb-6">
              <div className="w-32 h-32 rounded-3xl overflow-hidden ring-4 ring-indigo-500 shadow-xl mx-auto">
                <img
                  src={
                    user?.photoURL || "https://i.ibb.co.com/B203KXC7/man2.png"
                  }
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white"></div>
            </div>

            {/* User Name and ID */}
            <h2 className="text-2xl font-black text-slate-800">{user?.name}</h2>
            <p className="text-slate-400 text-sm flex items-center justify-center gap-1 uppercase font-semibold mb-6">
              <FaIdBadge className="text-indigo-400" /> Contest Hub ID: 2025-
              {user?._id?.slice(-4)}
            </p>

            {/* Integrated Balance Section */}
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-5 mb-8">
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">
                Available Balance
              </p>
              <div className="flex items-center justify-center gap-2">
                <span className="text-indigo-600 text-xl font-bold">$</span>
                <span className="text-3xl font-black text-slate-800">
                  {user?.balance?.toLocaleString() || 0}
                </span>
              </div>
            </div>

            {/* Action Button */}
            <Link
              to="/settings"
              className="w-full bg-linear-to-br from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all group shadow-lg shadow-indigo-100"
            >
              <FaUserEdit className="group-hover:rotate-12 transition-transform" />
              Manage Account
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN: Content Bento Grid */}
        <div className="lg:col-span-8 space-y-6" data-aos="fade-left">
          {/* Bio Section */}
          <div className="bg-white rounded-4xl p-8 shadow-sm border border-slate-200">
            <h3 className="text-xl font-black text-slate-800 mb-4 flex items-center gap-2">
              <span className="w-2 h-8 bg-indigo-600 rounded-full"></span>
              Professional Bio
            </h3>
            <p className="text-slate-600 leading-relaxed italic">
              "
              {user?.bio ||
                "No bio available. Please update your profile to add a brief description about yourself."}
              "
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-4xl p-6 shadow-sm border border-slate-200 flex items-start gap-4 hover:border-indigo-300 transition-colors">
              <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl text-xl">
                <FaEnvelope />
                <Phone />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">
                  Registered Email
                </p>
                <p className="text-slate-700 font-semibold break-all">
                  {user?.email}
                </p>
                <p className="text-xs font-bold text-slate-400 uppercase">
                  Mobile Number
                </p>
                <p className="text-slate-700 font-semibold break-all">
                  {user?.phone || "Not Provided"}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-4xl p-6 shadow-sm border border-slate-200 flex items-start gap-4 hover:border-indigo-300 transition-colors">
              <div className="p-4 bg-orange-50 text-orange-600 rounded-2xl text-xl">
                <FaMapMarkerAlt />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">
                  Primary Location
                </p>
                <p className="text-slate-700 font-semibold">
                  {user?.address || "Global Citizen"}
                </p>
              </div>
            </div>
          </div>

          {/* Role Status Information */}
          <div className="bg-slate-900 rounded-4xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h4 className="text-xl font-bold">
                  Account Level:{" "}
                  <span className="text-indigo-400 capitalize">
                    {user?.role === "admin"
                      ? "Administrator"
                      : user?.role === "creator"
                      ? "Creator"
                      : "Participant"}
                  </span>
                </h4>
                <p className="text-slate-400 text-sm">
                  {user?.role === "admin"
                    ? "You have full access to manage the platform."
                    : user?.role === "creator"
                    ? "You can create and manage your contests."
                    : "You can participate in contests and track your entries."}
                </p>
              </div>
              <div className="px-6 py-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/20">
                Status: <span className="text-green-400 font-bold">Active</span>
              </div>
            </div>
            {/* Decorative Background Circles */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-600 rounded-full blur-3xl"></div>
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-600 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
