import React from 'react';
import StatsCreators from '../StatsCreators/StatsCreators';
import useAxiosSecure from '../../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../../../hooks/useAuth';

const MyCreatedContest = () => {
    const {user}= useAuth()
    const axiosSecure = useAxiosSecure();
    const { data: contests = [] } = useQuery({
        queryKey: ["my-created-contest", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-created-contest?email=${user?.email}`);
            return res.data;
        }
    });
    // const recentContests = [
    //   {
    //     id: 1,
    //     title: "Logo Design Challenge",
    //     entries: 45,
    //     status: "Active",
    //     prize: "$500",
    //     endDate: "Dec 25, 2024",
    //   },
     
    // ];
    return (
      <div>
        <StatsCreators></StatsCreators>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">
              Your Contests {contests.length}
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Contest Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Entries
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Prize Pool
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    End Date
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {contests.map((contest) => (
                  <tr
                    key={contest._id}
                    className="border-b border-gray-200 hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {contest.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {contest.entryPrice}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {contest.prizeMoney}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(contest.endDate).toLocaleString("en-BD", {
                        timeZone: "Asia/Dhaka",
                      })}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          contest.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {contest.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button className="text-indigo-600 hover:text-indigo-700 font-medium">
                        View Details
                      </button>
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

export default MyCreatedContest;