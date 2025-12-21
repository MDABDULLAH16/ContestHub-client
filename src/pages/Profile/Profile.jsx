import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import "aos/dist/aos.css";
import {
  FaUserEdit,
  FaMapMarkerAlt,
  FaEnvelope,
  FaIdBadge,
} from "react-icons/fa";
import { Phone, Award, ShieldCheck, UserCircle } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useAuth } from "../../hooks/useAuth";
import Loader from "../../components/Loader/Loader";
import AOS from "aos";
import { Link } from "react-router";

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
      <div className="min-h-screen flex items-center justify-center text-error font-bold">
        Error loading profile. Please refresh.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-12 px-6 transition-colors duration-500">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT COLUMN: User Identity Card */}
        <div className="lg:col-span-4 space-y-6" data-aos="fade-right">
          <div className="bg-base-100 rounded-[2.5rem] shadow-xl border border-base-300 overflow-hidden text-center p-8 relative">
            {/* Role Badge */}
            <div className="absolute top-6 right-6 bg-indigo-500/10 text-indigo-500 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-indigo-500/20">
              {user?.role}
            </div>

            {/* Profile Image */}
            <div className="relative inline-block mb-6 mt-4">
              <div className="w-36 h-36 rounded-3xl overflow-hidden ring-4 ring-indigo-500/30 shadow-2xl mx-auto">
                <img
                  src={
                    user?.photoURL || "https://i.ibb.co.com/B203KXC7/man2.png"
                  }
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-base-100"></div>
            </div>

            {/* User Name and ID */}
            <h2 className="text-3xl font-black text-base-content tracking-tight">
              {user?.name}
            </h2>
            <p className="text-base-content/40 text-xs flex items-center justify-center gap-1 uppercase font-black mb-8 mt-2">
              <FaIdBadge className="text-indigo-500" /> Hub ID: 2025-
              {user?._id?.slice(-4)}
            </p>

            {/* Integrated Balance Section */}
            <div className="bg-base-200/50 border border-base-300 rounded-3xl p-6 mb-8">
              <p className="text-base-content/40 text-[10px] font-black uppercase tracking-widest mb-2">
                Available Wallet
              </p>
              <div className="flex items-center justify-center gap-1">
                <span className="text-indigo-500 text-2xl font-black">$</span>
                <span className="text-4xl font-black text-base-content">
                  {user?.balance?.toLocaleString() || 0}
                </span>
              </div>
            </div>

            {/* Action Button */}
            <Link
              to="/settings"
              className="w-full bg-linear-to-br from-indigo-600 to-purple-600 hover:scale-[1.02] active:scale-95 text-white py-4 rounded-2xl font-black flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-500/20"
            >
              <FaUserEdit size={18} />
              Manage Account
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN: Bento Grid Content */}
        <div className="lg:col-span-8 space-y-6" data-aos="fade-left">
          {/* Bio Section */}
          <div className="bg-base-100 rounded-[2.5rem] p-8 md:p-10 shadow-xl border border-base-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <UserCircle size={120} />
            </div>
            <h3 className="text-xl font-black text-base-content mb-6 flex items-center gap-3">
              <span className="w-1.5 h-6 bg-indigo-500 rounded-full"></span>
              Professional Bio
            </h3>
            <p className="text-base-content/70 leading-relaxed italic text-lg font-medium relative z-10">
              "
              {user?.bio ||
                "No professional bio provided yet. Update your profile to tell the community about your expertise."}
              "
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Email Card */}
            <div className="bg-base-100 rounded-2xl p-6 shadow-xl border border-base-300 flex items-center gap-5 group hover:border-indigo-500/50 transition-all">
              <div className="p-4 bg-blue-500/10 text-blue-500 rounded-2xl group-hover:scale-110 transition-transform">
                <FaEnvelope size={24} />
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] font-black text-base-content/40 uppercase tracking-widest">
                  Email Address
                </p>
                <p className="text-base-content font-bold truncate">
                  {user?.email}
                </p>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-base-100 rounded-2xl p-6 shadow-xl border border-base-300 flex items-center gap-5 group hover:border-purple-500/50 transition-all">
              <div className="p-4 bg-purple-500/10 text-purple-500 rounded-2xl group-hover:scale-110 transition-transform">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-base-content/40 uppercase tracking-widest">
                  Contact Number
                </p>
                <p className="text-base-content font-bold">
                  {user?.phone || "Not Linked"}
                </p>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-base-100 rounded-2xl p-6 shadow-xl border border-base-300 md:col-span-2 flex items-center gap-5 group hover:border-indigo-500/50 transition-all">
              <div className="p-4 bg-orange-500/10 text-orange-500 rounded-2xl group-hover:scale-110 transition-transform">
                <FaMapMarkerAlt size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-base-content/40 uppercase tracking-widest">
                  Primary Location
                </p>
                <p className="text-base-content font-bold">
                  {user?.address || "Remote / Global"}
                </p>
              </div>
            </div>
          </div>

          {/* Role Status Card */}
          <div className="bg-slate-900 dark:bg-slate-950 rounded-[2.5rem] p-8 md:p-10 text-white relative overflow-hidden border border-white/5">
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <ShieldCheck className="text-indigo-400" />
                  <h4 className="text-2xl font-black tracking-tight">
                    {user?.role === "admin"
                      ? "Systems Administrator"
                      : user?.role === "creator"
                      ? "Verified Creator"
                      : "Elite Participant"}
                  </h4>
                </div>
                <p className="text-slate-400 font-medium max-w-md">
                  {user?.role === "admin"
                    ? "Complete infrastructure access enabled. You have authority over users and contests."
                    : user?.role === "creator"
                    ? "Creation suite unlocked. You can now host global contests and manage prize pools."
                    : "Your journey has started. Participate in contests to earn rewards and climb the leaderboard."}
                </p>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="px-8 py-3 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="font-black uppercase tracking-tighter text-sm">
                    Active Account
                  </span>
                </div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                  Identity Verified
                </div>
              </div>
            </div>

            {/* Background Aesthetic GFX */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-600/20 rounded-full blur-[80px]"></div>
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-600/20 rounded-full blur-[80px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
