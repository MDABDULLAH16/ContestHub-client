import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../components/Loader/Loader";
import { FaUsers, FaTrophy, FaUserCircle } from "react-icons/fa";

const ParticipantForThisContest = ({ id }) => {
  const axiosSecure = useAxiosSecure();

  const { data: participants = [], isLoading } = useQuery({
    queryKey: ["contest-participants", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contest-participants/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  return (
    <div className="w-full mt-12 bg-base-100 rounded-[2rem] border border-base-300 shadow-xl overflow-hidden transition-all duration-500">
      {/* --- Header Section --- */}
      <div className="bg-base-200/50 backdrop-blur-md px-8 py-8 border-b border-base-300 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-black text-base-content flex items-center gap-3 justify-center md:justify-start">
            <FaUsers className="text-indigo-500" />
            Arena Participants
          </h2>
          <p className="text-sm text-base-content/60 mt-1 font-medium">
            Meet the contenders fighting for the grand prize
          </p>
        </div>

        <div className="flex items-center gap-3 bg-base-100 px-6 py-3 rounded-2xl border border-base-300 shadow-inner">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
          <span className="font-black text-base-content tracking-tight">
            {participants.length} Joined
          </span>
        </div>
      </div>

      {/* --- Content Area --- */}
      {participants.length === 0 ? (
        <div className="p-24 text-center">
          <div className="text-7xl mb-6 grayscale opacity-50">🤝</div>
          <h3 className="text-2xl font-black text-base-content">
            The Arena is Empty
          </h3>
          <p className="text-base-content/50 mt-2 max-w-xs mx-auto">
            Be the pioneer! Join now and set the bar for others to follow.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            {/* Table Head */}
            <thead>
              <tr className="border-b border-base-300 text-base-content/40 text-xs uppercase tracking-[0.2em]">
                <th className="py-6 pl-10 font-black">Rank</th>
                <th className="py-6 font-black">Participant</th>
                <th className="py-6 font-black">Enlisted Date</th>
                <th className="py-6 text-right pr-10 font-black">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-base-300/50">
              {participants.map((p, index) => {
                const isWinner = p.gradingStatus === "winner";

                return (
                  <tr
                    key={p._id}
                    className={`group transition-all duration-300 hover:bg-indigo-500/5 ${
                      isWinner ? "bg-amber-500/5" : ""
                    }`}
                  >
                    {/* Rank */}
                    <td className="pl-10 py-6">
                      <span
                        className={`text-xl font-black ${
                          index === 0
                            ? "text-amber-500"
                            : "text-base-content/20"
                        }`}
                      >
                        {index + 1 < 10 ? `0${index + 1}` : index + 1}
                      </span>
                    </td>

                    {/* Participant Info */}
                    <td className="py-6">
                      <div className="flex items-center gap-4">
                        <div className="avatar">
                          <div className="w-14 h-14 rounded-2xl ring ring-base-300 ring-offset-base-100 ring-offset-2 transition-all group-hover:ring-indigo-500/50">
                            {p.userImage ? (
                              <img src={p.userImage} alt={p.userName} />
                            ) : (
                              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center text-xl font-bold h-full w-full">
                                {p.userName?.charAt(0)}
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="font-black text-base-content text-lg flex items-center gap-2">
                            {p.userName}
                            {isWinner && (
                              <span className="flex items-center gap-1 bg-amber-500 text-white text-[10px] px-2 py-0.5 rounded-lg shadow-lg shadow-amber-500/20">
                                <FaTrophy size={10} /> WINNER
                              </span>
                            )}
                          </div>
                          <div className="text-[10px] font-bold opacity-30 tracking-tighter uppercase">
                            UID: {p._id.slice(-8).toUpperCase()}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Join Date */}
                    <td className="py-6">
                      <span className="text-base-content/70 font-bold text-sm">
                        {new Date(p.paymentDate).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-6 text-right pr-10">
                      {isWinner ? (
                        <div className="badge badge-warning font-black py-4 px-6 rounded-xl shadow-lg shadow-amber-500/10">
                          Champion
                        </div>
                      ) : (
                        <div className="badge badge-ghost font-black py-4 px-6 rounded-xl opacity-60 group-hover:opacity-100 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                          Active
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ParticipantForThisContest;
