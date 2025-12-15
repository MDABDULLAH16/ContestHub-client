import React from 'react';
import {  BarChart3, Trophy, DollarSign, TrendingUp } from "lucide-react";

const StatsCreators = () => {
      const stats = [
        {
          label: "Active Contests",
          value: "5",
          icon: Trophy,
          color: "indigo",
        },
        {
          label: "Total Entries",
          value: "234",
          icon: TrendingUp,
          color: "purple",
        },
        {
          label: "Total Earnings",
          value: "$2,450",
          icon: DollarSign,
          color: "green",
        },
        {
          label: "Avg Rating",
          value: "4.7/5",
          icon: BarChart3,
          color: "orange",
        },
      ];

    return (
      <div>
        {/* Stats Grid */}
        <div className="grid mt-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colorClass = {
              indigo: "bg-indigo-100 text-indigo-600",
              purple: "bg-purple-100 text-purple-600",
              green: "bg-green-100 text-green-600",
              orange: "bg-orange-100 text-orange-600",
            };

            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      colorClass[stat.color]
                    }`}
                  >
                    <Icon size={24} />
                  </div>
                </div>
                <p className="text-gray-600 text-sm font-medium">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold text-gray-900 mt-2">
                  {stat.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
};

export default StatsCreators;