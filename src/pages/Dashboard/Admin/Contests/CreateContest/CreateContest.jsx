import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from "../../../../../hooks/useAuth";
import useAxiosSecure from "../../../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const IMGBB_API_KEY = import.meta.env.VITE_ImageBB_api;

const CreateContest = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  // Image Upload to imgbb
  const handleImageUpload = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
      {
        method: "POST",
        body: formData,
      }
    );

      const data = await res.json();
      console.log(data);
      
    setUploading(false);

    if (data.success) {
      setValue("image", data.data.display_url);
      setImagePreview(data.data.display_url);
    }
  };

const onSubmit = (data) => {
  const finalType =
    data.contestType === "custom" ? data.customContestType : data.contestType;

  const payload = {
      ...data,
      creator:user?.email,
    contestType: finalType,
  };

  delete payload.customContestType;

    axiosSecure.post("/create-contest", payload).then(res => {
      if (res.data.insertedId) {
        toast.success('Your Contest Created successful & waiting for review')
      }
    }).catch(err => {
      toast.error(err.message)
  });
};


  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Create New Contest</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Contest Name */}
        <div>
          <label className="label">Contest Name</label>
          <input
            type="text"
            className="input input-bordered w-full"
            {...register("name", { required: true })}
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="label">Contest Image</label>
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered w-full"
            onChange={(e) => handleImageUpload(e.target.files[0])}
          />
          {uploading && <p className="text-sm">Uploading...</p>}
          {imagePreview && (
            <img
              src={imagePreview}
              alt="preview"
              className="mt-3 h-32 rounded-lg object-cover"
            />
          )}
          <input type="hidden" {...register("image", { required: true })} />
        </div>

        {/* Entry Price */}
        <div>
          <label className="label">Entry Price</label>
          <input
            type="number"
            className="input input-bordered w-full"
            {...register("entryPrice", { required: true, min: 0 })}
          />
        </div>

        {/* Prize Money */}
        <div>
          <label className="label">Prize Money</label>
          <input
            type="number"
            className="input input-bordered w-full"
            {...register("prizeMoney", { required: true, min: 1 })}
          />
        </div>

        {/* Contest Type */}
        <div>
          <label className="label">Contest Type</label>

          <select
            className="select select-bordered w-full"
            {...register("contestType", { required: true })}
          >
            <option value="">Select type</option>
            <option value="coding">Coding</option>
            <option value="design">Design</option>
            <option value="quiz">Quiz</option>
            <option value="custom">Custom</option>
          </select>
        </div>

        {/* Show only when Custom selected */}
        {watch("contestType") === "custom" && (
          <div>
            <label className="label">Custom Contest Type</label>
            <input
              type="text"
              placeholder="e.g. Photography, Writing"
              className="input input-bordered w-full"
              {...register("customContestType", {
                required: "Please enter custom contest type",
              })}
            />
          </div>
        )}

        {/* Start Date */}
        <div>
          <label className="label">Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setValue("startDate", date)}
            showTimeSelect
            className="input input-bordered w-full"
            dateFormat="Pp"
            placeholderText="Contest start"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="label">End Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setValue("endDate", date)}
            minDate={startDate}
            showTimeSelect
            className="input input-bordered w-full"
            dateFormat="Pp"
            placeholderText="Contest deadline"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="label">Description</label>
          <textarea
            className="textarea textarea-bordered w-full"
            {...register("description", { required: true })}
          />
        </div>

        {/* Task Instruction */}
        <div className="md:col-span-2">
          <label className="label">Task Instruction</label>
          <textarea
            className="textarea textarea-bordered w-full"
            {...register("taskInstruction", { required: true })}
          />
        </div>

        {/* Submit */}
        <div className="md:col-span-2 flex justify-end">
          <button disabled={uploading} className="btn btn-primary px-10">
            Create Contest
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateContest;
