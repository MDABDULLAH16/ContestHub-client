import { Trophy, Heart, BarChart3, ArrowRight } from "lucide-react";
import { Link } from "react-router";

const UserDashboard = () => {
  const stats = [
    { label: "Contests Joined", value: "12", icon: Trophy, color: "indigo" },
    { label: "Contests Won", value: "3", icon: Trophy, color: "green" },
    { label: "Total Earnings", value: "$450", icon: BarChart3, color: "purple" },
    { label: "Wishlist Items", value: "8", icon: Heart, color: "red" },
  ];

  const myEntries = [
    {
      id: 1,
      contestTitle: "Logo Design Challenge",
      entryTitle: "Modern Tech Logo",
      status: "Submitted",
      submittedDate: "Dec 5, 2024",
      prize: "$500",
    },
    {
      id: 2,
      contestTitle: "Article Writing",
      entryTitle: "AI Future Article",
      status: "Under Review",
      submittedDate: "Dec 3, 2024",
      prize: "$200",
    },
    {
      id: 3,
      contestTitle: "Business Pitch",
      entryTitle: "EdTech Startup",
      status: "Won",
      submittedDate: "Nov 28, 2024",
      prize: "$1000",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
          <p className="text-gray-600 mt-2">Track your contests and earnings</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            const colorClass = {
              indigo: "bg-indigo-100 text-indigo-600",
              green: "bg-green-100 text-green-600",
              purple: "bg-purple-100 text-purple-600",
              red: "bg-red-100 text-red-600",
            };

            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorClass[stat.color]}`}
                  >
                    <Icon size={24} />
                  </div>
                </div>
                <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
            );
          })}
        </div>

        {/* My Entries Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">My Entries</h2>
                <Link
                  to="/user/entries"
                  className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1"
                >
                  View All <ArrowRight size={16} />
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                        Contest
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                        Entry Title
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                        Submitted
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {myEntries.map((entry) => (
                      <tr
                        key={entry.id}
                        className="border-b border-gray-200 hover:bg-gray-50 transition"
                      >
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          {entry.contestTitle}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {entry.entryTitle}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                              entry.status === "Won"
                                ? "bg-green-100 text-green-700"
                                : entry.status === "Under Review"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-blue-100 text-blue-700"
                            }`}
                          >
                            {entry.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {entry.submittedDate}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/contests"
                  className="block p-3 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition font-medium text-sm"
                >
                  Browse Contests
                </Link>
                <Link
                  to="/user/wishlist"
                  className="block p-3 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-medium text-sm"
                >
                  My Wishlist
                </Link>
                <Link
                  to="/settings"
                  className="block p-3 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition font-medium text-sm"
                >
                  Settings
                </Link>
              </div>
            </div>

            {/* Recommended Contests */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Recommended for You
              </h3>
              <div className="space-y-4">
                {[
                  {
                    title: "UI Design Challenge",
                    prize: "$750",
                    entries: 120,
                  },
                  { title: "Content Writing", prize: "$300", entries: 89 },
                ].map((contest, index) => (
                  <div
                    key={index}
                    className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <p className="font-medium text-gray-900 text-sm">
                      {contest.title}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-600">
                        {contest.entries} entries
                      </span>
                      <span className="font-semibold text-indigo-600 text-sm">
                        {contest.prize}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/contests"
                className="mt-4 block text-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium text-sm"
              >
                Explore More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
