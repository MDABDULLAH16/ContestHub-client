import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { useAuth } from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Link } from "react-router";
import {
  Edit3,
  Trash2,
  Users,
  Lock,
  ChevronRight,
  AlertCircle,
  Trophy,
} from "lucide-react";

const MyCreatedContest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedContest, setSelectedContest] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {
    data: contests = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["my-created-contest", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-created-contest?email=${user?.email}`
      );
      return res.data;
    },
  });

  useEffect(() => {
    if (selectedContest) {
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

  const onSubmit = async (data) => {
    try {
      const res = await axiosSecure.patch(
        `/contest/${selectedContest._id}`,
        data
      );
      if (res.data.modifiedCount > 0) {
        refetch();
        document.getElementById("update-modal").checked = false;
        Swal.fire({
          title: "Updated!",
          text: "Contest details synchronized.",
          icon: "success",
          background: "#1e293b",
          color: "#f8fafc",
        });
      }
    } catch (error) {
      console.error("Patch Error:", error);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Delete Contest?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#334155",
      confirmButtonText: "Yes, delete it!",
      background: "#1e293b",
      color: "#f8fafc",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/contest/${id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire("Deleted!", "Contest removed.", "success");
        }
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-base-content uppercase">
            My <span className="text-indigo-500">Contests</span>
          </h1>
          <p className="text-xs font-bold opacity-50 tracking-[0.2em] uppercase mt-1">
            Managing {contests.length} creations
          </p>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-base-100 rounded-2xl shadow-2xl border border-base-300 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            {/* Table Head */}
            <thead className="bg-base-200/50">
              <tr className="border-b border-base-300 text-base-content/50 uppercase text-[10px] font-black tracking-widest">
                <th className="py-5 px-6">Contest Identity</th>
                <th>Pricing & Prize</th>
                <th>Status</th>
                <th className="text-center">Management</th>
              </tr>
            </thead>

            <tbody>
              {contests.map((contest) => (
                <tr
                  key={contest._id}
                  className="border-b border-base-300/50 hover:bg-indigo-600/5 transition-colors group"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-600/10 flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
                        <Trophy size={20} />
                      </div>
                      <div>
                        <p className="font-black text-sm text-base-content leading-tight uppercase tracking-tight">
                          {contest.name}
                        </p>
                        <p className="text-[10px] font-bold opacity-40 uppercase tracking-tighter">
                          {contest.contestType || "General"}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="flex flex-col">
                      <span className="text-xs font-black text-indigo-500">
                        ${contest.entryPrice}{" "}
                        <span className="opacity-30 text-[9px] text-base-content uppercase">
                          Entry
                        </span>
                      </span>
                      <span className="text-xs font-black text-emerald-500">
                        ${contest.prizeMoney}{" "}
                        <span className="opacity-30 text-[9px] text-base-content uppercase">
                          Pool
                        </span>
                      </span>
                    </div>
                  </td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center w-fit gap-1.5 ${
                        contest.status === "accepted"
                          ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                          : "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                          contest.status === "accepted"
                            ? "bg-emerald-500"
                            : "bg-amber-500"
                        }`}
                      ></div>
                      {contest.status}
                    </span>
                  </td>

                  <td className="text-center">
                    <div className="flex justify-center items-center gap-2">
                      {contest.status === "pending" ? (
                        <>
                          <label
                            htmlFor="update-modal"
                            className="p-2 bg-indigo-600/10 text-indigo-500 rounded-xl hover:bg-indigo-600 hover:text-white transition-all cursor-pointer"
                            onClick={() => setSelectedContest(contest)}
                            title="Edit Contest"
                          >
                            <Edit3 size={18} />
                          </label>
                          <button
                            onClick={() => handleDelete(contest._id)}
                            className="p-2 bg-rose-500/10 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all"
                            title="Delete Contest"
                          >
                            <Trash2 size={18} />
                          </button>
                        </>
                      ) : (
                        <div className="flex items-center gap-2">
                          <div
                            className="p-2 bg-base-200 text-base-content/30 rounded-xl cursor-not-allowed"
                            title="Contest Locked"
                          >
                            <Lock size={18} />
                          </div>
                          <Link
                            to={`/dashboard/creator/contest-participants/${contest._id}`}
                          >
                            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20 active:scale-95">
                              <Users size={14} /> Participants
                            </button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- MODAL --- */}
      <input type="checkbox" id="update-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle backdrop-blur-sm">
        <div className="modal-box bg-base-100 border border-base-300 max-w-2xl rounded-[2.5rem] p-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-indigo-600/10 text-indigo-500 rounded-2xl">
              <Edit3 size={24} />
            </div>
            <h3 className="font-black text-2xl uppercase tracking-tighter">
              Update <span className="text-indigo-500">Details</span>
            </h3>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="form-control">
              <label className="label uppercase text-[10px] font-black opacity-40 tracking-widest">
                Contest Name
              </label>
              <input
                {...register("name", { required: "Name is required" })}
                className="input input-bordered bg-base-200 border-base-300 rounded-xl focus:border-indigo-500 transition-all font-bold"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label uppercase text-[10px] font-black opacity-40 tracking-widest">
                  Entry Fee ($)
                </label>
                <input
                  type="number"
                  {...register("entryPrice", { required: true, min: 1 })}
                  className="input input-bordered bg-base-200 border-base-300 rounded-xl font-bold"
                />
              </div>
              <div className="form-control">
                <label className="label uppercase text-[10px] font-black opacity-40 tracking-widest">
                  Prize Pool ($)
                </label>
                <input
                  type="number"
                  {...register("prizeMoney", { required: true, min: 1 })}
                  className="input input-bordered bg-base-200 border-base-300 rounded-xl font-bold"
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label uppercase text-[10px] font-black opacity-40 tracking-widest">
                Description
              </label>
              <textarea
                {...register("description", {
                  required: "Description required",
                })}
                className="textarea textarea-bordered bg-base-200 border-base-300 rounded-xl h-24 font-medium"
              />
            </div>

            <div className="form-control">
              <label className="label uppercase text-[10px] font-black opacity-40 tracking-widest">
                Task Instructions
              </label>
              <textarea
                {...register("taskInstruction", {
                  required: "Instruction required",
                })}
                className="textarea textarea-bordered bg-base-200 border-base-300 rounded-xl h-24 font-medium"
              />
            </div>

            <div className="modal-action gap-3">
              <label
                htmlFor="update-modal"
                className="btn btn-ghost rounded-xl font-black uppercase text-xs tracking-widest"
              >
                Discard
              </label>
              <button
                type="submit"
                className="btn bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-8 border-none font-black uppercase text-xs tracking-widest"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MyCreatedContest;
