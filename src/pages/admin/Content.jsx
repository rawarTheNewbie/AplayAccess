import { useState } from "react";

export default function AdminContent() {
  const [content, setContent] = useState({
    heroTitle: "Welcome to Aplay Resort",
    heroSubtitle: "Experience Paradise at the Best Beach Resort in Philippines",
    aboutTitle: "About Aplay Resort",
    aboutText: "Aplay Resort is a premier destination offering world-class amenities and unforgettable experiences.",
    contactEmail: "info@aplayresort.com",
    contactPhone: "+63 2 1234 5678",
    contactAddress: "123 Beach Road, Boracay, Philippines",
  });
  const [editing, setEditing] = useState(false);
  const [tempContent, setTempContent] = useState({ ...content });

  function handleSave(e) {
    e.preventDefault();
    setContent(tempContent);
    setEditing(false);
  }

  function handleCancel() {
    setTempContent(content);
    setEditing(false);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Website Content Management</h2>
        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            <i className="fas fa-edit mr-2"></i> Edit Content
          </button>
        )}
      </div>

      {!editing ? (
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold mb-2">Hero Section</h3>
            <p className="text-gray-600 text-sm mb-2"><strong>Title:</strong> {content.heroTitle}</p>
            <p className="text-gray-600 text-sm"><strong>Subtitle:</strong> {content.heroSubtitle}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold mb-2">About Section</h3>
            <p className="text-gray-600 text-sm mb-2"><strong>Title:</strong> {content.aboutTitle}</p>
            <p className="text-gray-600 text-sm"><strong>Text:</strong> {content.aboutText}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-bold mb-4">Contact Information</h3>
            <div className="space-y-2">
              <p className="text-gray-600 text-sm"><strong>Email:</strong> {content.contactEmail}</p>
              <p className="text-gray-600 text-sm"><strong>Phone:</strong> {content.contactPhone}</p>
              <p className="text-gray-600 text-sm"><strong>Address:</strong> {content.contactAddress}</p>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSave} className="bg-white rounded-lg shadow p-6 space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Hero Title</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={tempContent.heroTitle} onChange={(e) => setTempContent((x) => ({ ...x, heroTitle: e.target.value }))} />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Hero Subtitle</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={tempContent.heroSubtitle} onChange={(e) => setTempContent((x) => ({ ...x, heroSubtitle: e.target.value }))} />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">About Title</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={tempContent.aboutTitle} onChange={(e) => setTempContent((x) => ({ ...x, aboutTitle: e.target.value }))} />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">About Text</label>
            <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" rows="4" value={tempContent.aboutText} onChange={(e) => setTempContent((x) => ({ ...x, aboutText: e.target.value }))} />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Contact Email</label>
            <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={tempContent.contactEmail} onChange={(e) => setTempContent((x) => ({ ...x, contactEmail: e.target.value }))} />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Contact Phone</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={tempContent.contactPhone} onChange={(e) => setTempContent((x) => ({ ...x, contactPhone: e.target.value }))} />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Contact Address</label>
            <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={tempContent.contactAddress} onChange={(e) => setTempContent((x) => ({ ...x, contactAddress: e.target.value }))} />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <button type="button" onClick={handleCancel} className="px-4 py-2 text-gray-600 rounded-md hover:bg-gray-100">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Save Changes</button>
          </div>
        </form>
      )}
    </div>
  );
}
