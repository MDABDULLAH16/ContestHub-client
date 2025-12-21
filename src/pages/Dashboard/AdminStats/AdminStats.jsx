import React from "react";
import { useAuth } from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../components/Loader/Loader";
import {
  Users,
  Trophy,
  DollarSign,
  Activity,
  PieChart as PieIcon,
  BarChart3,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from "recharts";

const AdminStats = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Queries
  const { data: allUsers = [], isLoading: uLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const { data: allContests = [], isLoading: cLoading } = useQuery({
    queryKey: ["all-contests-admin"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-contests-admin");
      return res.data;
    },
  });

  const { data: allParticipants = [], isLoading: pLoading } = useQuery({
    queryKey: ["all-participants-admin"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-participants-admin");
      return res.data;
    },
  });

  if (uLoading || cLoading || pLoading) return <Loader />;

  // --- Calculations ---
  const totalRevenue = allParticipants.reduce(
    (acc, curr) => acc + Number(curr.paidAmount || 0),
    0
  );
  const totalPrizePool = allContests.reduce(
    (acc, curr) => acc + Number(curr.prizeMoney || 0),
    0
  );

  // User Role Distribution
  const roleData = [
    { name: "Users", value: allUsers.filter((u) => u.role === "user").length },
    {
      name: "Creators",
      value: allUsers.filter((u) => u.role === "creator").length,
    },
    {
      name: "Admins",
      value: allUsers.filter((u) => u.role === "admin").length,
    },
  ];
  const COLORS = ["#6366f1", "#10b981", "#f59e0b"];

  // Contest Type Analysis
  const typeCounts = allContests.reduce((acc, curr) => {
    acc[curr.contestType] = (acc[curr.contestType] || 0) + 1;
    return acc;
  }, {});
  const contestTypeData = Object.keys(typeCounts).map((key) => ({
    name: key,
    count: typeCounts[key],
  }));

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-base-content uppercase italic">
            Admin <span className="text-indigo-500">Control Center</span>
          </h1>
          <p className="text-[10px] font-bold opacity-40 uppercase tracking-[0.3em]">
            Platform-wide intelligence & metrics
          </p>
        </div>
        <div className="badge badge-outline border-indigo-500/30 p-4 gap-2 font-black text-[10px] uppercase">
          <Activity size={14} className="text-indigo-500" /> System Live:{" "}
          {allUsers.length} Users
        </div>
      </div>

      {/* Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          color="text-emerald-500"
        />
        <StatCard
          title="Active Contests"
          value={allContests.filter((c) => c.status === "accepted").length}
          icon={Trophy}
          color="text-indigo-500"
        />
        <StatCard
          title="Global Entries"
          value={allParticipants.length}
          icon={Users}
          color="text-blue-500"
        />
        <StatCard
          title="Pending Review"
          value={allContests.filter((c) => c.status === "pending").length}
          icon={ShieldCheck}
          color="text-amber-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Distribution (Pie Chart) */}
        <div className="bg-base-100 border border-base-300 rounded-[2.5rem] p-8 shadow-xl">
          <h3 className="text-xs font-black uppercase tracking-widest opacity-40 mb-6 flex items-center gap-2">
            <PieIcon size={16} /> User Ecosystem
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={roleData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {roleData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    backgroundColor: "#FFFFFF",
                    border: "none",
                  }}
                />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Contest Types (Bar Chart) */}
        <div className="lg:col-span-2 bg-base-100 border border-base-300 rounded-[2.5rem] p-8 shadow-xl">
          <h3 className="text-xs font-black uppercase tracking-widest opacity-40 mb-6 flex items-center gap-2">
            <BarChart3 size={16} /> Category Performance
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={contestTypeData}>
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
                  tick={{ fill: "#94a3b8", fontSize: 10 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 10 }}
                />
                <Tooltip
                  cursor={{ fill: "rgba(99, 102, 241, 0.05)" }}
                  contentStyle={{
                    borderRadius: "12px",
                    backgroundColor: "#1e293b",
                    border: "none",
                  }}
                />
                <Bar
                  dataKey="count"
                  fill="#6366f1"
                  radius={[10, 10, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Financial Overview (Area Chart) */}
      <div className="bg-base-100 border border-base-300 rounded-[2.5rem] p-8 shadow-xl">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xs font-black uppercase tracking-widest opacity-40 flex items-center gap-2">
            <TrendingUp size={16} /> Prize Pool vs Revenue
          </h3>
          <div className="text-right">
            <p className="text-[10px] font-black opacity-30 uppercase">
              Total Prize Committed
            </p>
            <p className="text-xl font-black text-amber-500">
              ${totalPrizePool.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={allContests
                .slice(-10)
                .map((c) => ({
                  name: c.name.substring(0, 10),
                  prize: c.prizeMoney,
                }))}
            >
              <defs>
                <linearGradient id="colorPrize" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#334155"
                opacity={0.1}
              />
              <XAxis dataKey="name" hide />
              <Tooltip
                contentStyle={{
                  borderRadius: "12px",
                  backgroundColor: "#1e293b",
                  border: "none",
                }}
              />
              <Area
                type="monotone"
                dataKey="prize"
                stroke="#f59e0b"
                fillOpacity={1}
                fill="url(#colorPrize)"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-base-100 p-6 rounded-2xl border border-base-300 shadow-xl group hover:border-indigo-500/30 transition-all duration-500 hover:-translate-y-1">
    <div className="flex items-center justify-between mb-4">
      <div
        className={`p-3 rounded-2xl bg-base-200 ${color} group-hover:scale-110 transition-transform`}
      >
        <Icon size={24} />
      </div>
      <div className="h-1.5 w-1.5 rounded-full bg-base-300 group-hover:bg-indigo-500 transition-colors"></div>
    </div>
    <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
      {title}
    </p>
    <h2 className="text-3xl font-black mt-1 tracking-tighter text-base-content">
      {value}
    </h2>
  </div>
);

export default AdminStats;
