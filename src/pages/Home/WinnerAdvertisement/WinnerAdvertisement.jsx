import React from "react";
import { FaTrophy, FaGift, FaUsers } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/Loader/Loader";
import { Link } from "react-router";


const WinnerSection = () => {
    const axiosSecure = useAxiosSecure();
    
    const { data: winners = [], isLoading } = useQuery({
        queryKey: ["winners"],
        queryFn: async () => {
            const res = await axiosSecure.get(`/winner?gradingStatus=Winner`);
            return res.data;
        },
    });
 
    
    if (isLoading) {
        return <Loader></Loader>;
    }
  
  return (
    <section className="py-20 my-12 bg-linear-to-br from-indigo-900 via-purple-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Side: Text & Stats */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 mb-6">
              <FaTrophy className="text-yellow-400" />
              <span className="text-sm font-semibold tracking-wider uppercase">
                Hall of Fame
              </span>
            </div>

            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Your Talent, <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-orange-500">
                Highly Rewarded.
              </span>
            </h2>

            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Join thousands of creators who have turned their skills into real
              cash. Compete in contests, showcase your work, and take the prize
              home.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="text-3xl font-bold text-yellow-400 mb-1">
                  $50k+
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">
                  Paid Out
                </div>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="text-3xl font-bold text-green-400 mb-1">
                  200+
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">
                  Winners
                </div>
              </div>
              <div className="col-span-2 md:col-span-1 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-sm">
                <div className="text-3xl font-bold text-blue-400 mb-1">
                  10k+
                </div>
                <div className="text-xs text-gray-400 uppercase tracking-wider">
                  Participants
                </div>
              </div>
            </div>

            <Link to={`/contests`} className="btn w-fit  text-white btn-lg rounded-full px-8 shadow- bg-linear-to-br from-indigo-400 to-purple-500  border-none   font-bold hover:scale-105 transition-transform">
              Join the Next Contest
            </Link>
          </div>

          {/* Right Side: Winner Cards (Floating Effect) */}
          <div className="lg:w-1/2 w-full">
            <div className="relative">
              {/* Card Stack Visual */}
              <div className="grid gap-5">
                {winners.map((winner, idx) => (
                  <div
                    key={winner._id}
                    className={`flex items-center gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 shadow-xl transform transition-all hover:-translate-y-1 hover:bg-white/20
                    ${idx === 1 ? "lg:translate-x-6" : ""}`}
                  >
                    <div className="avatar">
                      <div className="w-16 h-16 rounded-full ring-2 ring-yellow-400 ring-offset-2 ring-offset-purple-900">
                        <img src={winner.userImage} alt={winner.userName} referrerPolicy="no-referrer" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white">
                        {winner.userName}
                      </h3>
                      <p className="text-sm text-gray-300">
                        Won{" "}
                        <span className="text-yellow-400 font-bold">
                          {winner?.contestName}
                        </span>
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="flex flex-col items-center bg-yellow-400 text-indigo-900 px-3 py-1 rounded-lg font-bold shadow-lg">
                        <FaGift />
                        <span>{winner?.prizeMoney}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WinnerSection;
