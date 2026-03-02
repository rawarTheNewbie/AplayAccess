import { useState } from "react";
import Modal from "../../components/modals/Modal.jsx";

const initialItems = [
  { id: 1, name: "Bath Towels", category: "linen", quantity: 20, reorderLevel: 5, unit: "pcs" },
  { id: 2, name: "Shampoo", category: "toiletries", quantity: 8, reorderLevel: 10, unit: "bottles" },
];

export default function AdminInventory() {
  const [items, setItems] = useState(initialItems);
  const [editing, setEditing] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  function openNew() {
    setEditing({ name: "", category: "", quantity: 0, reorderLevel: 0, unit: "" });
    setModalOpen(true);
  }

  function openEdit(item) {
    setEditing({ ...item });
    setModalOpen(true);
  }

  function saveItem(e) {
    e.preventDefault();
    if (!editing.name) return;
    setItems((list) => {
      if (editing.id) {
        return list.map((i) => (i.id === editing.id ? editing : i));
      }
      const next = Math.max(0, ...list.map((i) => i.id)) + 1;
      return [...list, { ...editing, id: next }];
    });
    setModalOpen(false);
  }

  function lowStock(i) {
    return i.quantity <= i.reorderLevel;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Inventory</h1>
        <button
          onClick={openNew}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Add Item
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Category</th>
              <th className="px-4 py-2 border">Qty</th>
              <th className="px-4 py-2 border">Reorder</th>
              <th className="px-4 py-2 border">Unit</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((i) => (
              <tr key={i.id} className={lowStock(i) ? "bg-red-50" : ""}>
                <td className="px-4 py-2 border">{i.name}</td>
                <td className="px-4 py-2 border">{i.category}</td>
                <td className="px-4 py-2 border">{i.quantity}</td>
                <td className="px-4 py-2 border">{i.reorderLevel}</td>
                <td className="px-4 py-2 border">{i.unit}</td>
                <td className="px-4 py-2 border">
                  <button
                    onClick={() => openEdit(i)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={saveItem} className="p-6 space-y-4">
          <h2 className="text-xl font-bold">
            {editing?.id ? "Edit Item" : "New Item"}
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editing?.name || ""}
              onChange={(e) => setEditing((x) => ({ ...x, name: e.target.value }))}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editing?.category || ""}
              onChange={(e) => setEditing((x) => ({ ...x, category: e.target.value }))}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Qty</label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={editing?.quantity || 0}
                onChange={(e) => setEditing((x) => ({ ...x, quantity: +e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reorder Level</label>
              <input
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={editing?.reorderLevel || 0}
                onChange={(e) => setEditing((x) => ({ ...x, reorderLevel: +e.target.value }))}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editing?.unit || ""}
              onChange={(e) => setEditing((x) => ({ ...x, unit: e.target.value }))}
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="font-medium text-gray-700 hover:text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
