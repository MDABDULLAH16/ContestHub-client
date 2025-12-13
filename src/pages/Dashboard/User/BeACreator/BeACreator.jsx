import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Sparkles, Upload, User, Mail, FileText } from "lucide-react";
 
import { toast } from "react-toastify";
 
import useAxiosSecure from './../../../../hooks/useAxiosSecure';

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
    console.log(data);
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
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center">
            <Sparkles className="h-12 w-12 text-purple-600" />
          </div>
          <h1 className="text-3xl font-semibold mt-3">
            Apply to Become a <span className="text-purple-600">Creator</span>
          </h1>
          <p className="text-gray-500 mt-2">
            Fill the form below to request creator access. Admin will review
            your profile.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
              <User className="w-5 text-gray-400" />
              <input
                type="text"
                defaultValue={user?.displayName}
                {...register("name", { required: "Name is required" })}
                placeholder="Enter your full name"
                className="w-full outline-none"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
              <Mail className="w-5 text-gray-400" />
              <input
                type="email"
                value={user?.email}
                {...register("email", { required: "Email is required" })}
                placeholder="Enter your email"
                className="w-full outline-none"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Why do you want to be a creator? */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Why do you want to be a creator?
            </label>
            <div className="flex items-start gap-2 border rounded-lg px-3 py-2">
              <FileText className="w-5 mt-1 text-gray-400" />
              <textarea
                {...register("reason", { required: "Please write something" })}
                placeholder="Explain your motivation..."
                rows="4"
                className="w-full outline-none resize-none"
              />
            </div>
            {errors.reason && (
              <p className="text-red-500 text-sm mt-1">
                {errors.reason.message}
              </p>
            )}
          </div>

          {/* Portfolio Link (Optional) */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Portfolio Link (Optional)
            </label>
            <div className="flex items-center gap-2 border rounded-lg px-3 py-2">
              <Upload className="w-5 text-gray-400" />
              <input
                type="text"
                {...register("portfolio")}
                placeholder="https://your-portfolio.com"
                className="w-full outline-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-purple-600 text-white py-3 rounded-xl shadow-md hover:bg-purple-700 transition font-medium"
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BeACreator;
