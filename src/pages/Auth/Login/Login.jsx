import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Mail, Lock, LogIn, User, ShieldCheck, PenTool } from "lucide-react";
import GoogleSignInButton from "../../../components/Buttons/GoogleSignInButton";
import { useAuth } from "../../../hooks/useAuth";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const { loginUser } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    setValue, // Added setValue to programmatically fill the form
    formState: { errors },
  } = useForm();

  const currentEmail = watch("email");

  // Helper function to fill demo credentials
  const fillDemoCredentials = (email, password) => {
    setValue("email", email);
    setValue("password", password);
    toast.info(`${email.split("@")[0].toUpperCase()} credentials loaded!`);
  };

  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password);
      toast.success("Welcome back!");

      if (data.remember) {
        localStorage.setItem("rememberMe", data.email);
      } else {
        localStorage.removeItem("rememberMe");
      }
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleForgotPassword = async () => {
    if (!currentEmail) {
      toast.warn("Please enter your email address first.");
      return;
    }
    toast.info("Password reset link sent to your email.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4 py-12 transition-colors duration-500">
      <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight italic">
              Welcome{" "}
              <span className="text-indigo-600 dark:text-indigo-400">Back</span>
            </h2>
          </div>

          {/* --- DEMO BUTTONS SECTION --- */}
          <div className="grid grid-cols-3 gap-2 mb-8">
            <button
              type="button"
              onClick={() =>
                fillDemoCredentials("admin@programming-hero.com", "asdfasdf")
              }
              className="flex flex-col items-center justify-center p-2 rounded-xl border border-dashed border-indigo-300 dark:border-indigo-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors group"
            >
              <ShieldCheck size={20} className="text-indigo-500 mb-1" />
              <span className="text-[10px] font-bold uppercase dark:text-slate-300">
                Admin
              </span>
            </button>
            <button
              type="button"
              onClick={() =>
                fillDemoCredentials("creator@contesthub.com", "asdfasdf")
              }
              className="flex flex-col items-center justify-center p-2 rounded-xl border border-dashed border-purple-300 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-900/30 transition-colors"
            >
              <PenTool size={20} className="text-purple-500 mb-1" />
              <span className="text-[10px] font-bold uppercase dark:text-slate-300">
                Creator
              </span>
            </button>
            <button
              type="button"
              onClick={() =>
                fillDemoCredentials("user@contesthub.com", "asdfasdf")
              }
              className="flex flex-col items-center justify-center p-2 rounded-xl border border-dashed border-emerald-300 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition-colors"
            >
              <User size={20} className="text-emerald-500 mb-1" />
              <span className="text-[10px] font-bold uppercase dark:text-slate-300">
                User
              </span>
            </button>
          </div>
          {/* --------------------------- */}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-2 ml-1">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none dark:text-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
                <input
                  type="checkbox"
                  {...register("remember")}
                  className="rounded border-slate-300 text-indigo-600"
                />
                Remember Me
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-linear-to-br from-indigo-500 to-purple-600 text-white font-black uppercase tracking-widest rounded-xl shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <LogIn size={18} /> Login Now
            </button>
          </form>

          {/* Footer UI... */}
          <div className="mt-8 text-center">
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-bold text-indigo-600 hover:underline"
              >
                Create Account
              </Link>
            </p>
          </div>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200 dark:border-slate-800"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-slate-900 px-4 text-slate-500">
                Or continue with
              </span>
            </div>
          </div>

          <GoogleSignInButton />
        </div>
      </div>
    </div>
  );
};

export default Login;
