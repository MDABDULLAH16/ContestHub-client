import { BarChart3, Users, Trophy, TrendingUp } from "lucide-react";

const stats = [
  { label: "Total Users", value: "2,543", change: "+12%", icon: Users },
  { label: "Active Contests", value: "48", change: "+5%", icon: Trophy },
  { label: "Total Revenue", value: "$24,582", change: "+8%", icon: TrendingUp },
  {
    label: "Avg Satisfaction",
    value: "4.8/5",
    change: "+0.2%",
    icon: BarChart3,
  },
];

const StatsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-lg transition"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Icon size={24} className="text-indigo-600" />
              </div>
              <span className="text-green-600 text-sm font-semibold">
                {stat.change}
              </span>
            </div>
            <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-2">
              {stat.value}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default StatsGrid;
