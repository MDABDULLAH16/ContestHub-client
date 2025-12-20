import { useNavigate, Link } from "react-router";
import { UserRoundCheck, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/Loader/Loader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PopularContests = () => {
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
   

  // Sort by participation count (descending) and take top 5
  const popularContests = [...contests]
    .sort((a, b) => (b.participantCount || 0) - (a.participantCount || 0))
    .slice(0, 5);

  if (isLoading) return <Loader></Loader>;

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Popular Contests</h2>
          <p className="text-gray-500">
            The most joined competitions right now
          </p>
        </div>
        <Link
          to="/contests"
          className="text-blue-600 font-semibold flex items-center gap-1 hover:underline"
        >
          Show All <ArrowRight size={18} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {popularContests.map((contest) => {
          const isLive =
            new Date() >= new Date(contest.startDate) &&
            new Date() <= new Date(contest.endDate);
          const isUpcoming = new Date() < new Date(contest.startDate);
          return (
            <div
              key={contest._id}
              className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Creative Image Section */}
              <div className="relative h-48 overflow-hidden group">
                {/* Background Image */}
                <img
                  src={contest.image}
                  alt={contest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlay Container */}
                <div className="absolute top-4 left-0 right-0 px-4 flex justify-between items-center">
                  {/* 1. Status Badge (Left Side) */}
                  <span
                    className={`badge border-none py-1 px-4 h-auto font-bold text-white shadow-lg ${
                      isLive
                        ? "bg-green-500"
                        : isUpcoming
                        ? "bg-blue-500"
                        : "bg-gray-500"
                    }`}
                  >
                    {isLive ? "LIVE" : isUpcoming ? "UPCOMING" : "ENDED"}
                  </span>

                  {/* 2. Participant Count (Right Side) */}
                  <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1 text-gray-800">
                    <UserRoundCheck size={14} className="text-emerald-600" />
                    <span>{contest.participantCount}</span>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">
                  {contest.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {contest.description.slice(0, 80)}...
                </p>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-400">Grand Prize</p>
                    <p className="text-lg font-bold  bg-linear-to-br from-indigo-500 to-purple-500 text-transparent bg-clip-text">
                      ${contest.prizeMoney}
                    </p>
                  </div>
                  <Link
                    to={`contest-details/${contest._id}`}
                    className="w-fit py-2.5 bg-linear-to-br from-indigo-500 to-purple-500 text-white rounded-xl font-medium hover:bg-indigo-500 px-2 transition-colors"
                  >
                   Details
                  </Link>
                </div>
              </div>
            </div>
          );})}
      </div>
    </section>
  );
};
export default PopularContests;
