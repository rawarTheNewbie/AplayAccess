import { useState } from "react";

export default function AdminDashboard() {
  const [stats] = useState({
    totalGuests: 1248,
    availableRooms: 42,
    monthlyTransactions: 57,
    foodOrders: 356,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-600 hover:text-gray-800">
            <i className="fas fa-bell"></i>
            <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-red-500"></span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
            <i className="fas fa-users text-xl"></i>
          </div>
          <div>
            <p className="text-gray-500">Total Guests</p>
            <h3 className="text-2xl font-bold">{stats.totalGuests.toLocaleString()}</h3>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
            <i className="fas fa-bed text-xl"></i>
          </div>
          <div>
            <p className="text-gray-500">Available Rooms</p>
            <h3 className="text-2xl font-bold">{stats.availableRooms}</h3>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
            <i className="fas fa-money-bill-wave text-xl"></i>
          </div>
          <div>
            <p className="text-gray-500">Monthly Transactions</p>
            <h3 className="text-2xl font-bold">{stats.monthlyTransactions}</h3>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
            <i className="fas fa-utensils text-xl"></i>
          </div>
          <div>
            <p className="text-gray-500">Food Orders</p>
            <h3 className="text-2xl font-bold">{stats.foodOrders}</h3>
          </div>
        </div>
      </div>

      {/* Recent Bookings & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Bookings */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Bookings</h2>
            <a href="#" className="text-blue-500 hover:underline text-sm">
              View All
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Room
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Guest
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Dates
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Deluxe Suite #201</td>
                  <td className="px-6 py-4 whitespace-nowrap">John Smith</td>
                  <td className="px-6 py-4 whitespace-nowrap">Jun 15 - Jun 20</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                      Checked In
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Beach Villa #105</td>
                  <td className="px-6 py-4 whitespace-nowrap">Sarah Johnson</td>
                  <td className="px-6 py-4 whitespace-nowrap">Jun 18 - Jun 25</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                      Upcoming
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">Family Bungalow #302</td>
                  <td className="px-6 py-4 whitespace-nowrap">Michael Brown</td>
                  <td className="px-6 py-4 whitespace-nowrap">Jun 10 - Jun 15</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">
                      Completed
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="p-2 rounded-full bg-blue-100 text-blue-600 mr-4">
                <i className="fas fa-user-plus"></i>
              </div>
              <div>
                <p className="font-medium">New user registered</p>
                <p className="text-sm text-gray-500">Robert Johnson created an account (2 hours ago)</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="p-2 rounded-full bg-green-100 text-green-600 mr-4">
                <i className="fas fa-bed"></i>
              </div>
              <div>
                <p className="font-medium">Room booked</p>
                <p className="text-sm text-gray-500">
                  Deluxe Suite #204 booked by Emily Davis (5 hours ago)
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="p-2 rounded-full bg-purple-100 text-purple-600 mr-4">
                <i className="fas fa-utensils"></i>
              </div>
              <div>
                <p className="font-medium">Food order</p>
                <p className="text-sm text-gray-500">
                  Order #245 placed from Beach Villa #103 (1 day ago)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
