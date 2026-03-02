import { useState } from "react";
import Modal from "../../components/modals/Modal.jsx";

export default function AdminFoods() {
  const [foods, setFoods] = useState([
    {
      id: 1,
      name: "Grilled Fish",
      category: "Main Course",
      price: 450,
      status: "Available",
      image: "https://images.unsplash.com/photo-1542080353-ea2239dc8cc7?w=200&h=200&fit=crop",
    },
    {
      id: 2,
      name: "Caesar Salad",
      category: "Appetizer",
      price: 200,
      status: "Available",
      image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=200&h=200&fit=crop",
    },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const filteredFoods = foods.filter((f) => {
    const matches = f.name.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = !filterStatus || f.status === filterStatus;
    return matches && statusMatch;
  });

  function openNew() {
    setEditing({
      name: "",
      category: "Main Course",
      price: 0,
      status: "Available",
    });
    setModalOpen(true);
  }

  function openEdit(food) {
    setEditing({ ...food });
    setModalOpen(true);
  }

  function saveFood(e) {
    e.preventDefault();
    if (!editing.name || !editing.price) return;

    setFoods((list) => {
      if (editing.id) {
        return list.map((f) => (f.id === editing.id ? editing : f));
      }
      const nextId = Math.max(0, ...list.map((f) => f.id)) + 1;
      return [...list, { ...editing, id: nextId }];
    });
    setModalOpen(false); 
  }

  function deleteFood(id) {
    if (window.confirm("Delete this food item?")) {
      setFoods((list) => list.filter((f) => f.id !== id));
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Food Items</h2>
        <button
          onClick={openNew}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <i className="fas fa-plus mr-2"></i> Add Food
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b flex flex-col md:flex-row gap-4">
          <div className="relative flex-1 md:flex-none">
            <input
              type="text"
              placeholder="Search foods..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2"
          >
            <option value="">Filter by Status</option>
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"></th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Price
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
              {filteredFoods.map((food) => (
                <tr key={food.id}>
                  <td className="px-6 py-4">
                    <img
                      alt={food.name}
                      className="h-10 w-10 rounded-full object-cover"
                      src={food.image}
                    />
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">{food.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{food.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">₱{food.price}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        food.status === "Available"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {food.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm space-x-2">
                    <button
                      onClick={() => openEdit(food)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                    <button
                      onClick={() => deleteFood(food.id)}
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
        <form onSubmit={saveFood} className="p-6 space-y-4">
          <h3 className="text-xl font-bold">
            {editing?.id ? "Edit Food" : "Add Food Item"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Food Name
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
                value={editing?.category || "Main Course"}
                onChange={(e) =>
                  setEditing((x) => ({ ...x, category: e.target.value }))
                }
              >
                <option>Appetizer</option>
                <option>Main Course</option>
                <option>Dessert</option>
                <option>Beverage</option>
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
