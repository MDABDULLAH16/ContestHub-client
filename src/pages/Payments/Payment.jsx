import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loader from "../../components/Loader/Loader";
import { useAuth } from "../../hooks/useAuth";

const Payment = () => {
  const { contestId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: contest, isLoading } = useQuery({
    queryKey: ["contest", contestId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contest/${contestId}`);
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  const handlePayment = async () => {
    const paymentInfo = {
      contestId,
      user
    };

    try {
      const res = await axiosSecure.post(
        "/create-checkout-session",
        paymentInfo
        );
        console.log(res.data);
        
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.error("Payment initiation failed:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-12 p-4">
      <div className="card lg:card-side bg-base-100 shadow-xl border border-gray-100">
        <figure className="lg:w-1/3 bg-primary text-white p-8 flex flex-col justify-center items-center">
          <div className="text-sm uppercase tracking-widest mb-2">
            Entry Fee
          </div>
          <div className="text-5xl font-bold">${contest.entryPrice}</div>
        </figure>

        <div className="card-body lg:w-2/3">
          <h2 className="card-title text-2xl font-bold text-gray-800">
            {contest.name}
          </h2>
          <p className="text-gray-600 mt-2">{contest.description}</p>

          <div className="divider">Payment Summary</div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Registrant Email:</span>
              <span className="font-semibold">{user?.email}</span>
            </div>
            <div className="flex justify-between">
              <span>Potential Prize Pool:</span>
              <span className="font-semibold text-green-600">
                ${contest.prizeMoney}
              </span>
            </div>
          </div>

          <div className="card-actions justify-end mt-6">
            <button
              onClick={handlePayment}
              className="btn btn-primary btn-block text-white"
            >
              Proceed to Stripe Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
