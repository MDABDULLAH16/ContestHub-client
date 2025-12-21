import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loader from "./../../../../components/Loader/Loader";
import useAxiosSecure from "./../../../../hooks/useAxiosSecure";
import AppliedContestModal from "./AppliedContestModal";
import { ClipboardList, Calendar, DollarSign, Eye, Search } from "lucide-react";

const AppliedContests = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedContest, setSelectedContest] = useState(null);

  const {
    data: contests = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["appliedContests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applied-contest");
      return res.data;
    },
  });

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-rose-500">
        <div className="bg-rose-500/10 p-4 rounded-full mb-4">
          <XCircle size={48} />
        </div>
        <h2 className="text-xl font-black uppercase tracking-widest">
          Data Error
        </h2>
        <p className="opacity-70 text-sm">{error.message}</p>
      </div>
    );

  const pendingCount = contests.filter((c) => c.status === "pending").length;

  return (
    <div className="space-y-8 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-base-content uppercase italic">
            Contest <span className="text-indigo-500">Review Queue</span>
          </h1>
          <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.3em] mt-1">
            Moderation & Approval Interface
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="badge border-amber-500/30 bg-amber-500/10 text-amber-500 p-4 gap-2 font-black text-[10px] uppercase tracking-widest">
            <ClipboardList size={14} /> {pendingCount} Pending Review
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-base-100 rounded-2xl border border-base-300 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            {/* Table Head */}
            <thead className="bg-base-200/50">
              <tr className="border-b border-base-300 text-base-content/40 uppercase text-[10px] font-black tracking-[0.2em]">
                <th className="py-6 px-8 text-indigo-500">#</th>
                <th>Contest Identity</th>
                <th>Timeline</th>
                <th>Financials</th>
                <th>Status</th>
                <th className="text-center">Review</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {contests.map((contest, index) => (
                <tr
                  key={contest._id || index}
                  className="border-b border-base-300/50 hover:bg-indigo-600/5 transition-colors group"
                >
                  <td className="px-8 opacity-30 font-black text-xs">
                    {index + 1}
                  </td>

                  {/* Identity */}
                  <td>
                    <div className="flex items-center gap-4">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12 border border-base-300 bg-base-200 group-hover:scale-105 transition-transform">
                          <img src={contest.image} alt={contest.name} />
                        </div>
                      </div>
                      <div>
                        <div className="font-black text-sm uppercase text-base-content tracking-tight">
                          {contest.name}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[9px] font-black uppercase px-2 py-0.5 bg-indigo-500/10 text-indigo-500 rounded">
                            {contest.contestType}
                          </span>
                          <span className="text-[9px] font-bold opacity-30 lowercase italic">
                            {contest.creator}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Timeline */}
                  <td>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-[10px] font-bold text-emerald-500">
                        <Calendar size={10} />
                        <span className="uppercase tracking-tighter">
                          Start:
                        </span>
                        <span>
                          {new Date(contest.startDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-bold text-rose-500">
                        <Calendar size={10} />
                        <span className="uppercase tracking-tighter">End:</span>
                        <span>
                          {new Date(contest.endDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Financials */}
                  <td>
                    <div className="flex flex-col gap-0.5">
                      <div className="text-[11px] font-black text-base-content uppercase flex items-center gap-1">
                        <DollarSign size={10} className="opacity-30" />
                        <span className="opacity-40">Fee:</span> $
                        {contest.entryPrice}
                      </div>
                      <div className="text-[11px] font-black text-amber-500 uppercase flex items-center gap-1">
                        <DollarSign size={10} />
                        <span className="opacity-40">Prize:</span> $
                        {contest.prizeMoney}
                      </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td>
                    <span
                      className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center w-fit gap-2 border ${
                        contest.status === "pending"
                          ? "bg-amber-500/10 text-amber-500 border-amber-500/20"
                          : contest.status === "accepted"
                          ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                          : "bg-rose-500/10 text-rose-500 border-rose-500/20"
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          contest.status === "accepted"
                            ? "bg-emerald-500"
                            : contest.status === "pending"
                            ? "bg-amber-500 animate-pulse"
                            : "bg-rose-500"
                        }`}
                      ></div>
                      {contest.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="text-center">
                    <button
                      onClick={() => setSelectedContest(contest)}
                      className="btn btn-sm bg-base-200 hover:bg-indigo-600 border-base-300 hover:border-indigo-600 text-base-content hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                    >
                      <Eye size={14} className="mr-1" /> Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Overlay */}
      {selectedContest && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-base-300/60 backdrop-blur-md p-4 transition-all">
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto scrollbar-hide">
            <AppliedContestModal
              refetch={refetch}
              setSelectedContest={setSelectedContest}
              selectedContest={selectedContest}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AppliedContests;
