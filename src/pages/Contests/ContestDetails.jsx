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

  // 1. Fetch Contest Data
  const { data: contest, isLoading: contestLoading } = useQuery({
    queryKey: ["contests", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contest/${id}`);
      return res.data;
    },
  });

  // 2. Check registration status
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
      inputLabel: "Please provide your task submission link ensure any one can view/access it.",
      inputPlaceholder: "https://example.com/your-work",
      showCancelButton: true,
      confirmButtonText: "Submit Now",
      confirmButtonColor: "#22c55e", // Success green
      inputValidator: (value) => {
        if (!value) {
          return "You must provide a link to submit!";
        }
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const submissionLink = result.value;
        console.log(submissionLink);
        

        try {
          // Update task link and status
          const res = await axiosSecure.patch(`/submit-task/${id}`, {
            userEmail: user?.email,
            task: submissionLink,
            taskSubmissionStatus: "submitted", // Updating status here
          });

          if (res.data.modifiedCount > 0) {
            Swal.fire({
              icon: "success",
              title: "Submitted Successfully!",
              text: "Your task status is now 'submitted'.",
              timer: 2000,
              showConfirmButton: false,
            });
            // Optional: trigger a refetch if using TanStack Query
          }
        } catch (error) {
          Swal.fire(
            "Error",
            "Could not submit task. Try again later.",
            "error"
          );
        }
      }
    });
  };

  if (contestLoading || regLoading) return <Loader />;

  const hasPaid = registrationStatus?.hasPaid;
  const now = new Date();
  const startDate = new Date(contest?.startDate);
  const endDate = new Date(contest?.endDate);

  const isLive = now >= startDate && now <= endDate;
  const isUpcoming = now < startDate;
  const isEnded = now > endDate;

  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <span className="text-red-500 font-bold uppercase tracking-widest">
          Contest Ended
        </span>
      );
    }
    return (
      <div className="flex items-center gap-2 md:gap-4">
        {[
          { v: days, l: "Days" },
          { v: hours, l: "Hours" },
          { v: minutes, l: "Mins" },
        ].map((item, idx) => (
          <React.Fragment key={idx}>
            <div className="flex flex-col items-center">
              <span className="text-xl md:text-3xl font-black">{item.v}</span>
              <span className="text-[10px] uppercase font-bold text-gray-400">
                {item.l}
              </span>
            </div>
            <span className="text-gray-500 font-bold text-xl mb-4">:</span>
          </React.Fragment>
        ))}
        <div className="flex flex-col items-center">
          <span className="text-xl md:text-3xl font-black text-primary animate-pulse">
            {seconds}
          </span>
          <span className="text-[10px] uppercase font-bold text-gray-400">
            Secs
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 animate-fadeIn">
      {/* Hero Image Section */}
      <div className="relative rounded-3xl overflow-hidden bg-gray-900 h-[400px] mb-12 group shadow-2xl">
        <img
          src={contest?.image}
          alt={contest?.name}
          className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-6 bg-linear-to-t from-black/80 via-transparent to-transparent">
          <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tight drop-shadow-lg">
            {contest?.name}
          </h1>
          <div className="flex items-center gap-4 bg-black/40 backdrop-blur-xl px-8 py-4 rounded-3xl border border-white/20 shadow-2xl">
            <FaClock className="text-yellow-400 text-2xl animate-spin-slow" />
            <div className="text-left">
              <span className="text-xs uppercase font-black text-gray-300 block">
                {isUpcoming ? "Registration Countdown" : "Submission Deadline"}
              </span>
              <div className="font-mono">
                <Countdown
                  date={isUpcoming ? startDate : endDate}
                  renderer={renderer}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Content Column */}
        <div className="lg:col-span-2 space-y-10">
          <section className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
            <h2 className="text-3xl font-black mb-6 text-gray-800 flex items-center gap-3">
              About the Challenge
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg whitespace-pre-line italic">
              "{contest.description}"
            </p>
          </section>

          <section className="bg-blue-50 p-10 rounded-[2.5rem] border border-blue-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 text-blue-900 text-9xl font-black">
              ?
            </div>
            <h2 className="text-3xl font-black mb-6 text-blue-900">
              Task Instructions
            </h2>
            <ul className="space-y-4">
              {contest.taskInstruction?.split("\n").map(
                (step, i) =>
                  step.trim() && (
                    <li
                      key={i}
                      className="flex gap-4 items-start bg-white/50 p-4 rounded-2xl border border-blue-100"
                    >
                      <span className="flex-none w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                        {i + 1}
                      </span>
                      <span className="text-blue-900 font-medium leading-relaxed">
                        {step}
                      </span>
                    </li>
                  )
              )}
            </ul>
          </section>

          {/* User Specific Submission Area */}
          {hasPaid && isLive && (
            <section className="bg-linear-to-br from-green-50 to-emerald-50 p-10 rounded-[2.5rem] border-2 border-dashed border-green-200 text-center shadow-inner">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                <FaCloudUploadAlt className="text-4xl text-green-500" />
              </div>
              <h2 className="text-3xl font-black text-green-900 mb-3">
                Participation Active
              </h2>
              <p className="text-green-700 mb-8 max-w-md mx-auto">
                Excellent! You're officially in the running. Submit your best
                work to win the <strong className="bg-linear-to-br from-indigo-500 to-purple-500 bg-clip-text text-transparent">${contest.prizeMoney}</strong> prize!
              </p>
              <button onClick={handleSubmitTask} className="btn btn-lg btn-success text-white bg-linear-to-br from-indigo-500 to-purple-500 px-12 rounded-2xl shadow-xl hover:scale-105 transition-transform">
                Open Submission Portal
              </button>
            </section>
          )}
        </div>

        {/* Right Action Sidebar */}
        <div className="lg:col-span-1">
          <aside className="bg-white p-8 rounded-[2.5rem] shadow-2xl border border-gray-100 sticky top-24">
            <div className="space-y-8">
              <div className="flex justify-between items-center p-6 bg-amber-50 rounded-3xl border border-amber-100">
                <div>
                  <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1">
                    Grand Prize
                  </p>
                  <p className="text-4xl font-black text-amber-500 flex items-center gap-2">
                    <FaTrophy /> ${contest?.prizeMoney}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">
                    Cost to Enter
                  </p>
                  <p className="text-2xl font-bold text-gray-800">
                    ${contest?.entryPrice}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm font-bold p-2">
                  <span className="text-gray-400">Total Participants</span>
                  <span className="text-gray-800">
                    {contest?.participantCount || 0}
                  </span>
                </div>
                {hasPaid && (
                  <div className="flex items-center gap-2 text-green-600 bg-green-50 p-4 rounded-2xl font-black text-sm border border-green-100">
                    <FaCheckCircle className="text-lg" /> Registered & Verified
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
                className={`w-full py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all duration-500 
                  ${
                    hasPaid || isEnded
                      ? "bg-gray-100  bg-linear-to-br from-indigo-500 to-purple-500 bg-clip-text text-transparent cursor-not-allowed border border-gray-200"
                      : "bg-primary text-white hover:bg-blue-700 shadow-[0_10px_30px_-10px_rgba(59,130,246,0.5)] hover:-translate-y-1 active:scale-95"
                  }`}
              >
                {hasPaid ? (
                  "You're in the list!"
                ) : isEnded ? (
                  "Challenge Closed"
                ) : (
                  <>
                    {" "}
                    <FaTicketAlt className="animate-bounce" />{" "}
                    {isUpcoming ? "Pre-Register" : "Join Contest"}{" "}
                  </>
                )}
              </button>

              <div className="p-4 bg-gray-50 rounded-2xl text-[10px] text-gray-400 text-center leading-relaxed">
                By joining, you agree to our terms of service. Payments are
                processed via encrypted Stripe gateways.
              </div>
            </div>
          </aside>
        </div>

        {/* FULL WIDTH BOTTOM SECTION */}
        <div className="lg:col-span-3 mt-10">
          <ParticipantForThisContest id={id} />
        </div>
      </div>
    </div>
  );
};

export default ContestDetails;
