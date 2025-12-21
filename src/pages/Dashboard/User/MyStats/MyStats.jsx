import React from "react";
import { useAuth } from "./../../../../hooks/useAuth";
import useAxiosSecure from "./../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../../components/Loader/Loader";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { Wallet, Trophy, Target, TrendingUp, Zap } from "lucide-react";

const MyStats = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: allEntries = [], isLoading } = useQuery({
    queryKey: ["my-entries-contests", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/my-entries-contests?email=${user?.email}`
      );
      return res.data;
    },
  });

  if (isLoading) return <Loader />;

  // 📊 Data Calculations
  const totalParticipated = allEntries.length;
  const wonEntries = allEntries.filter(
    (entry) => entry.gradingStatus === "Winner"
  );
  const totalWon = wonEntries.length;
  const winPercentage =
    totalParticipated > 0
      ? ((totalWon / totalParticipated) * 100).toFixed(1)
      : 0;

  // Data for Pie Chart (Win vs Loss/Pending)
  const pieData = [
    { name: "Won", value: totalWon },
    { name: "Others", value: totalParticipated - totalWon },
  ];
  const COLORS = ["#6366f1", "#1e293b"]; // Indigo and Slate

  // Data for Bar Chart (Status Breakdown)
  const statusCounts = allEntries.reduce((acc, entry) => {
    const status = entry.gradingStatus || "Pending";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const barData = Object.keys(statusCounts).map((key) => ({
    name: key === "not_graded" ? "Pending" : key,
    count: statusCounts[key],
  }));

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* 💰 Top Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Current Balance"
          value={`$${user?.balance || 0}`}
          icon={<Wallet className="text-emerald-400" />}
          color="border-emerald-500/20"
        />
        <StatCard
          title="Total Participated"
          value={totalParticipated}
          icon={<Target className="text-indigo-400" />}
          color="border-indigo-500/20"
        />
        <StatCard
          title="Contests Won"
          value={totalWon}
          icon={<Trophy className="text-amber-400" />}
          color="border-amber-500/20"
        />
        <StatCard
          title="Win Ratio"
          value={`${winPercentage}%`}
          icon={<TrendingUp className="text-rose-400" />}
          color="border-rose-500/20"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 🎯 Win Percentage (Pie Chart) */}
        <div className="lg:col-span-1 bg-base-100 border border-base-300 rounded-[2.5rem] p-8 shadow-xl">
          <h3 className="text-sm font-black uppercase tracking-widest opacity-40 mb-6 flex items-center gap-2">
            <Zap size={16} /> Win Consistency
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "16px",
                    backgroundColor: "#FFFFFF",
                    border: "none",
                    color: "#FFF",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center mt-4">
            <span className="text-4xl font-black text-indigo-500">
              {winPercentage}%
            </span>
            <p className="text-[10px] font-bold opacity-30 uppercase mt-1">
              Total Success Rate
            </p>
          </div>
        </div>

        {/* 📊 Participation Breakdown (Bar Chart) */}
        <div className="lg:col-span-2 bg-base-100 border border-base-300 rounded-[2.5rem] p-8 shadow-xl">
          <h3 className="text-sm font-black uppercase tracking-widest opacity-40 mb-6 flex items-center gap-2">
            <TrendingUp size={16} /> Performance Analysis
          </h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#334155"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: "bold" }}
                />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: "rgba(99, 102, 241, 0.1)" }}
                  contentStyle={{
                    borderRadius: "16px",
                    backgroundColor: "#FFFFFF",
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
    </div>
  );
};

// Reusable Stat Card Component
const StatCard = ({ title, value, icon, color }) => (
  <div
    className={`bg-base-100 border ${color} p-6 rounded-2xl shadow-lg flex items-center justify-between group hover:scale-[1.02] transition-transform duration-300`}
  >
    <div>
      <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">
        {title}
      </p>
      <h2 className="text-3xl font-black text-base-content tracking-tighter">
        {value}
      </h2>
    </div>
    <div className="p-4 bg-base-200 rounded-2xl group-hover:bg-base-300 transition-colors">
      {icon}
    </div>
  </div>
);

export default MyStats;
