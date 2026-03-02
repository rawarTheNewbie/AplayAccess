import { useState } from "react";
import Modal from "../../components/modals/Modal.jsx";

export default function AdminServices() {
  const [services, setServices] = useState([
    {
      id: 1,
      name: "Massage Therapy",
      category: "Wellness",
      price: 800,
      duration: "60 mins",
      status: "Available",
      description: "Professional relaxation massage",
    },
    {
      id: 2,
      name: "Airport Transfer",
      category: "Transportation",
      price: 1500,
      duration: "Varies",
      status: "Available",
      description: "Private airport transportation",
    },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const filteredServices = services.filter((s) => {
    const matches = s.name.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = !filterCategory || s.category === filterCategory;
    return matches && categoryMatch;
  });

  function openNew() {
    setEditing({
      name: "",
      category: "Wellness",
      price: 0,
      duration: "",
      status: "Available",
      description: "",
    });
    setModalOpen(true);
  }

  function openEdit(service) {
    setEditing({ ...service });
    setModalOpen(true);
  }

  function saveService(e) {
    e.preventDefault();
    if (!editing.name || !editing.price) return;

    setServices((list) => {
      if (editing.id) {
        return list.map((s) => (s.id === editing.id ? editing : s));
      }
      const nextId = Math.max(0, ...list.map((s) => s.id)) + 1;
      return [...list, { ...editing, id: nextId }];
    });
    setModalOpen(false);
  }

  function deleteService(id) {
    if (window.confirm("Delete this service?")) {
      setServices((list) => list.filter((s) => s.id !== id));
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Services</h2>
        <button
          onClick={openNew}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <i className="fas fa-plus mr-2"></i> Add Service
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 md:flex-none">
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2"
          >
            <option value="">Filter by Category</option>
            <option value="Wellness">Wellness</option>
            <option value="Transportation">Transportation</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Dining">Dining</option>
            <option value="Activities">Activities</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Service Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Duration
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
              {filteredServices.map((service) => (
                <tr key={service.id}>
                  <td className="px-6 py-4 text-sm font-medium">{service.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{service.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">₱{service.price}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{service.duration}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        service.status === "Available"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {service.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    <button
                      onClick={() => openEdit(service)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      onClick={() => deleteService(service.id)}
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
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={saveService} className="p-6 space-y-4">
          <h3 className="text-xl font-bold">
            {editing?.id ? "Edit Service" : "Add Service"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Service Name
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
                Category
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={editing?.category || "Wellness"}
                onChange={(e) =>
                  setEditing((x) => ({ ...x, category: e.target.value }))
                }
              >
                <option>Wellness</option>
                <option>Transportation</option>
                <option>Entertainment</option>
                <option>Dining</option>
                <option>Activities</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Price (₱)
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={editing?.price || 0}
                onChange={(e) =>
                  setEditing((x) => ({ ...x, price: parseFloat(e.target.value) }))
                }
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Duration
              </label>
              <input
                type="text"
                placeholder="e.g., 60 mins, 2 hours, Varies"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={editing?.duration || ""}
                onChange={(e) =>
                  setEditing((x) => ({ ...x, duration: e.target.value }))
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
                <option>Unavailable</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              value={editing?.description || ""}
              onChange={(e) =>
                setEditing((x) => ({ ...x, description: e.target.value }))
              }
            />
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
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
