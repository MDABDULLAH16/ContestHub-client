import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaCrown, FaMedal, FaTrophy } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const Leaderboard = () => { 
    const axiosSecure = useAxiosSecure();
    const { data: leadersData=[] } = useQuery({
        queryKey: ["leaderboard"],
        queryFn: async () => {
            const res = await axiosSecure.get("/leaderboard");
            return res.data;
        }
    })
console.log(leadersData);

  useEffect(() => {
    AOS.init({ duration: 1000 });
    // Fetching your new API
    // fetch("https://your-api-url.com/leaderboard")
    //   .then((res) => res.json())
    //   .then((data) => setLeaders(data));
  }, []);

  const topThree = leadersData?.slice(0, 3);
  const theRest = leadersData?.slice(3);

  return (
    <div className=" bg-gray-50 py-6 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6" data-aos="fade-down">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Champions of <span className="bg-linear-to-br from-indigo-500 to-purple-500 bg-clip-text text-transparent">ContestHub</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Recognizing the elite performers of ContestHub
          </p>
        </div>

        {/* Podium Section (Top 3) */}
        <div className="flex flex-col md:flex-row items-end justify-center gap-6 mb-6">
          {/* 2nd Place */}
          {topThree[1] && (
            <div
              className="flex flex-col items-center order-2 md:order-1"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <img
                src={topThree[1].userImage}
                alt=""
                className="w-20 h-20 rounded-full border-4 border-gray-300 shadow-xl mb-2"
              />
              <div className="bg-white p-6 rounded-t-xl shadow-lg w-40 text-center border-t-4 border-gray-300">
                <FaMedal className="text-gray-400 text-2xl mx-auto mb-2" />
                <h3 className="font-bold truncate">{topThree[1].userName}</h3>
                <p className="text-indigo-600 font-bold">
                  {topThree[1].winnerCount} Wins
                </p>
              </div>
            </div>
          )}

          {/* 1st Place */}
          {topThree[0] && (
            <div
              className="flex flex-col items-center order-1 md:order-2"
              data-aos="fade-up"
            >
              <FaCrown className="text-yellow-400 text-4xl mb-2 animate-bounce" />
              <img
                src={topThree[0].userImage}
                alt=""
                className="w-28 h-28 rounded-full border-4 border-yellow-400 shadow-2xl mb-2"
              />
              <div className="bg-white p-8 rounded-t-xl shadow-2xl w-48 text-center border-t-4 border-yellow-400">
                <h3 className="font-bold text-xl">
                  {topThree[0].userName}
                </h3>
                <p className="text-indigo-600 font-extrabold text-2xl">
                  {topThree[0].winnerCount}
                </p>
                <span className="text-xs uppercase tracking-widest text-gray-600">
                  Total Wins
                </span>
              </div>
            </div>
          )}

          {/* 3rd Place */}
          {topThree[2] && (
            <div
              className="flex flex-col items-center order-3"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <img
                src={topThree[2].userImage}
                alt=""
                className="w-20 h-20 rounded-full border-4 border-orange-400 shadow-xl mb-2"
              />
              <div className="bg-white p-6 rounded-t-xl shadow-lg w-40 text-center border-t-4 border-orange-400">
                <FaTrophy className="text-orange-400 text-2xl mx-auto mb-2" />
                <h3 className="font-bold truncate">{topThree[2].userName}</h3>
                <p className="text-indigo-600 font-bold">
                  {topThree[2].winnerCount} Wins
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Table for Rank 4-10 */}
        <div
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          data-aos="fade-up"
        >
          <table className="w-full text-left">
            <thead className="bg-indigo-600 text-white">
              <tr>
                <th className="px-6 py-4">Rank</th>
                <th className="px-6 py-4">Participant</th>
                <th className="px-6 py-4 text-center">Victories</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {theRest.map((user, index) => (
                <tr
                  key={index}
                  className="hover:bg-indigo-50 transition-colors"
                >
                  <td className="px-6 py-4 font-bold text-gray-500">
                    #{index + 4}
                  </td>
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      src={user.userImage}
                      className="w-10 h-10 rounded-full"
                      alt=""
                    />
                    <span className="font-semibold text-gray-700">
                      {user.userName}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-indigo-100 text-indigo-700 py-1 px-3 rounded-full font-bold">
                      {user.winnerCount}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
