import React from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const AppliedContestModal = ({
  setSelectedContest,
  selectedContest,
  refetch,
}) => {
  const axiosSecure = useAxiosSecure();
  const handleStatusChange = async (id, status) => {
    // console.log(id, status); // Good for debugging

    try {
      const res = await axiosSecure.patch(
        `/applied-contest/${id}?status=${status}`
      );

      if (res.data.modifiedCount > 0) {
        // FIX: Use if/else to prevent double toasts
        if (status === "rejected") {
          toast.error(`The contest has been rejected.`);
        } else {
          toast.success(`The contest has been ${status}.`);
        }

        // Refresh the table data
       refetch();
       setSelectedContest(null);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status.");
    }
  };
  const handleDeleteContest = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/applied-contest/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
            refetch()
            setSelectedContest(null)
        }
      }
    });
  };
  return (
    <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      {/* Modal Header */}
      <div className="relative">
        <img
          src={selectedContest.image}
          alt="cover"
          className="w-full h-48 object-cover rounded-t-xl"
        />
        <button
          onClick={() => setSelectedContest(null)}
          className="absolute top-2 right-2 btn btn-circle btn-sm btn-error text-white"
        >
          ✕
        </button>
      </div>

      {/* Modal Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800">
          {selectedContest.name}
        </h3>
        <p className="text-gray-500 text-sm mb-4">
          Submitted by: {selectedContest.creator}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-3 bg-gray-100 rounded-lg">
            <p className="font-semibold text-gray-700">Contest Description</p>
            <p className="text-sm text-gray-600 mt-1">
              {selectedContest.description}
            </p>
          </div>
          {/* 1. Use optional chaining (?.) and check if it exists */}
          {selectedContest?.taskInstruction &&
            selectedContest.taskInstruction.trim().length > 0 && (
              <div className="p-3 bg-gray-100 rounded-lg">
                <p className="font-semibold text-gray-700 mb-2">
                  Task Instructions
                </p>

                <ol className="list-decimal list-inside text-sm text-gray-600 space-y-2">
                  {/* 2. Use || "" to ensure split() always runs on a string */}
                  {(selectedContest.taskInstruction || "")
                    .split("\n")
                    .map((instruction, index) => {
                      if (!instruction.trim()) return null;

                      return (
                        <li key={index} className="leading-relaxed">
                          {instruction}
                        </li>
                      );
                    })}
                </ol>
              </div>
            )}

          {/* 3. Optional: Show a placeholder if empty */}
          {!selectedContest?.taskInstruction && (
            <p className="text-gray-400 italic text-sm">
              No instructions provided for this contest.
            </p>
          )}
        </div>

        {/* Action Buttons inside Modal */}
       
          <div className="flex justify-end gap-3 mt-6 border-t pt-4">
            <button
              onClick={() => handleDeleteContest(selectedContest._id)}
              className="btn btn-error text-white"
            >
              Delete
            </button>
            <button
              onClick={() =>
                handleStatusChange(selectedContest._id, "rejected")
              }
              className="btn btn-warning text-white"
            >
              Reject Contest
            </button>
            <button
              onClick={() =>
                handleStatusChange(selectedContest._id, "accepted")
              }
              className="btn inline-flex items-center gap-2 px-4 py-2
              bg-linear-to-r from-indigo-600 to-purple-600
              text-white rounded-lg text-sm font-medium
              hover:shadow-lg transition"
            >
              Approve Contest
            </button>
          </div>
     
      </div>
    </div>
  );
};

export default AppliedContestModal;
