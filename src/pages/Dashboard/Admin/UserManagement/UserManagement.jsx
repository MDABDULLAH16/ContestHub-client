import React from "react";
import { useQuery } from "@tanstack/react-query";
 import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Loader from "../../../../components/Loader/Loader";
 

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch all users
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
    // Confirmation with Swal
    Swal.fire({
      title: `Make this user an ${newRole}?`,
      text: `Are you sure you want to change ${user.name}'s role to ${newRole}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/users/${user._id}/role?email=${user.email}`, {
            role: newRole,
          });

          if (res.data.modifiedCount > 0) {
            Swal.fire({
              title: "Updated!",
              text: `User is now an ${newRole}.`,
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            refetch(); // Refresh the table
          }
        } catch (error) {
          Swal.fire(error.response?.data?.message || "An error occurred.", "", "error");
        }
      }
    });
  };

  if (isLoading) return <Loader />;

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
        <p className="text-gray-500">
          Manage permissions and roles for all registered users.
        </p>
      </div>

      <div className="overflow-x-auto bg-white rounded-2xl shadow-sm border border-gray-100">
        <table className="table w-full">
          <thead>
            <tr className="bg-gray-50">
              <th>User info</th>
              <th>Current Role</th>
              <th className="text-center">Change Role To</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="hover:bg-gray-50/50 transition-colors"
              >
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar placeholder">
                      <div className="bg-neutral text-neutral-content rounded-full w-10">
                        <span>{user.name?.charAt(0)}</span>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                      <div className="text-sm opacity-50">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span
                    className={`badge badge-sm font-bold uppercase ${
                      user.role === "admin"
                        ? "badge-error"
                        : user.role === "creator"
                        ? "badge-primary"
                        : "badge-ghost"
                    }`}
                  >
                    {user.role || "user"}
                  </span>
                </td>
                <td>
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => handleRoleChange(user, "user")}
                      disabled={user.role === "user"}
                      className="btn btn-xs btn-outline"
                    >
                      User
                    </button>

                    <button
                      onClick={() => handleRoleChange(user, "creator")}
                      disabled={user.role === "creator"}
                      className="btn btn-xs btn-outline btn-primary"
                    >
                      Creator
                    </button>

                    <button
                      onClick={() => handleRoleChange(user, "admin")}
                      disabled={user.role === "admin"}
                      className="btn btn-xs btn-outline btn-error"
                    >
                      Admin
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
