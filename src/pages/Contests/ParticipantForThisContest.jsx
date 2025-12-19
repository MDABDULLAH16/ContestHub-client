import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../components/Loader/Loader";

const ParticipantForThisContest = ({ id }) => {
  const axiosSecure = useAxiosSecure();

  const { data: participants = [], isLoading } = useQuery({
    queryKey: ["contest-participants", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contest-participants/${id}`);
      return res.data;
    },
  });
console.log(participants);

  if (isLoading) return <Loader />;

  return (
    <div className="w-full mt-12 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header Section */}
      <div className="bg-gray-50/50 px-8 py-6 border-b border-gray-100 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Contest Participants
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            People currently competing in this challenge
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="font-bold text-gray-700">
            {participants.length} Joined
          </span>
        </div>
      </div>

      {participants.length === 0 ? (
        <div className="p-20 text-center">
          <div className="text-5xl mb-4">🤝</div>
          <h3 className="text-xl font-semibold text-gray-800">
            No participants yet
          </h3>
          <p className="text-gray-500 mt-2">
            Be the first one to join this contest and claim the prize!
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border-collapse">
            <thead>
              <tr className="text-gray-400 text-sm uppercase tracking-wider">
                <th className="bg-transparent py-6 pl-8">Rank</th>
                <th className="bg-transparent py-6">Participant</th>
                <th className="bg-transparent py-6">Join Date</th>
                <th className="bg-transparent py-6 text-right pr-8">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {participants.map((p, index) => (
                <tr
                  key={p._id}
                  className={`hover:bg-gray-50/80 transition-colors ${
                    p.gradingStatus === "winner" ? "bg-yellow-50/30" : ""
                  }`}
                >
                  {/* Rank Column */}
                  <td className="pl-8 py-5">
                    <span className="text-lg font-medium text-gray-400">
                      #{index + 1}
                    </span>
                  </td>

                  {/* User Column */}
                  <td className="py-5">
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="w-12 h-12 rounded-xl ring-1 ring-gray-200">
                          {p.userImage ? (
                            <img src={p.userImage} alt={p.userName} />
                          ) : (
                            <div className="bg-linear-to-br from-primary to-blue-600 text-white flex items-center justify-center text-lg font-bold h-full w-full">
                              {p.userName?.charAt(0)}
                            </div>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="font-bold text-gray-800 text-base flex items-center gap-2">
                          {p.userName}
                          {p.gradingStatus === "winner" && (
                            <span className="badge badge-warning badge-sm gap-1 py-3 font-bold">
                              🏆 WINNER
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-400">
                          Participant ID: {p._id.slice(-6).toUpperCase()}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Join Date Column */}
                  <td className="py-5">
                    <span className="text-gray-600 font-medium">
                      {new Date(p.paymentDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </td>

                  {/* Status Column */}
                  <td className="py-5 text-right pr-8">
                    {p.gradingStatus === "winner" ? (
                      <span className="text-yellow-600 font-bold text-sm">
                        Winner Declared
                      </span>
                    ) : (
                      <span className="text-blue-500 font-medium text-sm bg-blue-50 px-3 py-1 rounded-full">
                        Active Competitor
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ParticipantForThisContest;
