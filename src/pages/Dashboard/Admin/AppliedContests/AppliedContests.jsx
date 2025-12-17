import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Loader from "./../../../../components/Loader/Loader";
import useAxiosSecure from "./../../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import AppliedContestModal from "./AppliedContestModal";


const AppliedContests = () => {
  const axiosSecure = useAxiosSecure();

  const [selectedContest, setSelectedContest] = useState(null); // For the details modal

  // 1. Fetch Data using TanStack Query
  const {
    data: contests = [],
    isLoading,
    isError,
      error,
    refetch
  } = useQuery({
    queryKey: ["appliedContests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applied-contest");
      return res.data;
    },
  });

  

  if (isLoading) return <Loader />;
  if (isError)
    return (
      <div className="text-center text-red-500 mt-10">
        Error: {error.message}
      </div>
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Contest Review Queue
        </h2>
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-full">
          Total Pending: {contests.filter((c) => c.status === "pending").length}
        </span>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="table w-full">
          {/* Table Head */}
          <thead className="bg-gray-200 text-gray-700 uppercase text-sm">
            <tr>
              <th className="py-4">#</th>
              <th>Image</th>
              <th>Title & Creator</th>
              <th>Dates</th>
              <th>Financials</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {contests.map((contest, index) => (
              <tr
                key={contest._id || index}
                className="hover:bg-gray-50 border-b"
              >
                <td className="font-bold text-gray-500">{index + 1}</td>

                {/* Image */}
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={contest.image} alt={contest.name} />
                    </div>
                  </div>
                </td>

                {/* Title & Creator */}
                <td>
                  <div className="font-bold text-gray-800">{contest.name}</div>
                  <div className="text-xs text-gray-500 badge badge-ghost badge-sm mt-1">
                    {contest.contestType}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {contest.creator}
                  </div>
                </td>

                {/* Dates */}
                <td className="text-sm">
                  <div className="flex flex-col">
                    <span className="text-green-600">
                      Start: {new Date(contest.startDate).toLocaleDateString()}
                    </span>
                    <span className="text-red-500">
                      End: {new Date(contest.endDate).toLocaleDateString()}
                    </span>
                  </div>
                </td>

                {/* Financials */}
                <td>
                  <div className="text-sm">
                    Entry:{" "}
                    <span className="font-semibold">${contest.entryPrice}</span>
                  </div>
                  <div className="text-sm">
                    Prize:{" "}
                    <span className="font-bold text-amber-600">
                      ${contest.prizeMoney}
                    </span>
                  </div>
                </td>

                {/* Status Badge */}
                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase
                                        ${
                                          contest.status === "pending"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : ""
                                        }
                                        ${
                                          contest.status === "accepted"
                                            ? "bg-green-100 text-green-700"
                                            : ""
                                        }
                                        ${
                                          contest.status === "rejected"
                                            ? "bg-red-100 text-red-700"
                                            : ""
                                        }
                                    `}
                  >
                    {contest.status}
                  </span>
                </td>

                {/* Actions */}
                <td>
                  <button
                    onClick={() => setSelectedContest(contest)}
                    className="btn btn-xs btn-outline btn-info mr-2"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Details and Approval */}
      {selectedContest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4">
          <AppliedContestModal refetch={refetch}
            setSelectedContest={setSelectedContest}
           
            selectedContest={selectedContest}
          ></AppliedContestModal>
        </div>
      )}
    </div>
  );
};

export default AppliedContests;
