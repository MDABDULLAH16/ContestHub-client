import React from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  Trash2,
  XCircle,
  CheckCircle,
  Info,
  ListChecks,
  Mail,
} from "lucide-react";

const AppliedContestModal = ({
  setSelectedContest,
  selectedContest,
  refetch,
}) => {
  const axiosSecure = useAxiosSecure();

  const handleStatusChange = async (id, status) => {
    try {
      const res = await axiosSecure.patch(
        `/applied-contest/${id}?status=${status}`
      );

      if (res.data.modifiedCount > 0) {
        if (status === "rejected") {
          toast.error(`The contest has been rejected.`);
        } else {
          toast.success(`The contest has been ${status}.`);
        }
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
      title: `<span class="text-base-content uppercase font-black">Permanent Delete?</span>`,
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      background: "#1e293b",
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#334155",
      confirmButtonText: "Yes, Delete It",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/applied-contest/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            icon: "success",
            background: "#1e293b",
            color: "#fff",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
          setSelectedContest(null);
        }
      }
    });
  };

  return (
    <div className="bg-base-100 rounded-[2.5rem] border border-base-300 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto overflow-x-hidden relative">
      {/* Modal Header/Image */}
      <div className="relative group">
        <img
          src={selectedContest.image}
          alt="cover"
          className="w-full h-56 object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-base-100 via-transparent to-transparent opacity-60"></div>
        <button
          onClick={() => setSelectedContest(null)}
          className="absolute top-4 right-4 btn btn-circle btn-sm bg-base-100/20 backdrop-blur-md border-none text-white hover:bg-rose-500 transition-all shadow-xl"
        >
          ✕
        </button>
      </div>

      {/* Modal Content */}
      <div className="p-8 -mt-10 relative z-10 bg-base-100 rounded-t-[2.5rem]">
        <div className="mb-6">
          <h3 className="text-3xl font-black text-base-content uppercase italic tracking-tighter">
            {selectedContest.name}
          </h3>
          <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.2em] flex items-center gap-2 mt-2">
            <Mail size={12} className="text-indigo-500" /> Submitted by:{" "}
            {selectedContest.creator}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Description Block */}
          <div className="p-5 bg-base-200 rounded-2xl border border-base-300 relative">
            <div className="flex items-center gap-2 mb-3 text-indigo-500">
              <Info size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Description
              </span>
            </div>
            <p className="text-xs text-base-content/70 leading-relaxed italic">
              {selectedContest.description}
            </p>
          </div>

          {/* Instructions Block */}
          <div className="p-5 bg-base-200 rounded-2xl border border-base-300 relative">
            <div className="flex items-center gap-2 mb-3 text-emerald-500">
              <ListChecks size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Guidelines
              </span>
            </div>

            {selectedContest?.taskInstruction ? (
              <ol className="text-[11px] text-base-content/70 space-y-2 list-none">
                {(selectedContest.taskInstruction || "")
                  .split("\n")
                  .map((instruction, index) => {
                    if (!instruction.trim()) return null;
                    return (
                      <li key={index} className="flex gap-2 leading-relaxed">
                        <span className="text-emerald-500 font-bold">•</span>
                        {instruction}
                      </li>
                    );
                  })}
              </ol>
            ) : (
              <p className="text-[11px] opacity-30 italic">
                No specific instructions provided.
              </p>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap justify-between items-center gap-4 pt-6 border-t border-base-300">
          <button
            onClick={() => handleDeleteContest(selectedContest._id)}
            className="btn btn-ghost hover:bg-rose-500/10 text-rose-500 font-black uppercase text-[10px] tracking-widest px-6"
          >
            <Trash2 size={16} className="mr-1" /> Remove
          </button>

          <div className="flex gap-3">
            <button
              onClick={() =>
                handleStatusChange(selectedContest._id, "rejected")
              }
              className="btn bg-base-200 border-base-300 hover:bg-amber-500/10 text-amber-500 hover:text-amber-500 font-black uppercase text-[10px] tracking-widest px-6"
            >
              <XCircle size={16} className="mr-1" /> Reject
            </button>

            <button
              onClick={() =>
                handleStatusChange(selectedContest._id, "accepted")
              }
              className="btn bg-indigo-600 hover:bg-indigo-700 text-white border-none font-black uppercase text-[10px] tracking-widest px-8 shadow-lg shadow-indigo-600/20"
            >
              <CheckCircle size={16} className="mr-1" /> Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppliedContestModal;
