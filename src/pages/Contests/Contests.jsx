import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader/Loader";
import ContestCard from "./ContestCard";
import { FaFilter } from "react-icons/fa";

const Contests = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedType, setSelectedType] = useState("All");

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

  const contestTypes = ["All", ...new Set(contests.map((c) => c.contestType))];

  const filteredContests =
    selectedType === "All"
      ? contests
      : contests.filter((contest) => contest.contestType === selectedType);

  if (isLoading) return <Loader />;

  if (isError)
    return (
      <div className="alert alert-error max-w-md mx-auto mt-10 shadow-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>Error: {error.message}</span>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 transition-colors duration-500">
      {/* --- HEADER SECTION --- */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-black text-base-content mb-4 tracking-tight">
          Explore{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-500 to-purple-600">
            Arenas
          </span>
        </h1>
        <p className="text-base-content/60 max-w-lg mx-auto text-lg">
          Filter by category to find your next challenge and win amazing prizes.
        </p>
      </div>

      {/* --- FILTER TABS --- */}
      <div className="flex flex-col items-center mb-16">
        <div className="flex items-center gap-2 mb-6 text-sm font-bold opacity-40 uppercase tracking-widest">
          <FaFilter size={12} /> Filter Categories
        </div>
        <div className="flex flex-wrap justify-center gap-3 p-2 bg-base-200/50 backdrop-blur-md rounded-4xl border border-base-300 shadow-inner">
          {contestTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-8 py-3 rounded-3xl font-black text-sm transition-all duration-500 ${
                selectedType === type
                  ? "bg-linear-to-r from-indigo-500 to-purple-600 text-white shadow-xl shadow-indigo-500/20 scale-105"
                  : "bg-transparent text-base-content/60 hover:text-indigo-500 hover:bg-base-100"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* --- GRID / EMPTY STATE --- */}
      {filteredContests.length === 0 ? (
        <div className="text-center py-32 bg-base-200/30 rounded-[3rem] border-2 border-dashed border-base-300">
          <div className="text-6xl mb-6 opacity-20">🔎</div>
          <h3 className="text-2xl font-black text-base-content opacity-40">
            No {selectedType !== "All" ? selectedType : ""} contests found
          </h3>
          <p className="text-base-content/30 mt-2">
            Try selecting a different category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredContests.map((contest) => {
            const now = new Date();
            const isLive =
              now >= new Date(contest.startDate) &&
              now <= new Date(contest.endDate);
            const isUpcoming = now < new Date(contest.startDate);

            return (
              <ContestCard
                key={contest._id}
                contest={contest}
                isLive={isLive}
                isUpcoming={isUpcoming}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Contests;
