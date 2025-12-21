import React from "react";
import { useAuth } from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../../components/Loader/Loader";
import {
  Trophy,
  DollarSign,
  Calendar,
  ExternalLink,
  Hash,
  PartyPopper,
} from "lucide-react";

const MyWinningContest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: myWinningContests = [], isLoading } = useQuery({
    queryKey: ["my-winning-contests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-winning-contests?email=${user?.email}`
      );
      return res.data;
    },
  });
console.log(myWinningContests);

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 bg-base-100">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="p-4 bg-yellow-500/10 rounded-2xl">
              <PartyPopper size={40} className="text-yellow-500" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-base-content tracking-tighter uppercase">
                My <span className="text-yellow-500">Victories</span>
              </h1>
              <p className="text-base-content/50 font-bold uppercase text-xs tracking-[0.3em] mt-1">
                You have won {myWinningContests.length}{" "}
                {myWinningContests.length === 1 ? "contest" : "contests"} so far
              </p>
            </div>
          </div>
        </div>

        {myWinningContests.length === 0 ? (
          <div className="bg-base-200 border-2 border-dashed border-base-300 rounded-[3rem] p-20 text-center">
            <Trophy size={64} className="mx-auto mb-4 opacity-10" />
            <h2 className="text-2xl font-black opacity-30">
              Your first win is waiting...
            </h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {myWinningContests.map((contest) => (
              <div
                key={contest._id}
                className="group relative bg-base-200/50 rounded-[2.5rem] border border-base-300 overflow-hidden hover:border-yellow-500/50 transition-all duration-500"
              >
                {/* Prize Badge Float */}
                <div className="absolute top-6 right-6 z-10 bg-yellow-500 text-black px-6 py-2 rounded-2xl font-black text-lg shadow-xl shadow-yellow-500/20 flex items-center gap-2">
                  <DollarSign size={20} strokeWidth={3} />
                  {contest.prizeMoney}
                </div>

                <div className="flex flex-col lg:flex-row h-full">
                  {/* Image Section */}
                  <div className="lg:w-2/5 relative h-64 lg:h-auto overflow-hidden">
                    <img
                      src={contest.contestImage}
                      alt={contest.contestName}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent lg:bg-linear-to-r"></div>
                    <div className="absolute bottom-6 left-6 flex items-center gap-2 text-white/70 text-[10px] font-black uppercase tracking-widest">
                      <Hash size={12} /> {contest.transactionId.slice(-8)}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="lg:w-3/5 p-8 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-yellow-500 text-[10px] font-black uppercase tracking-widest mb-2">
                        <Trophy size={14} /> Grand Champion
                      </div>
                      <h2 className="text-2xl font-black leading-tight text-base-content mb-4 line-clamp-2">
                        {contest.contestName}
                      </h2>

                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm font-bold opacity-60">
                          <Calendar size={16} className="text-primary" />
                          Won on:{" "}
                          {new Date(contest.updatedAt).toLocaleDateString(
                            "en-US",
                            { month: "long", day: "numeric", year: "numeric" }
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-sm font-bold opacity-60">
                          <Hash size={16} className="text-primary" />
                          Submitted:{" "}
                          {new Date(contest.submittedAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-8 flex items-center gap-3">
                      <a
                        href={contest.task}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-primary rounded-2xl flex-1 font-black gap-2 h-14 shadow-lg shadow-primary/20"
                      >
                        <ExternalLink size={18} />
                        View Submission
                      </a>
                      <div className="flex flex-col items-center justify-center px-4">
                        <span className="text-[10px] font-black opacity-30 uppercase">
                          Fee
                        </span>
                        <span className="font-black">
                          ${contest.paidAmount}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyWinningContest;
