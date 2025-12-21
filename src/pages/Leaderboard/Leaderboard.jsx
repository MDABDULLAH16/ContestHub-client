import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaCrown, FaMedal, FaTrophy } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader/Loader";

const Leaderboard = () => {
  const axiosSecure = useAxiosSecure();
  const { data: leadersData = [], isLoading } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const res = await axiosSecure.get("/leaderboard");
      return res.data;
    },
  });

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  if (isLoading) return <Loader />;

  const topThree = leadersData?.slice(0, 3);
  const theRest = leadersData?.slice(3);

  return (
    <div className="bg-base-200 py-12 px-4 transition-colors duration-500 min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* --- Header --- */}
        <div className="text-center mb-16" data-aos="fade-down">
          <h1 className="text-5xl md:text-6xl font-black text-base-content mb-4 tracking-tight">
            Champions of{" "}
            <span className="bg-linear-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              ContestHub
            </span>
          </h1>
          <p className="text-base-content/60 text-lg font-medium">
            Recognizing the elite performers and master competitors
          </p>
        </div>

        {/* --- Podium Section --- */}
        <div className="flex flex-col md:flex-row items-end justify-center gap-6 mb-16 px-4">
          {/* 2nd Place (Silver) */}
          {topThree[1] && (
            <div
              className="flex flex-col items-center order-2 md:order-1 w-full md:w-auto"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="relative">
                <img
                  src={topThree[1].userImage}
                  alt=""
                  className="w-24 h-24 rounded-full border-4 border-slate-300 shadow-[0_0_20px_rgba(148,163,184,0.3)] mb-4 object-cover"
                />
                <div className="absolute -bottom-2 -right-2 bg-slate-400 text-white p-2 rounded-full border-2 border-base-100">
                  <FaMedal size={14} />
                </div>
              </div>
              <div className="bg-base-100 p-6 rounded-t-2xl shadow-xl w-full md:w-44 text-center border-t-4 border-slate-300 dark:bg-slate-800/50 backdrop-blur-md">
                <h3 className="font-black text-base-content truncate">
                  {topThree[1].userName}
                </h3>
                <p className="text-indigo-500 font-black text-xl mt-1">
                  {topThree[1].winnerCount}{" "}
                  <span className="text-[10px] uppercase opacity-50">Wins</span>
                </p>
              </div>
            </div>
          )}

          {/* 1st Place (Gold) */}
          {topThree[0] && (
            <div
              className="flex flex-col items-center order-1 md:order-2 w-full md:w-auto"
              data-aos="fade-up"
            >
              <FaCrown className="text-amber-400 text-5xl mb-3 animate-bounce drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
              <div className="relative">
                <img
                  src={topThree[0].userImage}
                  alt={topThree[0].userName}
                  className="w-32 h-32 rounded-full border-4 border-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.4)] mb-4 object-cover"
                />
              </div>
              <div className="bg-base-100 p-10 rounded-t-[2.5rem] shadow-2xl w-full md:w-56 text-center border-t-4 border-amber-400 dark:bg-slate-800 backdrop-blur-lg">
                <h3 className="font-black text-2xl text-base-content leading-tight">
                  {topThree[0].userName}
                </h3>
                <p className="bg-linear-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent font-black text-4xl my-2">
                  {topThree[0].winnerCount}
                </p>
                <span className="text-[10px] uppercase font-black tracking-[0.2em] text-base-content/40">
                  Ultimate Champion
                </span>
              </div>
            </div>
          )}

          {/* 3rd Place (Bronze) */}
          {topThree[2] && (
            <div
              className="flex flex-col items-center order-3 w-full md:w-auto"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="relative">
                <img
                  src={topThree[2].userImage}
                  alt=""
                  className="w-24 h-24 rounded-full border-4 border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.3)] mb-4 object-cover"
                />
                <div className="absolute -bottom-2 -right-2 bg-orange-600 text-white p-2 rounded-full border-2 border-base-100">
                  <FaTrophy size={14} />
                </div>
              </div>
              <div className="bg-base-100 p-6 rounded-t-2xl shadow-xl w-full md:w-44 text-center border-t-4 border-orange-500 dark:bg-slate-800/50 backdrop-blur-md">
                <h3 className="font-black text-base-content truncate">
                  {topThree[2].userName}
                </h3>
                <p className="text-indigo-500 font-black text-xl mt-1">
                  {topThree[2].winnerCount}{" "}
                  <span className="text-[10px] uppercase opacity-50">Wins</span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* --- Rankings Table (4-10) --- */}
        <div
          className="bg-base-100 rounded-[2.5rem] shadow-2xl overflow-hidden border border-base-300 transition-all duration-500"
          data-aos="fade-up"
        >
          <table className="w-full text-left">
            <thead className="bg-linear-to-r from-indigo-600 to-purple-700 text-white">
              <tr className="text-[10px] uppercase tracking-[0.2em] font-black">
                <th className="px-8 py-6">Rank</th>
                <th className="px-8 py-6">Elite Competitor</th>
                <th className="px-8 py-6 text-center">Total Victories</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-300">
              {theRest.map((user, index) => (
                <tr
                  key={index}
                  className="hover:bg-indigo-500/5 transition-all duration-300 group"
                >
                  <td className="px-8 py-6 font-black text-base-content/20 text-xl group-hover:text-indigo-500 transition-colors">
                    #{index + 4}
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="w-12 h-12 rounded-2xl ring ring-base-300 ring-offset-base-100 ring-offset-2">
                          <img src={user.userImage} alt="" />
                        </div>
                      </div>
                      <span className="font-black text-base-content text-lg">
                        {user.userName}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className="bg-indigo-500/10 text-indigo-500 py-2 px-5 rounded-xl font-black border border-indigo-500/20 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                      {user.winnerCount}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {theRest.length === 0 && (
            <div className="py-20 text-center opacity-30 font-bold uppercase tracking-widest">
              More champions needed
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
