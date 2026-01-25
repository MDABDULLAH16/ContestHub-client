import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaFilter, FaSearch, FaTimes } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../components/Loader/Loader";
import ContestCard from "./ContestCard";
import { motion, AnimatePresence } from "framer-motion";

const Contests = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedType, setSelectedType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

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

  // Logic for Combined Filtering (Search + Category)
  const filteredContests = contests.filter((contest) => {
    const matchesCategory =
      selectedType === "All" || contest.contestType === selectedType;
    const matchesSearch =
      contest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contest.contestType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (isLoading) return <Loader />;

  if (isError)
    return (
      <div className="alert alert-error max-w-md mx-auto mt-10 shadow-lg text-white font-bold">
        <span>Error: {error.message}</span>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-14 min-h-screen">
      {/* --- HEADER SECTION --- */}
      <div className="mb-12 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-black text-base-content mb-4"
        >
          Explore{" "}
          <span className="bg-linear-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Arenas
          </span>
        </motion.h1>
      </div>

      {/* --- SEARCH & FILTER CONTROLS --- */}
      <div className="flex flex-col items-center space-y-8 mb-16">
        {/* Modern Search Bar */}
        <div className="relative w-full max-w-2xl group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none text-base-content/40 group-focus-within:text-primary transition-colors">
            <FaSearch />
          </div>
          <input
            type="text"
            placeholder="Search for contest name or category..."
            className="input input-lg w-full pl-14 pr-12 bg-base-200/50 backdrop-blur-md border-base-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-inner"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute inset-y-0 right-5 flex items-center text-base-content/40 hover:text-error transition-colors"
            >
              <FaTimes />
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex flex-col items-center w-full">
          <div className="flex items-center gap-2 mb-4 text-xs font-black opacity-40 uppercase tracking-[0.2em]">
            <FaFilter size={10} /> Jump to Category
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {contestTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-all duration-300 ${
                  selectedType === type
                    ? "bg-primary text-primary-content shadow-lg shadow-primary/30 scale-105"
                    : "bg-base-200 text-base-content/60 hover:bg-base-300"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* --- GRID / EMPTY STATE --- */}
      <AnimatePresence mode="wait">
        {filteredContests.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 bg-base-200/20 rounded-[3rem] border-2 border-dashed border-base-300"
          >
            <div className="text-6xl mb-4">🔎</div>
            <h3 className="text-xl font-bold opacity-40 uppercase tracking-widest">
              No results found for "{searchQuery || selectedType}"
            </h3>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedType("All");
              }}
              className="btn btn-ghost btn-sm mt-4 text-primary underline"
            >
              Clear all filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredContests.map((contest) => {
              const now = new Date();
              const isLive =
                now >= new Date(contest.startDate) &&
                now <= new Date(contest.endDate);
              const isUpcoming = now < new Date(contest.startDate);

              return (
                <motion.div layout key={contest._id}>
                  <ContestCard
                    contest={contest}
                    isLive={isLive}
                    isUpcoming={isUpcoming}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Contests;
