import React from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Countdown from "react-countdown";
import {
  FaTrophy,
  FaTicketAlt,
  FaClock,
  FaCheckCircle,
  FaCloudUploadAlt,
  FaInfoCircle,
  FaLightbulb,
} from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";
import Loader from "../../components/Loader/Loader";
import ParticipantForThisContest from "./ParticipantForThisContest";
import Swal from "sweetalert2";

const ContestDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const { data: contest, isLoading: contestLoading } = useQuery({
    queryKey: ["contests", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contest/${id}`);
      return res.data;
    },
  });

  const { data: registrationStatus, isLoading: regLoading } = useQuery({
    queryKey: ["payment-check", id, user?.email],
    enabled: !!user?.email && !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payment-check/${id}?email=${user?.email}`
      );
      return res.data;
    },
  });

  const handleSubmitTask = () => {
    Swal.fire({
      title: "Submit Your Entry",
      input: "url",
      inputLabel: "Please provide your task submission link.",
      inputPlaceholder: "https://example.com/your-work",
      showCancelButton: true,
      confirmButtonText: "Submit Now",
      background:
        document.documentElement.getAttribute("data-theme") === "dark"
          ? "#1e293b"
          : "#fff",
      color:
        document.documentElement.getAttribute("data-theme") === "dark"
          ? "#fff"
          : "#000",
      confirmButtonColor: "#6366f1",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const submissionLink = result.value;
        try {
          const res = await axiosSecure.patch(`/submit-task/${id}`, {
            userEmail: user?.email,
            task: submissionLink,
            taskSubmissionStatus: "submitted",
          });

          if (res.data.modifiedCount > 0) {
            Swal.fire({ icon: "success", title: "Submitted Successfully!" });
          }
        } catch (error) {
          Swal.fire("Error", "Could not submit task.", "error");
        }
      }
    });
  };

  if (contestLoading || regLoading) return <Loader />;

  const hasPaid = registrationStatus?.hasPaid;
  const now = new Date();
  const startDate = new Date(contest?.startDate);
  const endDate = new Date(contest?.endDate);

  const isUpcoming = now < startDate;
  const isEnded = now > endDate;

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed)
      return (
        <span className="text-error font-bold tracking-widest uppercase">
          Ended
        </span>
      );
    return (
      <div className="flex items-center gap-3">
        {[
          { v: days, l: "D" },
          { v: hours, l: "H" },
          { v: minutes, l: "M" },
          { v: seconds, l: "S", pulse: true },
        ].map((item, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <span
              className={`text-2xl md:text-3xl font-black ${
                item.pulse
                  ? "text-white animate-pulse"
                  : "text-base-content"
              }`}
            >
              {item.v.toString().padStart(2, "0")}
            </span>
            <span className="text-[10px] opacity-50 font-bold uppercase">
              {item.l}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 transition-colors duration-500">
      {/* --- HERO SECTION --- */}
      <div className="relative rounded-[2.5rem] overflow-hidden bg-slate-900 h-[350px] md:h-[450px] mb-12 shadow-2xl border border-white/10">
        <img
          src={contest?.image}
          alt={contest?.name}
          className="w-full h-full object-cover opacity-40 transition-transform duration-1000 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base-100 via-transparent to-black/20" />

        <div className="absolute inset-0 flex flex-col justify-center items-center p-6 text-center">
          <div className="badge badge-primary text-white badge-outline mb-4 px-4 py-3 uppercase tracking-widest font-bold">
            {contest?.contestType || "Official Contest"}
          </div>
          <h1 className="text-4xl md:text-7xl font-black mb-6 text-white tracking-tight drop-shadow-2xl">
            {contest?.name}
          </h1>

          <div className="bg-linear-to-br from-indigo-500 to-purple-600 text-white  backdrop-blur-xl px-6 py-4 rounded-2xl border border-white/10 shadow-2xl flex items-center gap-6">
            <FaClock className="text-white text-3xl" />
            <div className="text-left">
              <p className="text-[10px] text-white opacity-60 uppercase tracking-widest">
                {isUpcoming ? "Registration opens in" : "Submission Deadline"}
              </p>
              <Countdown
                date={isUpcoming ? startDate : endDate}
                renderer={renderer}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* --- LEFT COLUMN --- */}
        <div className="lg:col-span-2 space-y-8">
          {/* About Section */}
          <section className="bg-base-100 border border-base-300 p-8 md:p-10 rounded-[2.5rem] shadow-sm">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
              <FaInfoCircle className="text-indigo-500" /> About the Challenge
            </h2>
            <p className="text-base-content/70 leading-relaxed text-lg whitespace-pre-line italic border-l-4 border-indigo-500 pl-6">
              "{contest.description}"
            </p>
          </section>

          {/* Instructions Section */}
          <section className="bg-indigo-500/5 border border-indigo-500/20 p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden">
            <FaLightbulb className="absolute -top-4 -right-4 text-9xl opacity-5 text-indigo-500 rotate-12" />
            <h2 className="text-2xl font-black mb-8 text-indigo-500 flex items-center gap-3">
              Task Instructions
            </h2>
            <div className="grid gap-4">
              {contest.taskInstruction?.split("\n").map(
                (step, i) =>
                  step.trim() && (
                    <div
                      key={i}
                      className="flex gap-4 items-start bg-base-100 dark:bg-slate-800/50 p-5 rounded-2xl border border-base-300 dark:border-slate-700 hover:border-indigo-500 transition-colors"
                    >
                      <span className="flex-none w-8 h-8 rounded-xl bg-linear-to-br from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold shadow-lg">
                        {i + 1}
                      </span>
                      <p className="text-base-content opacity-80 font-medium pt-1">
                        {step}
                      </p>
                    </div>
                  )
              )}
            </div>
          </section>

          {/* Active Submission Portal */}
          {hasPaid && !isEnded && (
            <section className="bg-linear-to-br from-indigo-500/10 to-purple-500/10 p-10 rounded-[2.5rem] border-2 border-dashed border-indigo-500/30 text-center animate-pulse-slow">
              <div className="bg-base-100 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl border border-base-300">
                <FaCloudUploadAlt className="text-4xl text-indigo-500" />
              </div>
              <h2 className="text-3xl font-black mb-3">Participation Active</h2>
              <p className="opacity-70 mb-8 max-w-sm mx-auto">
                Submit your entry link below to claim your spot on the
                leaderboard.
              </p>
              <button
                onClick={handleSubmitTask}
                className="btn btn-lg bg-linear-to-r from-indigo-500 to-purple-600 border-none text-white px-10 rounded-2xl shadow-xl hover:scale-105 transition-all"
              >
                Submit Entry Now
              </button>
            </section>
          )}
        </div>

        {/* --- RIGHT SIDEBAR --- */}
        <div className="lg:col-span-1">
          <aside className="sticky top-24 space-y-6">
            <div className="bg-base-100 border border-base-300 p-8 rounded-[2.5rem] shadow-xl">
              {/* Prize Pool Box */}
              <div className="bg-base-200 dark:bg-slate-800 p-6 rounded-3xl border border-base-300 mb-8 text-center">
                <p className="text-[10px] font-black opacity-50 uppercase tracking-[0.2em] mb-2">
                  Grand Prize Pool
                </p>
                <div className="text-5xl font-black bg-linear-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent flex justify-center items-center gap-3">
                  <FaTrophy className="text-indigo-500 text-3xl" /> $
                  {contest?.prizeMoney}
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center px-2">
                  <span className="opacity-50 text-sm font-bold uppercase">
                    Entry Fee
                  </span>
                  <span className="text-xl font-black">
                    ${contest?.entryPrice}
                  </span>
                </div>
                <div className="flex justify-between items-center px-2">
                  <span className="opacity-50 text-sm font-bold uppercase">
                    Participants
                  </span>
                  <span className="text-xl font-black">
                    {contest?.participantCount || 0}
                  </span>
                </div>

                {hasPaid && (
                  <div className="flex items-center gap-3 text-emerald-500 bg-emerald-500/10 p-4 rounded-2xl font-bold text-sm border border-emerald-500/20">
                    <FaCheckCircle className="text-xl" /> Slot Confirmed
                  </div>
                )}
              </div>

              <button
                disabled={hasPaid || isEnded}
                onClick={() =>
                  navigate(`/payment/${contest._id}`, {
                    state: { price: contest.entryPrice, title: contest.name },
                  })
                }
                className={`w-full py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all duration-300 
                  ${
                    hasPaid || isEnded
                      ? "bg-base-200 opacity-50 cursor-not-allowed border border-base-300"
                      : "bg-linear-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/25 hover:-translate-y-1 active:scale-95"
                  }`}
              >
                {hasPaid ? (
                  "Already Joined"
                ) : isEnded ? (
                  "Contest Closed"
                ) : (
                  <>
                    <FaTicketAlt /> Join Contest
                  </>
                )}
              </button>
            </div>

            {/* Terms Hint */}
            <div className="p-6 bg-base-200/50 rounded-2xl text-[10px] text-center opacity-40 leading-relaxed uppercase tracking-tighter">
              Participation requires a verified account. Prizes are distributed
              via Stripe within 48 hours of winner selection.
            </div>
          </aside>
        </div>

        {/* --- BOTTOM SECTION --- */}
        <div className="lg:col-span-3 mt-8">
          <ParticipantForThisContest id={id} />
        </div>
      </div>
    </div>
  );
};

export default ContestDetails;
