import { useState } from "react";

export default function AdminHistory() {
  const [logs] = useState([
    { id: 1, date: "2024-01-18", user: "Admin", action: "Added new room #102" },
    { id: 2, date: "2024-01-17", user: "Admin", action: "Updated guest profile for John Doe" },
    { id: 3, date: "2024-01-16", user: "Staff", action: "Processed transaction TRX002" },
    { id: 4, date: "2024-01-15", user: "Admin", action: "Approved review by Emma Johnson" },
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLogs = logs.filter(
    (log) =>
      log.date.includes(searchTerm) ||
      log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Activity History</h2>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b">
          <div className="relative w-full md:w-1/3">
            <input
              type="text"
              placeholder="Search history..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td className="px-6 py-4 text-sm text-gray-500">{log.date}</td>
                  <td className="px-6 py-4 text-sm">{log.user}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{log.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
