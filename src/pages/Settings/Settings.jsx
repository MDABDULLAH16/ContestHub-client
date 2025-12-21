import {
  Settings as SettingsIcon,
  Bell,
  Lock,
  User,
  LogOut,
  ShieldCheck,
  BellRing,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router";
import ProfileUpdate from "../Dashboard/ProfileUpdate/ProfileUpdate";

const Settings = () => {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const settingsTabs = [
    { id: "profile", label: "Profile Settings", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Lock },
  ];

  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-base-content flex items-center gap-3 tracking-tighter">
              <SettingsIcon size={36} className="text-indigo-500" />
              Settings
            </h1>
            <p className="text-base-content/60 mt-1 font-medium">
              Manage your professional account and preferences
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-base-100 rounded-3xl shadow-xl border border-base-300 overflow-hidden sticky top-24">
              <div className="p-2 space-y-1">
                {settingsTabs.map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full text-left px-4 py-3.5 rounded-2xl flex items-center gap-3 transition-all duration-300 ${
                        isActive
                          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                          : "text-base-content/70 hover:bg-base-200 hover:text-base-content"
                      }`}
                    >
                      <Icon
                        size={20}
                        className={isActive ? "animate-pulse" : ""}
                      />
                      <span className="font-bold tracking-tight">
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="p-2 border-t border-base-300 mt-2">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-3.5 flex items-center gap-3 text-error hover:bg-error/10 transition-colors rounded-2xl font-bold"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-base-100 rounded-[2.5rem] shadow-xl border border-base-300 p-6 md:p-10 min-h-[600px]">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <ProfileUpdate />
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-500">
                      <BellRing size={28} />
                    </div>
                    <h2 className="text-3xl font-black text-base-content tracking-tight">
                      Notifications
                    </h2>
                  </div>

                  <div className="grid gap-4">
                    {[
                      "Email notifications for new contests",
                      "Email when you win a contest",
                      "Marketing and promotional emails",
                      "Contest deadline reminders",
                    ].map((item, index) => (
                      <label
                        key={index}
                        className="flex items-center justify-between p-5 bg-base-200 hover:bg-base-300/50 rounded-2xl cursor-pointer transition-all border border-transparent hover:border-base-300 group"
                      >
                        <span className="text-base-content/80 font-bold group-hover:text-base-content transition-colors">
                          {item}
                        </span>
                        <input
                          type="checkbox"
                          defaultChecked
                          className="checkbox checkbox-primary checkbox-md rounded-lg"
                        />
                      </label>
                    ))}
                  </div>

                  <button className="btn btn-primary rounded-2xl px-8 font-black shadow-lg shadow-indigo-500/20">
                    Save Preferences
                  </button>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === "security" && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-10">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-error/10 rounded-2xl text-error">
                      <ShieldCheck size={28} />
                    </div>
                    <h2 className="text-3xl font-black text-base-content tracking-tight">
                      Security Settings
                    </h2>
                  </div>

                  <div className="max-w-md space-y-6">
                    <h3 className="text-lg font-black text-base-content/60 uppercase tracking-widest">
                      Change Password
                    </h3>

                    {[
                      { label: "Current Password", placeholder: "••••••••" },
                      { label: "New Password", placeholder: "••••••••" },
                      { label: "Confirm Password", placeholder: "••••••••" },
                    ].map((field, idx) => (
                      <div key={idx} className="form-control w-full">
                        <label className="label">
                          <span className="label-text font-bold opacity-70">
                            {field.label}
                          </span>
                        </label>
                        <input
                          type="password"
                          placeholder={field.placeholder}
                          className="input input-bordered bg-base-200 border-base-300 rounded-2xl focus:border-indigo-500 focus:outline-none h-14 font-medium"
                        />
                      </div>
                    ))}

                    <button className="btn btn-primary w-full rounded-2xl font-black shadow-lg shadow-indigo-500/20 h-14">
                      Update Password
                    </button>
                  </div>

                  <div className="pt-10 border-t border-base-300">
                    <h3 className="text-xl font-black text-base-content mb-2 flex items-center gap-2">
                      2FA Authentication
                      <span className="badge badge-sm badge-ghost opacity-50 font-bold">
                        Recommended
                      </span>
                    </h3>
                    <p className="text-base-content/60 font-medium mb-6">
                      Add an extra layer of security to your account by
                      requiring more than just a password to log in.
                    </p>
                    <button className="btn btn-outline border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white rounded-2xl px-8 font-black transition-all">
                      Enable 2FA
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
