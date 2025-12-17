import React from 'react';

const AppliedContestModal = ({ 
  setSelectedContest,
  handleStatusChange,
  selectedContest,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
      {/* Modal Header */}
      <div className="relative">
        <img
          src={selectedContest.image}
          alt="cover"
          className="w-full h-48 object-cover rounded-t-xl"
        />
        <button
          onClick={() => setSelectedContest(null)}
          className="absolute top-2 right-2 btn btn-circle btn-sm btn-error text-white"
        >
          ✕
        </button>
      </div>

      {/* Modal Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800">
          {selectedContest.name}
        </h3>
        <p className="text-gray-500 text-sm mb-4">
          Submitted by: {selectedContest.creator}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-3 bg-gray-100 rounded-lg">
            <p className="font-semibold text-gray-700">Contest Description</p>
            <p className="text-sm text-gray-600 mt-1">
              {selectedContest.description}
            </p>
          </div>
          <div className="p-3 bg-gray-100 rounded-lg">
            <p className="font-semibold text-gray-700 mb-2">
              Task Instructions
            </p>

            {/* Render as a numbered list */}
            <ol className="list-decimal list-inside text-sm text-gray-600 space-y-2">
              {selectedContest.taskInstruction
                .split("\n")
                .map((instruction, index) => {
                  // detailed check to ensure we don't render empty lines
                  if (!instruction.trim()) return null;

                  return (
                    <li key={index} className="leading-relaxed">
                      {instruction}
                    </li>
                  );
                })}
            </ol>
          </div>
        </div>

        {/* Action Buttons inside Modal */}
        {selectedContest.status === "pending" && (
          <div className="flex justify-end gap-3 mt-6 border-t pt-4">
            <button
              onClick={() => handleStatusChange(selectedContest, "rejected")}
              className="btn btn-error text-white"
            >
             Delete
            </button>
            <button
              onClick={() => handleStatusChange(selectedContest, "rejected")}
              className="btn btn-warning text-white"
            >
              Reject Contest
            </button>
            <button
              onClick={() => handleStatusChange(selectedContest, "accepted")}
              className="btn inline-flex items-center gap-2 px-4 py-2
              bg-linear-to-r from-indigo-600 to-purple-600
              text-white rounded-lg text-sm font-medium
              hover:shadow-lg transition"
            >
              Approve Contest
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppliedContestModal;