import React, { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Loader from "../../../../components/Loader/Loader";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import {
  Inbox,
  FileText,
  CheckCircle,
  XCircle,
  ExternalLink,
  UserCheck,
} from "lucide-react";

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

  const {
    data: creators = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["creators"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/creators`);
      return res.data;
    },
  });

  const handleSeeApply = (creator) => {
    setSelectedCreator(creator);
    modalRef.current?.showModal();
  };

  const handleUpdateStatus = async (status) => {
    modalRef.current?.close();
    await new Promise((r) => setTimeout(r, 50));

    const result = await Swal.fire({
      title: `<span class="text-base-content uppercase font-black">Confirm ${status}?</span>`,
      text: `Change application status for ${selectedCreator.name}?`,
      icon: "warning",
      showCancelButton: true,
      background: "#1e293b",
      confirmButtonColor: status === "accepted" ? "#10B981" : "#EF4444",
      cancelButtonColor: "#334155",
      confirmButtonText: `Yes, ${status}!`,
    });

    if (!result.isConfirmed) {
      modalRef.current?.showModal();
      return;
    }

    try {
      setIsUpdating(true);
      await axiosSecure.patch(`/creators?email=${selectedCreator.email}`, {
        status,
      });

      await Swal.fire({
        icon: "success",
        title: "Database Updated",
        background: "#1e293b",
        color: "#fff",
        timer: 1500,
        showConfirmButton: false,
      });
      refetch();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Action Failed",
        background: "#1e293b",
        color: "#fff",
      });
      modalRef.current?.showModal();
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-base-content uppercase italic">
            Creator <span className="text-indigo-500">Applications</span>
          </h1>
          <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.3em] mt-1">
            Reviewing {creators.length} pending requests
          </p>
        </div>
        <div className="p-3 bg-base-100 border border-base-300 rounded-2xl shadow-lg">
          <Inbox size={20} className="text-indigo-500" />
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-base-100 rounded-2xl border border-base-300 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200/50">
              <tr className="border-b border-base-300 text-base-content/40 uppercase text-[10px] font-black tracking-widest">
                <th className="py-6 px-8">#</th>
                <th>Applicant</th>
                <th>Status</th>
                <th className="text-center">Review</th>
              </tr>
            </thead>
            <tbody>
              {creators.map((creator, index) => (
                <tr
                  key={creator._id}
                  className="border-b border-base-300/50 hover:bg-indigo-600/5 transition-all group"
                >
                  <th className="px-8 opacity-30 text-xs">{index + 1}</th>
                  <td>
                    <div className="flex flex-col">
                      <span className="font-black text-sm uppercase text-base-content">
                        {creator.name}
                      </span>
                      <span className="text-[10px] font-bold opacity-40 lowercase">
                        {creator.email}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span
                      className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest flex items-center w-fit gap-2 border ${
                        creator.status === "accepted"
                          ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                          : creator.status === "rejected"
                          ? "bg-rose-500/10 text-rose-500 border-rose-500/20"
                          : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          creator.status === "accepted"
                            ? "bg-emerald-500"
                            : creator.status === "rejected"
                            ? "bg-rose-500"
                            : "bg-amber-500 animate-pulse"
                        }`}
                      ></div>
                      {creator.status}
                    </span>
                  </td>
                  <td className="text-center">
                    <button
                      onClick={() => handleSeeApply(creator)}
                      className="btn btn-sm bg-indigo-600/10 hover:bg-indigo-600 text-indigo-500 hover:text-white border-none rounded-xl text-[10px] font-black uppercase tracking-widest transition-all px-4"
                    >
                      <FileText size={14} className="mr-1" /> View Dossier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL */}
      <dialog ref={modalRef} className="modal backdrop-blur-md">
        <div className="modal-box bg-base-100 border border-base-300 rounded-[2.5rem] p-10 max-w-3xl shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-indigo-600/10 text-indigo-500 rounded-2xl">
              <UserCheck size={24} />
            </div>
            <h3 className="font-black text-2xl uppercase tracking-tighter text-base-content">
              Applicant <span className="text-indigo-500">Portfolio</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Info label="Full Name" value={selectedCreator.name} />
            <Info label="Email Address" value={selectedCreator.email} />
          </div>

          <div className="space-y-6">
            <div className="bg-base-200 p-6 rounded-2xl border border-base-300 relative">
              <span className="absolute -top-3 left-6 bg-indigo-600 text-white text-[8px] font-black uppercase px-3 py-1 rounded-full">
                Reasoning
              </span>
              <p className="text-sm italic text-base-content leading-relaxed opacity-80">
                "{selectedCreator.reason}"
              </p>
            </div>

            <div className="bg-base-200 p-6 rounded-2xl border border-base-300 relative group overflow-hidden">
              <span className="absolute -top-3 left-6 bg-emerald-600 text-white text-[8px] font-black uppercase px-3 py-1 rounded-full">
                Portfolio Link
              </span>
              <a
                href={selectedCreator.portfolio}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-indigo-500 font-bold hover:underline"
              >
                {selectedCreator.portfolio || "No Link Provided"}{" "}
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          <div className="modal-action gap-3 mt-10">
            <button
              onClick={() => handleUpdateStatus("rejected")}
              className="btn bg-rose-500/10 hover:bg-rose-500 text-rose-500 hover:text-white border-none rounded-xl font-black uppercase text-[10px] tracking-widest px-6"
              disabled={isUpdating}
            >
              <XCircle size={16} className="mr-1" /> Reject
            </button>

            <button
              onClick={() => handleUpdateStatus("accepted")}
              className="btn bg-emerald-500 hover:bg-emerald-600 text-white border-none rounded-xl font-black uppercase text-[10px] tracking-widest px-8 shadow-lg shadow-emerald-500/20"
              disabled={isUpdating}
            >
              <CheckCircle size={16} className="mr-1" /> Approve Creator
            </button>

            <form method="dialog">
              <button className="btn btn-ghost rounded-xl font-black text-[10px] uppercase opacity-40">
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

const Info = ({ label, value }) => (
  <div className="flex flex-col bg-base-200 p-4 rounded-2xl border border-base-300">
    <span className="text-[9px] font-black uppercase opacity-30 tracking-widest mb-1">
      {label}
    </span>
    <span className="font-bold text-sm text-base-content truncate">
      {value}
    </span>
  </div>
);

export default CreatorApply;
