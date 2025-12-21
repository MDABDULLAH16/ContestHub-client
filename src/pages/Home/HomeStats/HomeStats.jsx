import React from "react";
import { Users, Layout, Award, DollarSign } from "lucide-react";

const stats = [
  {
    label: "Active Creators",
    value: "85K+",
    icon: <Users className="w-5 h-5" />,
  },
  {
    label: "Total Contests",
    value: "12,400",
    icon: <Layout className="w-5 h-5" />,
  },
  {
    label: "Prizes Awarded",
    value: "$2.4M",
    icon: <DollarSign className="w-5 h-5" />,
  },
  {
    label: "Skills Mastered",
    value: "450+",
    icon: <Award className="w-5 h-5" />,
  },
];

const StatsSection = () => {
  return (
    <section className="py-16   dark:bg-slate-950 border-y border-slate-100 dark:border-slate-900 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-black  dark:text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-sm font-medium  dark:text-slate-400 uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default StatsSection;