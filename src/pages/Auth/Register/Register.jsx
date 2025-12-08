import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../../hooks/useAuth";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
 
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
// make sure Firebase is initialized

const Register = () => {
  const { createUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      // Upload image to imgbb
      let imageUrl = "";
      if (data.image[0]) {
        const formData = new FormData();
        formData.append("image", data.image[0]);
        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=18aaf6727c3f7377a5a05fbda4b01cc3`,
          {
            method: "POST",
            body: formData,
          }
        );
        const result = await res.json();
        console.log({ result });

        imageUrl = result.data.display_url;
      }

      // Create user in Firebase
      const userCredential = await createUser(data.email, data.password);
      

      // Update user profile
      await updateProfile(userCredential.user, {
        displayName: data.name,
        photoURL: imageUrl,
        phoneNumber: data.phone,
      }).then(() => {
        const dbUser = {
          name: data.name,
          email: data.email,
          phone: data.phone,
          photoURL: imageUrl,
        };

        axiosSecure
          .post("/users", dbUser)
          .then((res) => {
            toast.success(res?.data.message);
          })
          .catch((err) => {
            console.error("Error saving user to DB", err);
          });
      });
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Preview image before upload
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email",
                },
              })}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1 font-medium">Phone</label>
            <input
              type="tel"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10,14}$/,
                  message: "Invalid phone number",
                },
              })}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-1 font-medium">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              onChange={handleImageChange}
              className="w-full"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 w-24 h-24 object-cover rounded-full"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <div>
          login page link <Link to="/login">Login</Link>{" "}
        </div>
      </div>
    </div>
  );
};

export default Register;
