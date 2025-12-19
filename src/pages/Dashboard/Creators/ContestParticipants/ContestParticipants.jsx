import React from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loader from '../../../../components/Loader/Loader';
 

const ContestParticipants = () => {
  const { id: contestId } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    data: participants = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["contest-participants", contestId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contest-participants/${contestId}`);
      return res.data;
    },
  });
  console.log(participants);
  

const handleGrade = async (participantId, newStatus) => {
  try {
    const res = await axiosSecure.patch(`/grade-participant/${participantId}`, {
      status: newStatus,
    });
    console.log(res);
    

    if (res.data.modifiedCount > 0) {
      Swal.fire("Success!", "Grading status updated.", "success");
      refetch();
    }
  } catch (error) {
    // This catches the "already has a winner" error from the backend
    const errorMsg = error.response?.data?.message || "Something went wrong";
    Swal.fire("Error", errorMsg, "error");
  }
};

  if (isLoading) return <Loader />;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">
        Contest Participants ({participants.length})
      </h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-100">
              <th>User Info</th>
              <th>Submission</th>
              <th>Current Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {participants.map((p) => (
              <tr key={p._id}>
                <td>
                  <div className="font-bold">{p.userName}</div>
                  <div className="text-sm opacity-50">{p.userEmail}</div>
                </td>
                <td>
                  {p.task ? (
                    <a
                      href={p.task}
                      target="_blank"
                      className="btn btn-xs btn-outline"
                    >
                      View Link
                    </a>
                  ) : (
                    <span className="text-red-400">No Submission</span>
                  )}
                </td>
                <td>
                  <span
                    className={`badge ${
                      p.gradingStatus === "winner"
                        ? "badge-primary text-white"
                        : p.gradingStatus === "average"
                        ? "badge-warning text-white"
                        : p.gradingStatus === "rejected"
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
                    defaultValue={p.gradingStatus}
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

export default ContestParticipants;
