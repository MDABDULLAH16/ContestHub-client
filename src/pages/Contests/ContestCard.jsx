import { UserRoundCheck, Trophy, ArrowUpRight } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const ContestCard = ({ contest, isLive, isUpcoming }) => {
  return (
    <div
      key={contest._id}
      className="group bg-base-100 rounded-[2rem] shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 border border-base-300 overflow-hidden flex flex-col hover:-translate-y-2"
    >
      {/* Image Section */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={contest.image}
          alt={contest.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <span
            className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest text-white shadow-lg backdrop-blur-md border border-white/20 ${
              isLive
                ? "bg-emerald-500/80"
                : isUpcoming
                ? "bg-indigo-500/80"
                : "bg-slate-500/80"
            }`}
          >
            {isLive ? "● LIVE" : isUpcoming ? "UPCOMING" : "ENDED"}
          </span>
        </div>

        <div className="absolute bottom-4 left-0 w-full px-4 flex justify-between items-end">
          {/* Price Badge - Entry Fee */}
          <div className="flex flex-col gap-1">
            <span className="bg-linear-to-r from-indigo-600 to-indigo-400 text-white px-3 py-1.5 rounded-xl text-xs font-black shadow-xl flex items-center gap-1.5 transition-transform hover:scale-105">
              ${contest.entryPrice}
              <span className="opacity-70 font-medium text-[10px] uppercase">
                Entry
              </span>
            </span>
          </div>

          {/* Participant Badge - Dark Mode Glassmorphism */}
          <div
            title="Participants"
            className="flex items-center gap-1.5 bg-base-100/60 dark:bg-slate-900/60 backdrop-blur-xl border border-white/20 px-3 py-1.5 rounded-xl text-base-content shadow-lg"
          >
            <UserRoundCheck size={16} className="text-emerald-500" />
            <span className="text-sm font-black">
              {contest?.participantCount || 0}
            </span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 grow flex flex-col">
        <div className="flex justify-between items-start gap-2 mb-3">
          <h3
            title={contest.name}
            className="text-lg font-black text-base-content line-clamp-1 group-hover:text-indigo-500 transition-colors"
          >
            {contest.name}
          </h3>
          <span className="text-[10px] font-black bg-base-200 text-base-content/50 px-2 py-1 rounded-lg uppercase tracking-tighter">
            {contest.contestType}
          </span>
        </div>

        <p className="text-base-content/60 text-xs leading-relaxed line-clamp-2 mb-6">
          {contest.description}
        </p>

        {/* Footer Info */}
        <div className="mt-auto flex items-center justify-between border-t border-base-300 pt-5">
          <div>
            <p className="text-[10px] font-bold text-base-content/30 uppercase tracking-widest">
              Prize
            </p>
            <p className="text-xl font-black bg-linear-to-r from-indigo-500 to-purple-600 text-transparent bg-clip-text">
              ${contest.prizeMoney}
            </p>
          </div>

          {/* Dynamic Button */}
          <Link title="See Details" to={`/contest-details/${contest._id}`}>
            <button className="btn btn-circle bg-linear-to-r from-indigo-600 to-purple-600 border-none text-white shadow-lg shadow-indigo-500/20 hover:scale-110 transition-all group-hover:rotate-12">
              <ArrowUpRight size={20} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContestCard;
