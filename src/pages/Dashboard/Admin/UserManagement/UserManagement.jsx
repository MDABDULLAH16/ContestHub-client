import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loader from "../../../../components/Loader/Loader";
import { ShieldCheck, User, Palette, Search, Mail } from "lucide-react";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleRoleChange = (user, newRole) => {
    Swal.fire({
      title: `<span class="text-base-content">Promote to ${newRole}?</span>`,
      html: `<p class="text-sm opacity-70">Update permissions for <b>${user.name}</b>?</p>`,
      icon: "question",
      showCancelButton: true,
      background: "#1e293b", // Dark mode friendly background for Swal
      confirmButtonColor: "#6366f1",
      cancelButtonColor: "#334155",
      confirmButtonText: "Yes, Update Role",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(
            `/users/${user._id}/role?email=${user.email}`,
            {
              role: newRole,
            }
          );

          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Updated!",
              icon: "success",
              background: "#1e293b",
              color: "#fff",
              timer: 1500,
              showConfirmButton: false,
            });
            refetch();
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Access Denied",
            text: error.response?.data?.message || "An error occurred.",
            background: "#1e293b",
            color: "#fff",
          });
        }
      }
    });
  };

  if (isLoading) return <Loader />;

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-base-content uppercase italic">
            User <span className="text-indigo-500">Directory</span>
          </h1>
          <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.3em] mt-1">
            Permission Management & Security Audit
          </p>
        </div>
        <div className="relative w-full md:w-64">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30"
          />
          <input
            type="text"
            placeholder="SEARCH BY EMAIL..."
            className="input input-sm input-bordered w-full pl-10 bg-base-100 border-base-300 rounded-xl text-[10px] font-black uppercase tracking-widest focus:border-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* User Table Container */}
      <div className="bg-base-100 rounded-2xl border border-base-300 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            {/* Table Head */}
            <thead className="bg-base-200/50">
              <tr className="border-b border-base-300 text-base-content/40 uppercase text-[10px] font-black tracking-[0.2em]">
                <th className="py-6 px-8 text-indigo-500">Identity Details</th>
                <th className="text-center">Current Status</th>
                <th className="text-center">Modify Access Level</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr
                  key={user._id}
                  className="border-b border-base-300/50 hover:bg-indigo-600/5 transition-colors group"
                >
                  <td className="py-5 px-8">
                    <div className="flex items-center gap-4">
                      <div className="avatar placeholder">
                        <div className="bg-indigo-600/10 text-indigo-500 rounded-2xl w-12 border border-indigo-600/20 group-hover:scale-105 transition-transform duration-300">
                          {user.photoURL ? (
                            <img src={user.photoURL} alt={user.name} />
                          ) : (
                            <span className="text-lg font-black">
                              {user.name?.charAt(0)}
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <div className="font-black text-sm uppercase tracking-tight text-base-content">
                          {user.name}
                        </div>
                        <div className="text-[10px] font-bold opacity-40 uppercase tracking-tighter flex items-center gap-1">
                          <Mail size={10} /> {user.email}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="text-center">
                    <span
                      className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest inline-flex items-center gap-2 border ${
                        user.role === "admin"
                          ? "bg-rose-500/10 text-rose-500 border-rose-500/20"
                          : user.role === "creator"
                          ? "bg-indigo-500/10 text-indigo-500 border-indigo-500/20"
                          : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                      }`}
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          user.role === "admin"
                            ? "bg-rose-500"
                            : user.role === "creator"
                            ? "bg-indigo-500"
                            : "bg-emerald-500"
                        }`}
                      ></div>
                      {user.role || "user"}
                    </span>
                  </td>

                  <td className="text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleRoleChange(user, "user")}
                        disabled={user.role === "user"}
                        className="btn btn-xs bg-base-200 border-base-300 hover:bg-emerald-500 hover:text-white text-[9px] font-black uppercase rounded-lg disabled:opacity-20 transition-all duration-300"
                      >
                        <User size={12} className="mr-1" /> Set User
                      </button>

                      <button
                        onClick={() => handleRoleChange(user, "creator")}
                        disabled={user.role === "creator"}
                        className="btn btn-xs bg-base-200 border-base-300 hover:bg-indigo-500 hover:text-white text-[9px] font-black uppercase rounded-lg disabled:opacity-20 transition-all duration-300"
                      >
                        <Palette size={12} className="mr-1" /> Set Creator
                      </button>

                      <button
                        onClick={() => handleRoleChange(user, "admin")}
                        disabled={user.role === "admin"}
                        className="btn btn-xs bg-base-200 border-base-300 hover:bg-rose-500 hover:text-white text-[9px] font-black uppercase rounded-lg disabled:opacity-20 transition-all duration-300"
                      >
                        <ShieldCheck size={12} className="mr-1" /> Set Admin
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
