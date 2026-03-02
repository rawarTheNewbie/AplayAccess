import { useState } from "react";
import Modal from "../../components/modals/Modal.jsx";

const initialRooms = [
  {
    id: 1,
    number: "#201",
    name: "Deluxe Suite",
    type: "Deluxe Suite",
    capacity: "2 Adults",
    price: 250,
    status: "Available",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200&h=200&fit=crop",
  },
  {
    id: 2,
    number: "#105",
    name: "Beach Villa",
    type: "Beach Villa",
    capacity: "4 Adults",
    price: 350,
    status: "Occupied",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=200&h=200&fit=crop",
  },
  {
    id: 3,
    number: "#302",
    name: "Family Bungalow",
    type: "Family Bungalow",
    capacity: "6 Adults",
    price: 450,
    status: "Maintenance",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200&h=200&fit=crop",
  },
];

export default function AdminRooms() {
  const [rooms, setRooms] = useState(initialRooms);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !filterType || room.type === filterType;
    const matchesStatus = !filterStatus || room.status === filterStatus;
    return matchesSearch && matchesType && matchesStatus;
  });

  function openNew() {
    setEditing({
      number: "",
      name: "",
      type: "Standard",
      capacity: "",
      price: 0,
      status: "Available",
    });
    setModalOpen(true);
  }

  function openEdit(room) {
    setEditing({ ...room });
    setModalOpen(true);
  }

  function saveRoom(e) {
    e.preventDefault();
    if (!editing.number || !editing.name) return;

    setRooms((list) => {
      if (editing.id) {
        return list.map((r) => (r.id === editing.id ? editing : r));
      }
      const nextId = Math.max(0, ...list.map((r) => r.id)) + 1;
      return [...list, { ...editing, id: nextId }];
    });
    setModalOpen(false);
  }

  function deleteRoom(id) {
    if (window.confirm("Are you sure you want to delete this room?")) {
      setRooms((list) => list.filter((r) => r.id !== id));
    }
  }

  const statusColors = {
    Available: "bg-green-100 text-green-800",
    Occupied: "bg-blue-100 text-blue-800",
    Maintenance: "bg-yellow-100 text-yellow-800",
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Rooms</h2>
        <button
          onClick={openNew}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <i className="fas fa-plus mr-2"></i> Add Room
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Search & Filter */}
        <div className="p-4 border-b flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1 md:flex-none">
            <input
              type="text"
              placeholder="Search rooms..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>

          <div className="flex gap-2">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Filter by Type</option>
              <option value="Standard">Standard</option>
              <option value="Deluxe Suite">Deluxe Suite</option>
              <option value="Beach Villa">Beach Villa</option>
              <option value="Family Bungalow">Family Bungalow</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Filter by Status</option>
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"></th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Room Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Capacity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Price/Night
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRooms.map((room) => (
                <tr key={room.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      alt={room.name}
                      className="h-10 w-10 rounded-full object-cover"
                      src={room.image}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {room.number}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {room.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {room.capacity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₱{room.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${statusColors[room.status] || "bg-gray-100 text-gray-800"}`}>
                      {room.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => openEdit(room)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      onClick={() => deleteRoom(room.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">{Math.min(3, filteredRooms.length)}</span> of{" "}
            <span className="font-medium">{filteredRooms.length}</span> results
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={saveRoom} className="p-6 space-y-4">
          <h3 className="text-xl font-bold">
            {editing?.id ? "Edit Room" : "Add New Room"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Room Number
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={editing?.number || ""}
                onChange={(e) =>
                  setEditing((x) => ({ ...x, number: e.target.value }))
                }
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Room Name
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={editing?.name || ""}
                onChange={(e) =>
                  setEditing((x) => ({ ...x, name: e.target.value }))
                }
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Room Type
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={editing?.type || "Standard"}
                onChange={(e) =>
                  setEditing((x) => ({ ...x, type: e.target.value }))
                }
              >
                <option>Standard</option>
                <option>Deluxe</option>
                <option>Suite</option>
                <option>Family</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Price per Night (₱)
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={editing?.price || 0}
                onChange={(e) =>
                  setEditing((x) => ({ ...x, price: parseFloat(e.target.value) }))
                }
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Capacity
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={editing?.capacity || ""}
                onChange={(e) =>
                  setEditing((x) => ({ ...x, capacity: e.target.value }))
                }
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Status
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={editing?.status || "Available"}
                onChange={(e) =>
                  setEditing((x) => ({ ...x, status: e.target.value }))
                }
              >
                <option>Available</option>
                <option>Occupied</option>
                <option>Maintenance</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 text-gray-600 rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Save Room
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
