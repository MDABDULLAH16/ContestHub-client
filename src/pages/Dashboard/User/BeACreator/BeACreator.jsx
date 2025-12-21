import React from "react";
import { useForm } from "react-hook-form";
import { Sparkles, Upload, User, Mail, FileText } from "lucide-react";
import { toast } from "react-toastify";
import { useAuth } from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const BeACreator = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const creatorData = {
      name: data.name,
      email: data.email,
      reason: data.reason,
      portfolio: data.portfolio,
      status: "pending",
    };

    try {
      const res = await axiosSecure.post("/creators", creatorData);
      if (res.data.insertedId) {
        toast.success("Application submitted successfully!");
        reset();
      }
    } catch (err) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4 transition-colors duration-500">
      <div className="max-w-xl mx-auto bg-base-100 shadow-2xl rounded-2xl p-8 border border-base-300/50">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-purple-500/10 rounded-2xl">
              <Sparkles className="h-10 w-10 text-purple-500" />
            </div>
          </div>
          <h1 className="text-3xl font-black text-base-content tracking-tight">
            Become a <span className="text-purple-500">Creator</span>
          </h1>
          <p className="text-base-content/60 mt-3 font-medium">
            Join our elite circle of creators. Admin will review your profile
            within 24-48 hours.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Full Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold opacity-70">Full Name</span>
            </label>
            <div className="flex items-center gap-3 bg-base-200 border border-base-300 rounded-2xl px-4 py-3 focus-within:border-purple-500 transition-all">
              <User className="w-5 text-purple-500/50" />
              <input
                type="text"
                defaultValue={user?.displayName}
                {...register("name", { required: "Name is required" })}
                placeholder="Your Name"
                className="w-full bg-transparent outline-none text-base-content placeholder:text-base-content/30"
              />
            </div>
            {errors.name && (
              <p className="text-error text-xs mt-2 font-bold ml-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold opacity-70">
                Email Address
              </span>
            </label>
            <div className="flex items-center gap-3 bg-base-200 border border-base-300 rounded-2xl px-4 py-3 focus-within:border-purple-500 transition-all opacity-80 cursor-not-allowed">
              <Mail className="w-5 text-purple-500/50" />
              <input
                type="email"
                value={user?.email}
                readOnly
                {...register("email")}
                className="w-full bg-transparent outline-none text-base-content/50 cursor-not-allowed"
              />
            </div>
          </div>

          {/* Why do you want to be a creator? */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold opacity-70">
                Motivation
              </span>
            </label>
            <div className="flex items-start gap-3 bg-base-200 border border-base-300 rounded-2xl px-4 py-3 focus-within:border-purple-500 transition-all">
              <FileText className="w-5 mt-1 text-purple-500/50" />
              <textarea
                {...register("reason", {
                  required: "Please explain your motivation",
                })}
                placeholder="What kind of contests do you want to create?"
                rows="4"
                className="w-full bg-transparent outline-none resize-none text-base-content placeholder:text-base-content/30"
              />
            </div>
            {errors.reason && (
              <p className="text-error text-xs mt-2 font-bold ml-1">
                {errors.reason.message}
              </p>
            )}
          </div>

          {/* Portfolio Link */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold opacity-70">
                Portfolio / Profile Link
              </span>
            </label>
            <div className="flex items-center gap-3 bg-base-200 border border-base-300 rounded-2xl px-4 py-3 focus-within:border-purple-500 transition-all">
              <Upload className="w-5 text-purple-500/50" />
              <input
                type="url"
                {...register("portfolio")}
                placeholder="https://behance.net/you"
                className="w-full bg-transparent outline-none text-base-content placeholder:text-base-content/30"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full rounded-2xl shadow-lg shadow-purple-500/20 text-white border-none bg-linear-to-r from-purple-600 to-indigo-600 hover:scale-[1.02] active:scale-95 transition-all font-black"
          >
            {isSubmitting ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Submit Application"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BeACreator;
