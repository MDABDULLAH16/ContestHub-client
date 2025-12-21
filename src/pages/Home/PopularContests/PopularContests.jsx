import { useNavigate, Link } from "react-router";
import { UserRoundCheck, ArrowRight, Trophy, Zap } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/Loader/Loader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PopularContests = () => {
  const axiosSecure = useAxiosSecure();
  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["contests", "accepted"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests?status=accepted`);
      return res.data;
    },
  });

  const popularContests = [...contests]
    .sort((a, b) => (b.participantCount || 0) - (a.participantCount || 0))
    .slice(0, 5);

  if (isLoading) return <Loader />;

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-6">
        <div className="text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-500 text-xs font-bold uppercase tracking-widest mb-4">
            <Zap size={14} /> Trending Now
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-base-content tracking-tight">
            Popular{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-500 to-purple-600">
              Contests
            </span>
          </h2>
          <p className="text-base-content/60 mt-2 text-lg">
            Join the most competitive arenas and prove your skills.
          </p>
        </div>

        <Link
          to="/contests"
          className="group flex items-center gap-2 px-6 py-3 rounded-2xl bg-base-200 hover:bg-indigo-500 hover:text-white transition-all duration-300 font-bold shadow-sm"
        >
          Explore All{" "}
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </div>

      {/* --- CONTESTS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-8">
        {popularContests.map((contest) => {
          const now = new Date();
          const isLive =
            now >= new Date(contest.startDate) &&
            now <= new Date(contest.endDate);
          const isUpcoming = now < new Date(contest.startDate);

          return (
            <div
              key={contest._id}
              className="group relative bg-base-100 dark:bg-slate-900 rounded-2xl border border-base-300 dark:border-slate-800 overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image Container with Badges */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={contest.image}
                  alt={contest.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Status Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span
                    className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase shadow-lg backdrop-blur-md border border-white/20 text-white ${
                      isLive
                        ? "bg-emerald-500/80"
                        : isUpcoming
                        ? "bg-indigo-500/80"
                        : "bg-slate-500/80"
                    }`}
                  >
                    {isLive ? "● Live" : isUpcoming ? "Upcoming" : "Ended"}
                  </span>
                </div>

                {/* Participant Count Floating Chip */}
                <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl text-white text-xs font-bold flex items-center gap-1.5 border border-white/10">
                  <UserRoundCheck size={14} className="text-indigo-400" />
                  {contest.participantCount}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-base-content mb-2 line-clamp-1 group-hover:text-indigo-500 transition-colors">
                  {contest.name}
                </h3>
                <p className="text-base-content/60 text-xs leading-relaxed mb-6 line-clamp-2">
                  {contest.description}
                </p>

                <div className="flex items-center justify-between border-t border-base-200 dark:border-slate-800 pt-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-tighter font-bold text-base-content/40">
                      Prize Pool
                    </span>
                    <span className="text-xl font-black bg-linear-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                      ${contest.prizeMoney}
                    </span>
                  </div>

                  <Link
                    to={`contest-details/${contest._id}`}
                    className="flex items-center justify-center w-12 h-12 rounded-2xl bg-indigo-500 text-white shadow-lg shadow-indigo-500/30 hover:bg-purple-600 hover:shadow-purple-500/30 transition-all duration-300 active:scale-95"
                  >
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </div>

              {/* Subtle Decorative Hover Gradient */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-indigo-500/20 rounded-4xl pointer-events-none transition-colors duration-500"></div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PopularContests;
