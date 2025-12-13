import React from 'react';

const Contests = () => {
    return (
      <div>
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
                <AlertCircle className="text-orange-600 mt-1 shrink-0" />
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
    );
};

export default Contests;