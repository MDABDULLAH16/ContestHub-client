import { UserRoundCheck } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';

const ContestCard = ({ contest, isLive, isUpcoming }) => {
    return (
      <div
        key={contest._id}
        className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col"
      >
        {/* Image Section */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={contest.image}
            alt={contest.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-4 left-4">
            <span
              className={`badge border-none py-3 px-4 font-bold text-white ${
                isLive
                  ? "bg-green-500"
                  : isUpcoming
                  ? "bg-blue-500"
                  : "bg-gray-500"
              }`}
            >
              {isLive ? "LIVE" : isUpcoming ? "UPCOMING" : "ENDED"}
            </span>
          </div>
          <div className="absolute bottom-4 left-0 w-full px-4 flex justify-between items-end">
            {/* Price Badge - High Contrast to draw the eye */}
            <div className="flex flex-col gap-1">
              <span className="bg-blue-600 text-white px-3 py-1.5 rounded-full text-xs font-black shadow-lg flex items-center gap-1.5 transition-transform hover:scale-105">
                ${contest.entryPrice}
                <span className="opacity-80 font-medium">Entry</span>
              </span>
            </div>

            {/* Participant Badge - Glassmorphism style */}
            <div
              title="Participants"
              className="flex items-center gap-1.5 bg-white/80 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full text-gray-800 shadow-sm transition-all hover:bg-white"
            >
              <UserRoundCheck size={16} className="text-emerald-600" />
              <div className="flex flex-col leading-none">
                <span className="text-sm font-bold">
                  {contest?.participantCount}
                </span>
                {/* <span className="text-[10px] text-gray-500 uppercase tracking-tight">
                          Joined
                        </span> */}
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 grow flex flex-col">
          <div className="flex justify-between items-start ">
            <h3 className="text-xl mb-2 font-bold text-gray-800 line-clamp-1">
              {contest.name}
            </h3>
            <span className="text-xs font-semibold bg-gray-100 px-2 py-1 rounded uppercase">
              {contest.contestType}
            </span>
          </div>

          <p className="text-gray-500 text-sm line-clamp-2 mb-2">
            {contest.description}
          </p>
          {/* Footer Info */}
          <div className="mt-auto flex items-center justify-between border-t pt-4">
            <div>
              <p className="text-xs text-gray-400">Grand Prize</p>
              <p className="text-lg font-bold  bg-linear-to-br from-indigo-500 to-purple-500 text-transparent bg-clip-text">
                ${contest.prizeMoney}
              </p>
            </div>

            {/* Dynamic Button */}
            <Link to={`/contest-details/${contest._id}`}>
              <button
                className={`btn btn-primary btn-md rounded-xl normal-case  bg-linear-to-r from-indigo-600 to-purple-600
              text-white  `}
              >
                See Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
};

export default ContestCard;