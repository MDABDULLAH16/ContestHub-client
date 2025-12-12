import {
  BarChart3,
  Users,
  Trophy,
  TrendingUp,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import { Link } from "react-router";

const AdminDashboard = () => {
  const stats = [
    { label: "Total Users", value: "2,543", change: "+12%", icon: Users },
    { label: "Active Contests", value: "48", change: "+5%", icon: Trophy },
    { label: "Total Revenue", value: "$24,582", change: "+8%", icon: TrendingUp },
    { label: "Avg Satisfaction", value: "4.8/5", change: "+0.2%", icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage platform, users, and contests</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Pending Reviews */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Pending Reviews</h2>
                <Link
                  to="/admin/contests"
                  className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1"
                >
                  View All <ArrowRight size={16} />
                </Link>
              </div>
              <div className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <div>
                      <p className="font-medium text-gray-900">
                        Design Challenge #{item}
                      </p>
                      <p className="text-sm text-gray-500">
                        Created by User {item}
                      </p>
                    </div>
                    <button className="px-3 py-1 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700">
                      Review
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent User Reports */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Recent Reports
              </h2>
              <div className="space-y-3">
                {[1, 2].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border border-orange-200"
                  >
                    <AlertCircle className="text-orange-600 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        Inappropriate Content Report
                      </p>
                      <p className="text-sm text-gray-600">
                        Reported by User {item} • 2 hours ago
                      </p>
                    </div>
                    <button className="px-3 py-1 bg-orange-600 text-white rounded text-sm hover:bg-orange-700">
                      Investigate
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 h-fit">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h2>
            <div className="space-y-3">
              <Link
                to="/admin/users"
                className="block p-3 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition font-medium text-sm"
              >
                Manage Users
              </Link>
              <Link
                to="/admin/contests"
                className="block p-3 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition font-medium text-sm"
              >
                Manage Contests
              </Link>
              <Link
                to="/admin/analytics"
                className="block p-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition font-medium text-sm"
              >
                View Analytics
              </Link>
              <Link
                to="/settings"
                className="block p-3 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition font-medium text-sm"
              >
                Settings
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
