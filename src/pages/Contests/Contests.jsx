import React from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Countdown from "react-countdown";
import { Link } from "react-router";
import Loader from "../../components/Loader/Loader";
import { UserRoundCheck } from "lucide-react";

const Contests = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: contests = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["contests", "accepted"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests?status=accepted`);
      return res.data;
    },
  });
console.log('c',contests);

  // Renderer for Countdown
  // const renderer = ({ days, hours, minutes, seconds, completed }) => {
  //   if (completed) {
  //     return <span className="text-red-500 font-bold">Contest Ended</span>;
  //   }
  //   return (
  //     <div className="flex gap-2 text-center items-center">
  //       <div className="bg-gray-800 text-white px-2 py-1 rounded text-xs">
  //         <span className="block font-bold">{days}d</span>
  //       </div>
  //       <div className="bg-gray-800 text-white px-2 py-1 rounded text-xs">
  //         <span className="block font-bold">{hours}h</span>
  //       </div>
  //       <div className="bg-gray-800 text-white px-2 py-1 rounded text-xs">
  //         <span className="block font-bold">{minutes}m</span>
  //       </div>
  //       <div className="bg-primary text-white px-2 py-1 rounded text-xs animate-pulse">
  //         <span className="block font-bold">{seconds}s</span>
  //       </div>
  //     </div>
  //   );
  // };

  if (isLoading) return <Loader></Loader>;

  if (isError)
    return (
      <div className="alert alert-error max-w-md mx-auto mt-10">
        <span>Error: {error.message}</span>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          Live & Upcoming Contests
        </h1>
        <p className="text-gray-500">
          Explore, participate, and win amazing prizes!
        </p>
      </div>

      {contests.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl">
          <h3 className="text-xl text-gray-400">
            No active contests found at the moment.
          </h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contests.map((contest) => {
            const isLive =
              new Date() >= new Date(contest.startDate) &&
              new Date() <= new Date(contest.endDate);
            const isUpcoming = new Date() < new Date(contest.startDate);

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
                    <div title="Participants" className="flex items-center gap-1.5 bg-white/80 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full text-gray-800 shadow-sm transition-all hover:bg-white">
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

                  {/* Timer Section */}

                  {/* <div className="mb-4r bg-gray-50 p-3 rounded-xl border border-dashed border-gray-300">
                    <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-2">
                      {isUpcoming ? "Starts In:" : "Ends In:"}
                    </p>
                    <Countdown
                      date={
                        isUpcoming
                          ? new Date(contest.startDate)
                          : new Date(contest.endDate)
                      }
                      renderer={renderer}
                    />
                  </div> */}

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
          })}
        </div>
      )}
    </div>
  );
};

export default Contests;
