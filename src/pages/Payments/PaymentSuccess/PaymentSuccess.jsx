import React, { useEffect, useRef, useState } from "react";
import { CheckCircleIcon } from "lucide-react";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loader from "../../../components/Loader/Loader";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const hasCalled = useRef(false);

  useEffect(() => {
    if (sessionId && !hasCalled.current) {
      hasCalled.current = true;
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          setPaymentDetails(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [sessionId, axiosSecure]);

  if (loading) return <Loader />;
console.log(paymentDetails);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-linear-to-br from-indigo-600 to-purple-600 p-8 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircleIcon className="h-16 w-16 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Payment Received!</h1>
          <p className="text-white opacity-90">
            Thank you for joining the contest.
          </p>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
            Registration Summary
          </h3>

          <div className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Transaction ID:</span>
              <span className="font-mono font-medium text-gray-800 truncate ml-4">
                {paymentDetails.transactionId}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Amount Paid:</span>
              <span className="font-bold text-gray-900">
                ${parseInt((paymentDetails?.amount_total / 100).toFixed(2))}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Status:</span>
              <span className="badge badge-primary text-white badge-sm">
                Success
              </span>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <Link
              to={`/contest-details/${paymentDetails.contestId}`}
              className="inline-flex items-center gap-2 px-4 py-2
              bg-linear-to-r from-indigo-600 to-purple-600
              text-white rounded-lg text-sm font-medium
              hover:shadow-lg transition btn w-full justify-center"
            >
              View My Contests
            </Link>
            <Link to="/" className="btn btn-ghost w-full">
              Back to Home
            </Link>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            A confirmation email has been sent to your registered address.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
