import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import StatsCreators from "../StatsCreators/StatsCreators"; 
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useAuth } from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const MyCreatedContest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedContest, setSelectedContest] = useState(null);

  // React Hook Form Initialization
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { data: contests = [], refetch } = useQuery({
    queryKey: ["my-created-contest", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-created-contest?email=${user?.email}`
      );
      return res.data;
    },
  });

  // Reset form values whenever a new contest is selected for editing
  useEffect(() => {
    if (selectedContest) {
      console.log(selectedContest);
      
      reset({
        name: selectedContest.name,
        entryPrice: selectedContest.entryPrice,
        prizeMoney: selectedContest.prizeMoney,
        description: selectedContest.description,
        taskInstruction: selectedContest.taskInstruction,
        contestType: selectedContest.contestType,
      });
    }
  }, [selectedContest, reset]);

  console.log(selectedContest);
  
  // Handle Update Submit
  const onSubmit = async (data) => {
    console.log("Updated Form Data:", data);

    try {
      const res = await axiosSecure.patch(
        `/contest/${selectedContest._id}`,
        data
      );
      if (res.data.modifiedCount > 0) {
        refetch();
        document.getElementById("update-modal").checked = false; // Close Modal
        Swal.fire("Success!", "Contest updated successfully.", "success");
      }
    } catch (error) {
      console.error("Patch Error:", error);
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the contest!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/contest/${id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire("Deleted!", "Contest has been deleted.", "success");
        }
      }
    });
  };

  return (
    <div className="p-4">
      <StatsCreators />

      <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden mt-8">
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">
            My Contests ({contests.length})
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="bg-gray-100">
              <tr>
                <th>Contest Name</th>
                <th>Entry Fee</th>
                <th>Prize Pool</th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {contests.map((contest) => (
                <tr
                  key={contest._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="font-semibold">{contest.name}</td>
                  <td>${contest.entryPrice}</td>
                  <td>${contest.prizeMoney}</td>
                  <td>
                    <span
                      className={`badge p-3 font-medium ${
                        contest.status === "accepted"
                          ? " bg-linear-to-br from-indigo-600 to-purple-600  text-white  "
                          : "badge-warning text-white"
                      }`}
                    >
                      {contest.status}
                    </span>
                  </td>
                  <td className="text-center">
                    {contest.status === "pending" ? (
                      <div className="flex justify-center gap-2">
                        <label
                          htmlFor="update-modal"
                          className="btn btn-sm btn-info text-white"
                          onClick={() => setSelectedContest(contest)}
                        >
                          Edit
                        </label>
                        <button
                          onClick={() => handleDelete(contest._id)}
                          className="btn btn-sm btn-error text-white"
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      <button className="btn btn-sm btn-disabled">
                        Locked
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- DaisyUI Modal with React Hook Form --- */}
      <input type="checkbox" id="update-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-2xl">
          <h3 className="font-bold text-2xl mb-6">Update Contest Details</h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Contest Name */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Contest Name</span>
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                type="text"
                className="input input-bordered w-full"
              />
              {errors.name && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Entry Price */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    Entry Fee ($)
                  </span>
                </label>
                <input
                  {...register("entryPrice", { required: true, min: 1 })}
                  type="number"
                  className="input input-bordered w-full"
                />
              </div>
              {/* Prize Money */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">
                    Prize Pool ($)
                  </span>
                </label>
                <input
                  {...register("prizeMoney", { required: true, min: 1 })}
                  type="number"
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            {/* Description */}
            <div className="form-control flex flex-col">
              <label className="label">
                <span className="label-text font-semibold">Description</span>
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                className="textarea textarea-bordered h-28 w-full"
              ></textarea>
              {errors.description && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </span>
              )}
            </div>

            {/* Instruction */}
            <div className="form-control flex flex-col">
              <label className="label">
                <span className="label-text font-semibold">Instructions</span>
              </label>
              <textarea
                {...register("taskInstruction", {
                  required: "taskInstruction is required",
                })}
                className="textarea textarea-bordered h-28 w-full"
              ></textarea>
              {errors.description && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.taskInstruction.message}
                </span>
              )}
            </div>

            <div className="modal-action">
              <label htmlFor="update-modal" className="btn btn-ghost">
                Cancel
              </label>
              <button type="submit" className="btn btn-primary px-8">
                Save Updates
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyCreatedContest;
