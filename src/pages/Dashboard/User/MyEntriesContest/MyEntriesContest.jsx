import React, { useState } from "react";
import { useAuth } from "../../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import {
  Search,
  Trophy,
  Calendar,
  ExternalLink,
  CreditCard,
  CheckCircle2,
  Clock,
  AlertCircle,
} from "lucide-react";
import Loader from "../../../../components/Loader/Loader";
import { Link } from "react-router";

const MyEntriesContest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterWinner, setFilterWinner] = useState(false);

  const { data: myEntriesContests = [], isLoading } = useQuery({
    queryKey: ["my-entries-contests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-entries-contests?email=${user?.email}`
      );
      return res.data;
    },
  });

  // Helper: Calculate Days Remaining
  const getDaysRemaining = (endDate) => {
    const diff = new Date(endDate) - new Date();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? `${days} days left` : "Ended";
  };

  // Filter & Sort Logic
  const filteredData = myEntriesContests
    .filter((item) => {
      const name = item?.contestName || "";
      const matchesSearch = name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesWinner = filterWinner
        ? item?.gradingStatus === "Winner"
        : true;
      return matchesSearch && matchesWinner;
    })
    .sort((a, b) => new Date(a.endDate) - new Date(b.endDate)); // Sort by upcoming deadline

  if (isLoading) return <Loader />;

  return (
    <div className="p-6 bg-base-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight">
              Participated <span className="text-primary">Contests</span>
            </h1>
            <p className="text-sm opacity-50 font-bold uppercase tracking-wider">
              Total Entries: {filteredData.length}
            </p>
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30"
                size={18}
              />
              <input
                type="text"
                placeholder="Search contest..."
                className="input input-bordered w-full pl-10 bg-base-200 border-none rounded-xl font-bold"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setFilterWinner(!filterWinner)}
              className={`btn rounded-xl border-none font-bold ${
                filterWinner
                  ? "bg-yellow-500 text-black hover:bg-yellow-600"
                  : "bg-base-200"
              }`}
            >
              <Trophy size={18} />
            </button>
          </div>
        </div>

        {/* Modern Table Layout */}
        <div className="overflow-x-auto rounded-2xl border border-base-300 bg-base-200/20 shadow-sm">
          <table className="table w-full">
            <thead>
              <tr className="bg-base-200/50 text-base-content/40 uppercase text-[11px] font-black tracking-widest border-none">
                <th className="py-5">Contest & ID</th>
                <th>Timeline</th>
                <th>Payment</th>
                <th>Submission</th>
                <th>Result</th>
                <th className="text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-300">
              {filteredData.map((entry) => (
                <tr
                  key={entry._id}
                  className="hover:bg-base-200/40 transition-colors group"
                >
                  {/* Contest Info */}
                  <td className="py-5">
                    <div className="flex items-center gap-3">
                      <div className="avatar placeholder">
                        <div className="bg-primary/10 text-primary rounded-xl w-10 h-10 font-black">
                          <img src={entry?.contestImage} alt="C" />
                        </div>
                      </div>
                      <div>
                        <div className="font-black text-sm">
                          {entry.contestName}
                        </div>
                        <div className="text-[10px] opacity-40 font-mono tracking-tighter">
                          TXID: {entry.transactionId.slice(0, 12)}...
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Timeline & Deadline Logic */}
                  <td>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1 text-xs font-bold opacity-70">
                        <Calendar size={12} />{" "}
                        {new Date(entry.startDate).toLocaleDateString()}
                      </div>
                      <div
                        className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md w-fit ${
                          getDaysRemaining(entry.endDate).includes("Ended")
                            ? "bg-red-500/10 text-red-500"
                            : "bg-green-500/10 text-green-500"
                        }`}
                      >
                        {getDaysRemaining(entry.endDate)}
                      </div>
                    </div>
                  </td>

                  {/* Payment Status (Always Paid in this list) */}
                  <td>
                    <div className="flex flex-col items-center">
                      <span className="text-sm font-black text-primary">
                        $ {entry.paidAmount}
                      </span>
                      <span className="flex items-center gap-1 text-[9px] font-black text-green-500 uppercase">
                        <CheckCircle2 size={10} /> Successful
                      </span>
                    </div>
                  </td>

                  {/* Submission Status */}
                  <td>
                    <div
                      className={`badge badge-sm font-black text-[9px] uppercase h-5 border-none ${
                        entry.taskSubmissionStatus === "submitted"
                          ? "bg-indigo-500/10 text-indigo-500"
                          : "bg-base-300"
                      }`}
                    >
                      {entry.taskSubmissionStatus}
                    </div>
                  </td>

                  {/* Result */}
                  <td>
                    {entry.gradingStatus === "Winner" ? (
                      <div className="flex items-center gap-2 text-yellow-600 font-black italic text-sm">
                        <Trophy size={14} className="animate-pulse" /> Winner
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 opacity-30 text-xs font-bold">
                        <Clock size={12} /> Pending
                      </div>
                    )}
                  </td>

                  {/* View Submission */}
                  <th className="text-right">
                    {entry.taskSubmissionStatus === "pending" ? (
                      <Link
                        to={`/contest-details/${entry.contestId}`}
                        className="text-xs italic   bg-linear-to-br btn text-white from-indigo-500 to-purple-500  "
                      >
                        See Contest
                      </Link>
                    ) : (
                      <Link
                          to={entry.task}
                          target="_blank"
                        className="text-xs italic   bg-linear-to-br btn text-white from-indigo-500 to-purple-500  "
                      >
                        View Submission
                      </Link>
                    )}
                  </th>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredData.length === 0 && (
            <div className="text-center py-20 bg-base-100">
              <AlertCircle className="mx-auto opacity-10 mb-2" size={48} />
              <p className="font-black italic opacity-20 text-lg">
                No entries found
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyEntriesContest;
