import { useState } from "react";
import Modal from "../../components/modals/Modal.jsx";
import AlertModal from "../../components/modals/AlertModal.jsx";

const initialUsers = [
  { id: 1, name: "Alice", email: "alice@example.com", role: "admin", isActive: true },
  { id: 2, name: "Bob", email: "bob@example.com", role: "staff", isActive: true },
];

export default function AdminUsers() {
  const [users, setUsers] = useState(initialUsers);
  const [editing, setEditing] = useState(null); // user object being edited
  const [modalOpen, setModalOpen] = useState(false);
  const [alert, setAlert] = useState({ open: false, type: "info", title: "", message: "" });

  function closeAlert() {
    setAlert((a) => ({ ...a, open: false }));
  }

  function openNew() {
    setEditing({ name: "", email: "", role: "staff", isActive: true });
    setModalOpen(true);
  }

  function openEdit(user) {
    setEditing({ ...user });
    setModalOpen(true);
  }

  function saveUser(e) {
    e.preventDefault();
    if (!editing.name || !editing.email) {
      setAlert({ open: true, type: "error", title: "Error", message: "Name and email are required" });
      return;
    }

    setUsers((list) => {
      if (editing.id) {
        return list.map((u) => (u.id === editing.id ? editing : u));
      }
      const nextId = Math.max(0, ...list.map((u) => u.id)) + 1;
      return [...list, { ...editing, id: nextId }];
    });
    setModalOpen(false);
  }

  function toggleActive(id) {
    setUsers((list) => list.map((u) => (u.id === id ? { ...u, isActive: !u.isActive } : u)));
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">User Management</h1>
        <button
          onClick={openNew}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Add User
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Role</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className={u.isActive ? "" : "bg-gray-100 italic"}>
                <td className="px-4 py-2 border">{u.name}</td>
                <td className="px-4 py-2 border">{u.email}</td>
                <td className="px-4 py-2 border capitalize">{u.role}</td>
                <td className="px-4 py-2 border">
                  {u.isActive ? (
                    <span className="text-green-600">Active</span>
                  ) : (
                    <span className="text-red-600">Disabled</span>
                  )}
                </td>
                <td className="px-4 py-2 border space-x-2">
                  <button
                    onClick={() => openEdit(u)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => toggleActive(u.id)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    {u.isActive ? "Deactivate" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* modal form */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <form onSubmit={saveUser} className="p-6 space-y-4">
          <h2 className="text-xl font-bold">
            {editing?.id ? "Edit User" : "New User"}
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editing?.name || ""}
              onChange={(e) => setEditing((u) => ({ ...u, name: e.target.value }))}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editing?.email || ""}
              onChange={(e) => setEditing((u) => ({ ...u, email: e.target.value }))}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={editing?.role || "staff"}
              onChange={(e) => setEditing((u) => ({ ...u, role: e.target.value }))}
            >
              <option value="admin">Admin</option>
              <option value="staff">Staff</option>
            </select>
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
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
              Save
            </button>
          </div>
        </form>
      </Modal>

      <AlertModal
        open={alert.open}
        onClose={closeAlert}
        type={alert.type}
        title={alert.title}
        message={alert.message}
      />
    </div>
  );
}
