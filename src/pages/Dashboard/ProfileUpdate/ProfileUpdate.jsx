import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const ProfileUpdate = () => {
  const { user, updateProfileInfoInFirebase } = useAuth();
  const axiosSecure = useAxiosSecure();

  // 1. Fetch current DB user details
  const { data: dbUser, refetch } = useQuery({
    queryKey: ["users", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  // 2. Initialize React Hook Form
  // 'values' will re-sync the form whenever dbUser changes
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    values: {
      name: dbUser?.name || "",
      photoURL: dbUser?.photoURL || "",
      phone: dbUser?.phone || "",
      address: dbUser?.address || "",
      bio: dbUser?.bio || "",
    },
  });

  const onSubmit = async (data) => {
    try {
      // A. Update Firebase (Display Name & Photo URL)
      await updateProfileInfoInFirebase({ displayName: data.name, photoURL: data.photoURL });

      // B. Update MongoDB
      const updateData = {
        name: data.name,
        photoURL: data.photoURL,
        phone: data.phone,
        bio: data.bio,
        address: data.address,
      };

      const res = await axiosSecure.patch(`/users/${user?.email}`, updateData);

      if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
        // Trigger TanStack Query to refresh data across the app
        refetch();

        Swal.fire({
          icon: "success",
          title: "Profile Updated",
          text: "Your information has been saved successfully!",
          timer: 2000,
          showConfirmButton: false,
          background: "#fff",
          color: "#1e293b",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message,
      });
    }
  };

  return (
    <div className="max-w-2xl bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
      <h2 className="text-2xl font-black text-gray-900 mb-6">
        Profile Settings
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-tight">
            Full Name
          </label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all shadow-sm"
            placeholder="Your display name"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Photo URL Field */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-tight">
            Photo URL
          </label>
          <input
            type="text"
            {...register("photoURL", { required: "Photo URL is required" })}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none transition-all shadow-sm"
            placeholder="https://example.com/photo.jpg"
          />
          {errors.photoURL && (
            <p className="text-red-500 text-xs mt-1">
              {errors.photoURL.message}
            </p>
          )}
        </div>

        {/* Email (Read Only) */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-tight">
            Email Address
          </label>
          <input
            type="email"
            value={user?.email || ""}
            readOnly
            className="w-full px-4 py-3 border border-gray-100 rounded-xl bg-gray-50 text-gray-400 cursor-not-allowed outline-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Phone Field */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-tight">
              Phone Number
            </label>
            <input
              type="text"
              {...register("phone")}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none"
              placeholder="+880..."
            />
          </div>

          {/* Address Field */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-tight">
              Location / Address
            </label>
            <input
              type="text"
              {...register("address")}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none"
              placeholder="Dhaka, Bangladesh"
            />
          </div>
        </div>

        {/* Bio Field */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-tight">
            About You (Bio)
          </label>
          <textarea
            {...register("bio")}
            rows="4"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none resize-none"
            placeholder="Tell the community about your expertise..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 bg-slate-900 text-white rounded-2xl font-bold transition-all flex justify-center items-center gap-2 ${
            isSubmitting
              ? "opacity-70 cursor-not-allowed"
              : "hover:bg-indigo-600 shadow-lg shadow-indigo-100"
          }`}
        >
          {isSubmitting ? (
            <>
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Synchronizing Profile...
            </>
          ) : (
            "Save All Changes"
          )}
        </button>
      </form>
    </div>
  );
};

export default ProfileUpdate;
