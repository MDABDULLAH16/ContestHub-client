import   { useState } from "react";  
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/Loader/Loader";
import ContestCard from "./ContestCard";

const Contests = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedType, setSelectedType] = useState("All"); // State for filtering

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

  // 1. Get unique contest types from the data
  // Using Set to ensure no duplicates, then adding "All" at the start
  const contestTypes = ["All", ...new Set(contests.map((c) => c.contestType))];

  // 2. Filter the contests based on selection
  const filteredContests =
    selectedType === "All"
      ? contests
      : contests.filter((contest) => contest.contestType === selectedType);

  if (isLoading) return <Loader />;

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
        <p className="text-gray-500 mb-8">
          Explore, participate, and win amazing prizes!
        </p>

        {/* 3. Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {contestTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-6 py-2 rounded-full font-bold transition-all duration-300 border ${
                selectedType === type
                  ? "bg-linear-to-br from-indigo-500 to-purple-500 text-white border-primary shadow-lg scale-105"
                  : "bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {filteredContests.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl">
          <h3 className="text-xl text-gray-400">
            No {selectedType !== "All" ? selectedType : ""} contests found at
            the moment.
          </h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredContests.map((contest) => {
            const isLive =
              new Date() >= new Date(contest.startDate) &&
              new Date() <= new Date(contest.endDate);
            const isUpcoming = new Date() < new Date(contest.startDate);

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
