import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loader from "../../../../components/Loader/Loader";
import {
  Trophy,
  Clock,
  ExternalLink,
  Calendar,
  Eye,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

const ContestParticipants = () => {
  const { id: contestId } = useParams();
  const axiosSecure = useAxiosSecure();
  const [now, setNow] = useState(new Date());

  // Keep time synced for real-time UI switching
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 10000);
    return () => clearInterval(interval);
  }, []);

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

  const handleGrade = async (participantId, newStatus) => {
    try {
      const res = await axiosSecure.patch(
        `/grade-participant/${participantId}`,
        {
          status: newStatus,
        }
      );

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Status Updated",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          background:
            document.documentElement.getAttribute("data-theme") === "dark"
              ? "#1d232a"
              : "#fff",
        });
        refetch();
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to update",
        "error"
      );
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="p-4 md:p-8 bg-base-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Modern Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h2 className="text-4xl font-black tracking-tighter text-base-content uppercase">
              Submissions <span className="text-primary italic">Portal</span>
            </h2>
            <p className="text-xs font-bold opacity-50 tracking-[0.3em] mt-2">
              CONTEST_REF: {contestId?.slice(-8)}
            </p>
          </div>
          <div className="flex gap-4">
            <div className="stats shadow-sm bg-base-200 border border-base-300 rounded-2xl">
              <div className="stat py-2 px-6">
                <div className="stat-title text-[10px] font-black uppercase">
                  Total Paid
                </div>
                <div className="stat-value text-primary text-2xl">
                  $
                  {participants.reduce((acc, curr) => acc + curr.paidAmount, 0)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto bg-base-200/20 rounded-[2.5rem] border border-base-300 p-2 backdrop-blur-md">
          <table className="table w-full border-separate border-spacing-y-3">
            <thead>
              <tr className="text-base-content/40 uppercase text-[10px] font-black tracking-widest border-none">
                <th className="pl-8">Participant Info</th>
                <th className="text-center">Submission Status</th>
                <th className="text-center">Financials</th>
                <th className="text-center">Timeline</th>
                <th className="text-center">Result</th>
                <th className="text-right pr-8">Management</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((p) => {
                console.log(p);
                
                // LOGIC CHECK
                const isEnded = p?.endDate ? now > new Date(p?.endDate) : false;
                const isSubmitted = p.taskSubmissionStatus === "submitted";
                const canGrade = isEnded && isSubmitted;
                console.log(isEnded,);
                console.log(canGrade);
                

                return (
                  <tr
                    key={p._id}
                    className="group hover:translate-x-1 transition-transform duration-300"
                  >
                    {/* User Profile */}
                    <td className="bg-base-100 first:rounded-l-3xl border-y border-l border-base-300 pl-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="avatar">
                          <div className="w-14 h-14 rounded-2xl ring-2 ring-primary/5 shadow-inner">
                            <img src={p.userImage} alt="user" />
                          </div>
                        </div>
                        <div>
                          <div className="font-black text-base tracking-tight">
                            {p.userName}
                          </div>
                          <div className="text-[10px] font-bold opacity-30 uppercase tracking-tighter">
                            {p.userEmail}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Submission Status */}
                    <td className="bg-base-100 border-y border-base-300 text-center">
                      {isSubmitted ? (
                        <a
                          href={p.task}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-500 rounded-xl font-black text-xs border border-green-500/20 hover:bg-green-500 hover:text-white transition-all"
                        >
                          <CheckCircle2 size={14} /> VIEW_TASK
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-error/10 text-error rounded-xl font-black text-xs opacity-50 italic uppercase">
                          <AlertTriangle size={14} /> Pending
                        </span>
                      )}
                    </td>

                    {/* Financials Column */}
                    <td className="bg-base-100 border-y border-base-300 text-center">
                      <div className="flex flex-col items-center">
                        <span className="text-sm font-black text-primary">
                          ${p.paidAmount}
                        </span>
                        <span className="text-[9px] font-bold opacity-30 uppercase tracking-widest">
                          Fee Paid
                        </span>
                      </div>
                    </td>

                    {/* Timeline Column */}
                    <td className="bg-base-100 border-y border-base-300 text-center">
                      <div className="flex flex-col items-center gap-1">
                        <div className="flex items-center gap-1 text-[10px] font-black opacity-60">
                          <Calendar size={12} className="text-primary" />
                          {new Date(p.submittedAt).toLocaleDateString()}
                        </div>
                        <span
                          className={`text-[9px] font-black px-2 py-0.5 rounded-md uppercase ${
                            isEnded
                              ? "bg-neutral text-neutral-content"
                              : "bg-primary/10 text-primary"
                          }`}
                        >
                          {isEnded ? "Closed" : "Active"}
                        </span>
                      </div>
                    </td>
                    {/* result */}
                    <td className="bg-base-100 border-y border-base-300 text-center">  
                      {p.gradingStatus === "Winner" ? (
                        <div className="flex items-center gap-2 text-yellow-600 font-black italic text-sm justify-center">
                          <Trophy size={14} className="animate-pulse" /> Winner
                        </div>
                      ) : (
                          <div className="flex items-center gap-2   opacity-30 text-xs font-bold justify-center">  
                            {p.gradingStatus}
                            </div>
                      )}
                    </td>

                    {/* STRICT ACTION LOGIC */}
                    <td className="bg-base-100 last:rounded-r-3xl border-y border-r border-base-300 text-right pr-8">
                      {canGrade ? (
                        /* Case 1: Time Finished + Submitted = GRADING OPTIONS */
                        <div className="flex flex-col items-end gap-1">
                          <select
                            className="select select-bordered select-sm rounded-xl font-black bg-base-200 border-base-300 focus:ring-2 focus:ring-primary/20"
                            defaultValue={p.gradingStatus}
                            onChange={(e) => handleGrade(p._id, e.target.value)}
                          >
                            <option value="not_graded">Set Result</option>
                            <option
                              value="Winner"
                              className="text-yellow-600 font-bold"
                            >
                              🏆 Declare Winner
                            </option>
                            <option value="Average">Average</option>
                            <option value="Reject">Reject</option>
                          </select>
                          <span className="text-[9px] font-black text-success uppercase flex items-center gap-1">
                            <Trophy size={10} /> Ready to Grade
                          </span>
                        </div>
                      ) : (
                        /* Case 2: Time not finished OR not submitted = VIEW CONTEST */
                        <div className="flex flex-col items-end gap-1">
                          <Link
                            to={`/contest-details/${p.contestId}`}
                            className="btn btn-sm btn-outline border-base-300 rounded-xl font-black text-[10px] uppercase hover:bg-primary hover:text-white"
                          >
                            <Eye size={14} className="mr-1" /> View Contest
                          </Link>
                          <span className="text-[9px] font-black text-warning uppercase flex items-center gap-1">
                            <Clock size={10} />{" "}
                            {!isEnded ? "Time Remaining" : "No Submission"}
                          </span>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContestParticipants;
