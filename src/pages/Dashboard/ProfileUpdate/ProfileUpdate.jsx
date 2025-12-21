import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  Save,
  User,
  Image as ImageIcon,
  Mail,
  Phone,
  MapPin,
  AlignLeft,
  Globe,
  Camera,
} from "lucide-react";

const ProfileUpdate = () => {
  const { user, updateProfileInfoInFirebase } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: dbUser, refetch } = useQuery({
    queryKey: ["users", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    watch,
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

  // Watch fields for live preview
  const watchAll = watch();

  const onSubmit = async (data) => {
    try {
      await updateProfileInfoInFirebase({
        displayName: data.name,
        photoURL: data.photoURL,
      });

      const updateData = {
        name: data.name,
        photoURL: data.photoURL,
        phone: data.phone,
        bio: data.bio,
        address: data.address,
      };

      const res = await axiosSecure.patch(`/users/${user?.email}`, updateData);

      if (res.data.modifiedCount > 0 || res.data.matchedCount > 0) {
        refetch();
        Swal.fire({
          icon: "success",
          title: "Profile Synced",
          text: "Your changes are now live across the platform!",
          timer: 2000,
          showConfirmButton: false,
          background:
            document.documentElement.getAttribute("data-theme") === "dark"
              ? "#1d232a"
              : "#fff",
          color:
            document.documentElement.getAttribute("data-theme") === "dark"
              ? "#a6adbb"
              : "#1e293b",
        });
      }
    } catch (error) {
      Swal.fire({ icon: "error", title: "Update Failed", text: error.message });
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 transition-colors duration-500">
      {/* FORM SECTION */}
      <div className="xl:col-span-2 order-2 xl:order-1">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-500">
            <User size={28} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-base-content tracking-tight">
              Personal Details
            </h2>
            <p className="text-base-content/50 text-sm font-medium">
              Update your identity and contact info
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="form-control">
              <label className="label font-black text-[10px] tracking-widest opacity-50 uppercase">
                Full Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30"
                  size={18}
                />
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="input input-bordered w-full bg-base-200 border-base-300 rounded-2xl pl-12 h-14 font-bold focus:ring-2 focus:ring-indigo-500/20 transition-all"
                  placeholder="John Doe"
                />
              </div>
              {errors.name && (
                <span className="text-error text-xs mt-1 font-bold">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Photo URL */}
            <div className="form-control">
              <label className="label font-black text-[10px] tracking-widest opacity-50 uppercase">
                Avatar URL
              </label>
              <div className="relative">
                <ImageIcon
                  className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30"
                  size={18}
                />
                <input
                  type="text"
                  {...register("photoURL", { required: "URL is required" })}
                  className="input input-bordered w-full bg-base-200 border-base-300 rounded-2xl pl-12 h-14 font-bold"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Phone */}
            <div className="form-control">
              <label className="label font-black text-[10px] tracking-widest opacity-50 uppercase">
                Phone Number
              </label>
              <div className="relative">
                <Phone
                  className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30"
                  size={18}
                />
                <input
                  type="text"
                  {...register("phone")}
                  className="input input-bordered w-full bg-base-200 border-base-300 rounded-2xl pl-12 h-14 font-bold"
                  placeholder="+1 234..."
                />
              </div>
            </div>

            {/* Address (RE-ADDED) */}
            <div className="form-control">
              <label className="label font-black text-[10px] tracking-widest opacity-50 uppercase">
                Location / Address
              </label>
              <div className="relative">
                <MapPin
                  className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30"
                  size={18}
                />
                <input
                  type="text"
                  {...register("address")}
                  className="input input-bordered w-full bg-base-200 border-base-300 rounded-2xl pl-12 h-14 font-bold"
                  placeholder="New York, USA"
                />
              </div>
            </div>
          </div>

          {/* Email (Disabled) */}
          <div className="form-control">
            <label className="label font-black text-[10px] tracking-widest opacity-50 uppercase">
              Email (Verified)
            </label>
            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30"
                size={18}
              />
              <input
                type="email"
                value={user?.email || ""}
                disabled
                className="input input-bordered w-full bg-base-300/50 border-base-300 rounded-2xl pl-12 h-14 font-bold italic opacity-60 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="form-control">
            <label className="label font-black text-[10px] tracking-widest opacity-50 uppercase">
              Professional Bio
            </label>
            <div className="relative">
              <AlignLeft
                className="absolute left-4 top-6 opacity-30"
                size={18}
              />
              <textarea
                {...register("bio")}
                rows="4"
                className="textarea textarea-bordered w-full bg-base-200 border-base-300 rounded-2xl pl-12 pt-5 font-bold text-base resize-none focus:ring-2 focus:ring-indigo-500/20"
                placeholder="Tell us about your creative journey..."
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full rounded-2xl font-black shadow-xl shadow-indigo-500/20 h-14 text-lg border-none"
          >
            {isSubmitting ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <span className="flex items-center gap-2">
                <Save size={20} /> Update Profile
              </span>
            )}
          </button>
        </form>
      </div>

      {/* PREVIEW SECTION (DESKTOP) */}
      <div className="xl:col-span-1 order-1 xl:order-2">
        <div className="sticky top-10">
          <p className="text-[10px] font-black tracking-[0.2em] opacity-30 mb-4 uppercase text-center xl:text-left">
            Card Preview
          </p>
          <div className="bg-base-200/50 rounded-[2.5rem] p-6 border border-base-300 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-[50px] rounded-full"></div>

            <div className="relative flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-2xl overflow-hidden ring-4 ring-indigo-500/20 shadow-xl mb-4 relative">
                <img
                  src={
                    watchAll.photoURL ||
                    "https://i.ibb.co.com/B203KXC7/man2.png"
                  }
                  alt="preview"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Camera size={20} className="text-white" />
                </div>
              </div>

              <h3 className="text-xl font-black truncate max-w-full">
                {watchAll.name || "User Name"}
              </h3>
              <p className="text-xs font-bold opacity-40 mb-4 truncate w-full">
                {user?.email}
              </p>

              <div className="grid grid-cols-2 gap-2 w-full mb-4">
                <div className="bg-base-100 p-2 rounded-xl border border-base-300">
                  <Globe size={14} className="mx-auto mb-1 text-indigo-500" />
                  <p className="text-[9px] font-black uppercase tracking-tighter truncate">
                    {watchAll.address || "Remote"}
                  </p>
                </div>
                <div className="bg-base-100 p-2 rounded-xl border border-base-300">
                  <Phone size={14} className="mx-auto mb-1 text-purple-500" />
                  <p className="text-[9px] font-black uppercase tracking-tighter truncate">
                    {watchAll.phone || "No Link"}
                  </p>
                </div>
              </div>

              <p className="text-[11px] font-medium italic opacity-60 leading-tight line-clamp-3">
                "
                {watchAll.bio ||
                  "Creative mind ready for the next challenge..."}
                "
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUpdate;
