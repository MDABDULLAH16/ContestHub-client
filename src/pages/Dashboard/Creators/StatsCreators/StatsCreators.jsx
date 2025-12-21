import React from "react";
import {
  BarChart3,
  Trophy,
  DollarSign,
  Users,
  Layers,
  CheckCircle,
  Clock,
  TrendingUp,
} from "lucide-react";
import { useAuth } from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../../components/Loader/Loader";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

const StatsCreators = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch all participants across all contests created by this user
  const { data: participants = [], isLoading: pLoading } = useQuery({
    queryKey: ["all-participants", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/all-participants?email=${user?.email}`
      );
      return res.data;
    },
  });

  // Fetch contests created by this user
  const { data: contests = [], isLoading: cLoading } = useQuery({
    queryKey: ["my-created-contest", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-created-contest?email=${user?.email}`
      );
      return res.data;
    },
  });

  if (pLoading || cLoading) return <Loader />;

  // --- Calculations ---
  const totalRevenue = participants.reduce(
    (acc, curr) => acc + Number(curr.paidAmount || 0),
    0
  );
  const totalParticipants = participants.length;
  const activeContests = contests.filter((c) => c.status === "accepted").length;
  const pendingContests = contests.filter((c) => c.status === "pending").length;

  // Chart Data: Participants per Contest
  const chartData = contests.slice(0, 6).map((c) => ({
    name: c.name.split(" ").slice(0, 2).join(" "), // Shorten name
    participants: c.participantCount || 0,
    revenue: (c.participantCount || 0) * Number(c.entryPrice || 0),
  }));

  const stats = [
    {
      label: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      label: "Total Participants",
      value: totalParticipants,
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Active Contests",
      value: activeContests,
      icon: CheckCircle,
      color: "text-indigo-500",
      bg: "bg-indigo-500/10",
    },
    {
      label: "Pending Approval",
      value: pendingContests,
      icon: Clock,
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-base-content uppercase">
            Creator <span className="text-indigo-500">Analytics</span>
          </h1>
          <p className="text-sm font-bold opacity-50 tracking-widest uppercase">
            Performance overview for {user?.displayName}
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-base-100 border border-base-300 rounded-2xl shadow-sm">
          <TrendingUp size={16} className="text-indigo-500" />
          <span className="text-xs font-black uppercase tracking-tighter">
            Real-time Data Active
          </span>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-base-100 p-6 rounded-2xl border border-base-300 shadow-xl group hover:border-indigo-500/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                  <Icon size={24} />
                </div>
                <div className="h-1 w-10 bg-base-300 rounded-full"></div>
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
                {stat.label}
              </p>
              <h2 className="text-3xl font-black mt-1 tracking-tighter">
                {stat.value}
              </h2>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Participation Bar Chart */}
        <div className="lg:col-span-2 bg-base-100 p-8 rounded-[2.5rem] border border-base-300 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-black uppercase tracking-widest text-sm flex items-center gap-2">
              <BarChart3 size={18} className="text-indigo-500" /> Engagement by
              Contest
            </h3>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#334155"
                  opacity={0.1}
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 900 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 10 }}
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    borderRadius: "16px",
                    border: "none",
                    fontWeight: "bold",
                  }}
                />
                <Bar
                  dataKey="participants"
                  fill="#6366f1"
                  radius={[8, 8, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Area Chart */}
        <div className="lg:col-span-1 bg-base-100 p-8 rounded-[2.5rem] border border-base-300 shadow-2xl">
          <h3 className="font-black uppercase tracking-widest text-sm flex items-center gap-2 mb-8">
            <DollarSign size={18} className="text-emerald-500" /> Revenue Flow
          </h3>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#10b981"
                  fillOpacity={1}
                  fill="url(#colorRev)"
                  strokeWidth={3}
                />
                <Tooltip />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 p-4 bg-base-200 rounded-2xl border border-base-300">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-black opacity-40 uppercase">
                Average Per Contest
              </span>
              <span className="text-lg font-black text-emerald-500">
                $
                {contests.length > 0
                  ? (totalRevenue / contests.length).toFixed(0)
                  : 0}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Table Preview */}
      <div className="bg-base-100 rounded-[2.5rem] border border-base-300 p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-black uppercase tracking-widest text-sm flex items-center gap-2">
            <Layers size={18} className="text-purple-500" /> Recent Contests
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="border-b border-base-300 text-base-content/40 uppercase text-[10px] font-black tracking-widest">
                <th>Contest Name</th>
                <th>Type</th>
                <th>Price</th>
                <th>Participants</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {contests.slice(0, 4).map((c) => (
                <tr
                  key={c._id}
                  className="border-b border-base-300/50 hover:bg-base-200/50 transition-colors"
                >
                  <td className="font-bold">{c.name}</td>
                  <td>
                    <span className="badge badge-sm font-bold bg-base-300">
                      {c.contestType}
                    </span>
                  </td>
                  <td className="font-black text-indigo-500">
                    ${c.entryPrice}
                  </td>
                  <td className="font-bold">{c.participantCount}</td>
                  <td>
                    <span
                      className={`text-[9px] font-black px-2 py-1 rounded-md uppercase ${
                        c.status === "accepted"
                          ? "bg-emerald-500/10 text-emerald-500"
                          : "bg-orange-500/10 text-orange-500"
                      }`}
                    >
                      {c.status}
                    </span>
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

export default StatsCreators;
