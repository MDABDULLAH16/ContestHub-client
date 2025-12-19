import React from "react";
import { useQuery } from "@tanstack/react-query";
 import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useAuth } from "../../../../hooks/useAuth";
import Loader from "../../../../components/Loader/Loader";
 

const AllParticipants = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch all participants for contests created by this user
  const {
    data: participants = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-participants", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-participants?email=${user?.email}`);
      return res.data;
    },
  });
console.log(participants);

  const handleGrade = async (participantId, newStatus) => {
    try {
      const res = await axiosSecure.patch(
        `/grade-participant/${participantId}`,
        {
          status: newStatus,
        }
      );

      if (res.data.modifiedCount > 0) {
        Swal.fire("Updated!", `Status changed to ${newStatus}`, "success");
        refetch();
      }
    } catch (error) {
      // This will catch the "Already has a winner" error from backend
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to update",
        "error"
      );
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 underline">
        Manage All Submissions
      </h2>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="table w-full">
          <thead className="bg-primary text-white">
            <tr>
              <th>Participant</th>
              <th>Contest Name</th>
              <th>Submission</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((p) => (
              <tr
                key={p._id}
                className={p.gradingStatus === "winner" ? "bg-green-50" : ""}
              >
                <td>
                  <span className="font-bold">{p.userName}</span>
                  <br />
                  <span className="text-xs opacity-60">{p.userEmail}</span>
                </td>
                <td className="font-medium text-blue-600">
                  {p.contestName || "N/A"}
                </td>
                <td>
                  {p.task ? (
                    <a
                      href={p.task}
                      target="_blank"
                      rel="noreferrer"
                      className="btn btn-xs btn-outline"
                    >
                      Link
                    </a>
                  ) : (
                    "Pending"
                  )}
                </td>
                <td>
                  <span
                    className={`badge ${
                      p.gradingStatus === "Winner"
                        ? "badge-primary text-white"
                        : p.gradingStatus === "Average"
                        ? "badge-warning text-white"
                        : p.gradingStatus === "Reject"
                        ? "badge-error text-white"
                        : "badge-ghost"
                    }`}
                  >
                    {p.gradingStatus}
                  </span>
                </td>
                <td>
                  <select
                    className="select select-bordered select-xs"
                    value={p.gradingStatus}
                    disabled={p.gradingStatus === "Winner"} // Optional: lock if winner
                    onChange={(e) => handleGrade(p._id, e.target.value)}
                  >
                    <option value="not_graded">Pending</option>
                    <option value="Winner">Mark as Winner</option>
                    <option value="Average">Average</option>
                    <option value="Reject">Reject</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllParticipants;
