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

  // 2. Check if user has already paid/registered
  const { data: registrationStatus, isLoading: regLoading } = useQuery({
    queryKey: ["registration-check", id, user?.email],
    enabled: !!user?.email && !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payment-check/${id}?email=${user?.email}`
      );
      return res.data;
    },
  });

  if (contestLoading || regLoading)
    return (
      <Loader></Loader>
    );

  const hasPaid = registrationStatus?.hasPaid;
  const now = new Date();
  const startDate = new Date(contest?.startDate);
  const endDate = new Date(contest?.endDate);

  const isLive = now >= startDate && now <= endDate;
  const isUpcoming = now < startDate;
  const isEnded = now > endDate;
  const isRegistrationOpen = now < endDate;

    {
      /* Custom Renderer Function */
    }
    const renderer = ({ days, hours, minutes, seconds, completed }) => {
      if (completed) {
        return (
          <span className="text-red-500 font-bold uppercase tracking-widest">
            Contest Ended
          </span>
        );
      }
      // This renders the D, H, M, S blocks
      return (
        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex flex-col items-center">
            <span className="text-xl md:text-3xl font-black">{days}</span>
            <span className="text-[10px] uppercase font-bold text-gray-400">
              Days
            </span>
          </div>
          <span className="text-gray-500 font-bold text-xl mb-4">:</span>
          <div className="flex flex-col items-center">
            <span className="text-xl md:text-3xl font-black">{hours}</span>
            <span className="text-[10px] uppercase font-bold text-gray-400">
              Hours
            </span>
          </div>
          <span className="text-gray-500 font-bold text-xl mb-4">:</span>
          <div className="flex flex-col items-center">
            <span className="text-xl md:text-3xl font-black">{minutes}</span>
            <span className="text-[10px] uppercase font-bold text-gray-400">
              Mins
            </span>
          </div>
          <span className="text-gray-500 font-bold text-xl mb-4">:</span>
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
    <div className="max-w-6xl mx-auto px-4 py-10 animate-fadeIn">
      {/* Hero Image Section */}
      <div className="relative rounded-3xl overflow-hidden bg-gray-900 h-[350px] mb-8 group shadow-2xl">
        <img
          src={contest?.image}
          alt={contest?.name}
          className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-6">
          <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
            {contest.name}
          </h1>
          <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10">
            <FaClock className="text-yellow-400 animate-pulse" />
            <span className="font-mono text-xl md:text-2xl">
              <Countdown date={isUpcoming ? startDate : endDate} renderer={renderer} />
            </span>
            <span className="text-xs uppercase font-bold text-gray-300">
              {isUpcoming ? "Starts In" : "Ends In"}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              About the Challenge
            </h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {contest.description}
            </p>
          </div>

          <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
            <h2 className="text-2xl font-bold mb-4 text-blue-900">
              Task Instructions
            </h2>
            <ol className="list-decimal list-inside space-y-3 text-blue-800">
              {contest.taskInstruction?.split("\n").map(
                (step, i) =>
                  step.trim() && (
                    <li key={i} className="font-medium">
                      {step}
                    </li>
                  )
              )}
            </ol>
          </div>

          {/* SUBMISSION AREA: Only shows if user HAS PAID and Contest is LIVE */}
          {hasPaid && isLive && (
            <div className="bg-green-50 p-8 rounded-3xl border-2 border-dashed border-green-200 text-center">
              <FaCloudUploadAlt className="text-5xl text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-900 mb-2">
                Submit Your Entry
              </h2>
              <p className="text-green-700 mb-6">
                You are a participant! Upload your work before the deadline.
              </p>
              <button className="btn btn-success text-white px-10 rounded-xl">
                Go to Submission Portal
              </button>
            </div>
          )}
        </div>

        {/* Right Side: Action Card */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 sticky top-24">
            <div className="flex justify-between items-center mb-8 pb-6 border-b">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                  Prize Pool
                </p>
                <p className="text-4xl font-black text-amber-500 flex items-center gap-2">
                  <FaTrophy className="text-2xl" /> ${contest.prizeMoney}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">
                  Entry Fee
                </p>
                <p className="text-2xl font-bold text-gray-800">
                  ${contest.entryPrice}
                </p>
              </div>
            </div>

            {/* Status Messages */}
            <div className="space-y-4 mb-8">
              {hasPaid && (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg font-bold text-sm">
                  <FaCheckCircle /> You are already registered!
                </div>
              )}
              {isUpcoming && !hasPaid && (
                <p className="text-blue-500 text-sm font-medium">
                  Early registration is open!
                </p>
              )}
            </div>

            {/* THE BUTTON */}
            <button
              disabled={hasPaid || isEnded}
              onClick={() =>
                navigate(`/payment/${contest._id}`, {
                  state: { price: contest.entryPrice, title: contest.name },
                })
              }
              className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300
                                ${
                                  hasPaid || isEnded
                                    ? "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                                    : "bg-primary text-white hover:bg-primary-focus shadow-lg hover:-translate-y-1"
                                }`}
            >
              {hasPaid ? (
                "Already Joined"
              ) : isEnded ? (
                "Contest Ended"
              ) : (
                <>
                  {" "}
                  <FaTicketAlt />{" "}
                  {isUpcoming ? "Pre-Register Now" : "Register Now"}{" "}
                </>
              )}
            </button>

            <p className="text-center text-xs text-gray-400 mt-6">
              Secure payment via Stripe. No refunds after registration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestDetails;
