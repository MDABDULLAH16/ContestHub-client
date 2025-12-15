import React, { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loader from "../../../../components/Loader/Loader";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

/* ---------------- MOCK DATA ---------------- */
 
const initialCreatorState = {
  _id: "",
  name: "",
  email: "",
  reason: "",
  portfolio: "",
  status: "",
};

const CreatorApply = () => {
  const axiosSecure = useAxiosSecure();
  const modalRef = useRef(null);
  const [selectedCreator, setSelectedCreator] = useState(initialCreatorState);
  const [isUpdating, setIsUpdating] = useState(false);

  /* ---------------- FETCH (UI ONLY) ---------------- */
  const { data: creators = [], isLoading ,refetch} = useQuery({
    queryKey: ['creators',],
    queryFn: async () => {
      const res = await axiosSecure.get(`/creators`)
      return res.data;
    },
  });

  /* ---------------- HANDLERS ---------------- */
  const handleSeeApply = (creator) => {
    setSelectedCreator(creator);
    modalRef.current?.showModal();
  };

const handleUpdateStatus = async (status) => {
  // 1️⃣ Close modal first (CRITICAL)
  modalRef.current?.close();

  // Allow dialog stack to clear
  await new Promise((r) => setTimeout(r, 50));

  // 2️⃣ Confirmation
  const result = await Swal.fire({
    title: "Are you sure?",
    text: `Do you want to ${status} this application?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: status === "accepted" ? "#10B981" : "#EF4444",
    cancelButtonColor: "#6B7280",
    confirmButtonText: `Yes, ${status}!`,
    allowOutsideClick: false,
  });

  // 3️⃣ If cancelled → reopen modal (GOOD UX)
  if (!result.isConfirmed) {
    modalRef.current?.showModal();
    return;
  }

  try {
    setIsUpdating(true);

    // 4️⃣ API CALL
    await axiosSecure.patch(`/creators?email=${selectedCreator.email}`, {
      status,
    });

    console.log("UPDATED:", selectedCreator.email, status);

    // 5️⃣ Success feedback
    await Swal.fire({
      icon: "success",
      title: status === "accepted" ? "Accepted!" : "Rejected!",
      text: "Creator application updated successfully.",
      timer: 2000,
      showConfirmButton: false,
    });
    refetch()
  } catch (error) {
    console.error("Update failed:", error);

    // ❌ Error feedback
    Swal.fire({
      icon: "error",
      title: "Update Failed",
      text: "Something went wrong. Please try again.",
    });

    // Optional: reopen modal on error
    modalRef.current?.showModal();
  } finally {
    setIsUpdating(false);
  }
};



  /* ---------------- LOADING ---------------- */
  if (isLoading) {
    return <Loader/>
    
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 border-b pb-2">
        📥 Creator Applications{" "}
        <span className="text-primary">({creators.length})</span>
      </h1>

      {/* ---------------- TABLE ---------------- */}
      <div className="overflow-x-auto shadow-xl rounded-lg bg-white">
        <table className="table w-full">
          <thead className="bg-primary text-white">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {creators.map((creator, index) => (
              <tr key={creator._id} className="hover:bg-gray-50">
                <th>{index + 1}</th>
                <td className="font-medium">{creator.name}</td>
                <td>{creator.email}</td>
                <td>
                  <span
                    className={`${
                      creator.status === "accepted"
                        ? "badge badge-primary" : creator.status==='rejected' ?'badge badge-error text-white'
                        : "badge badge-warning font-semibold text-white"
                    }`}
                  >
                    {creator.status}
                  </span>
                </td>
                <td className="text-center">
                  <button
                    onClick={() => handleSeeApply(creator)}
                    className="btn btn-sm btn-info text-white"
                  >
                    See Application
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------------- MODAL ---------------- */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box w-11/12 max-w-3xl p-8">
          <h3 className="font-bold text-2xl text-primary mb-4 border-b pb-2">
            Application Details
          </h3>

          <div className="space-y-4">
            <Info label="Name" value={selectedCreator.name} />
            <Info label="Email" value={selectedCreator.email} />

            <div className="bg-white p-4 rounded-lg border">
              <p className="font-semibold mb-2">Reason</p>
              <blockquote className="italic text-gray-700">
                "{selectedCreator.reason}"
              </blockquote>
            </div>

            <div className="bg-white p-4 rounded-lg border">
              <p className="font-semibold mb-2">Portfolio</p>
              <p className="text-blue-600 underline">
                {selectedCreator.portfolio || "Not provided"}
              </p>
            </div>
          </div>

          <div className="modal-action gap-3 mt-6">
            <button
              onClick={() => handleUpdateStatus("rejected")}
              className="btn btn-error text-white"
              disabled={isUpdating}
            >
              ❌ Reject
            </button>

            <button
              onClick={() => handleUpdateStatus("accepted")}
              className="btn btn-success text-white"
              disabled={isUpdating}
            >
              ✅ Accept
            </button>

            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

/* ---------------- SMALL UI HELPER ---------------- */
const Info = ({ label, value }) => (
  <div className="flex justify-between bg-gray-100 p-3 rounded-lg">
    <span className="font-semibold">{label}:</span>
    <span>{value}</span>
  </div>
);

export default CreatorApply;
