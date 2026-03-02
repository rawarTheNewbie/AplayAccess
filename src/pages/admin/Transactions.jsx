import { useState } from "react";

export default function AdminTransactions() {
  const [transactions] = useState([
    {
      id: "TRX001",
      reservationId: "RES123",
      guestName: "John Doe",
      amount: 4500,
      method: "Credit Card",
      status: "Completed",
      date: "2024-01-15",
    },
    {
      id: "TRX002",
      reservationId: "RES124",
      guestName: "Jane Smith",
      amount: 3200,
      method: "Bank Transfer",
      status: "Pending",
      date: "2024-01-16",
    },
    {
      id: "TRX003",
      reservationId: "RES125",
      guestName: "Bob Johnson",
      amount: 5600,
      method: "GCash",
      status: "Completed",
      date: "2024-01-17",
    },
  ]);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterMethod, setFilterMethod] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransactions = transactions.filter((t) => {
    const matches =
      t.reservationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.guestName.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = !filterStatus || t.status === filterStatus;
    const methodMatch = !filterMethod || t.method === filterMethod;
    return matches && statusMatch && methodMatch;
  });

  const totalAmount = filteredTransactions.reduce((sum, t) => sum + t.amount, 0);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Transactions</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full p-3">
                <i className="fas fa-credit-card text-blue-600 text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-gray-500 text-sm">Total Transactions</p>
                <p className="text-2xl font-bold">{transactions.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="bg-green-100 rounded-full p-3">
                <i className="fas fa-check-circle text-green-600 text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-gray-500 text-sm">Completed</p>
                <p className="text-2xl font-bold">
                  {transactions.filter((t) => t.status === "Completed").length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="bg-purple-100 rounded-full p-3">
                <i className="fas fa-peso-sign text-purple-600 text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-gray-500 text-sm">Total Amount</p>
                <p className="text-2xl font-bold">₱{totalAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 md:flex-none">
            <input
              type="text"
              placeholder="Search by ID or guest..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2"
          >
            <option value="">Filter by Status</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
          <select
            value={filterMethod}
            onChange={(e) => setFilterMethod(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2"
          >
            <option value="">Filter by Method</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="GCash">GCash</option>
            <option value="PayPal">PayPal</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Reservation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Guest Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Method
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="px-6 py-4 text-sm font-medium">{transaction.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{transaction.reservationId}</td>
                  <td className="px-6 py-4 text-sm">{transaction.guestName}</td>
                  <td className="px-6 py-4 text-sm font-medium">₱{transaction.amount}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{transaction.method}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        transaction.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : transaction.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{transaction.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
