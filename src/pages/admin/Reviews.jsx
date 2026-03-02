import { useState } from "react";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      guestName: "Sarah Williams",
      rating: 5,
      comment: "Amazing experience! The staff was incredibly friendly and the rooms were spotless.",
      date: "2024-01-15",
      status: "Approved",
      featured: true,
    },
    {
      id: 2,
      guestName: "Michael Chen",
      rating: 4,
      comment: "Great resort with beautiful views. Food could be better.",
      date: "2024-01-12",
      status: "Approved",
      featured: false,
    },
    {
      id: 3,
      guestName: "Emma Johnson",
      rating: 5,
      comment: "Perfect vacation spot! Will definitely come back.",
      date: "2024-01-10",
      status: "Pending",
      featured: false,
    },
  ]);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterRating, setFilterRating] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReviews = reviews.filter((r) => {
    const matches = r.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch = !filterStatus || r.status === filterStatus;
    const ratingMatch = !filterRating || r.rating.toString() === filterRating;
    return matches && statusMatch && ratingMatch;
  });

  function toggleFeature(id) {
    setReviews((list) => list.map((r) => (r.id === id ? { ...r, featured: !r.featured } : r)));
  }

  function updateReviewStatus(id, status) {
    setReviews((list) => list.map((r) => (r.id === id ? { ...r, status } : r)));
  }

  function deleteReview(id) {
    if (window.confirm("Delete this review?")) {
      setReviews((list) => list.filter((r) => r.id !== id));
    }
  }

  const avgRating = (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Guest Reviews</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="bg-yellow-100 rounded-full p-3">
                <i className="fas fa-star text-yellow-600 text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-gray-500 text-sm">Average Rating</p>
                <p className="text-2xl font-bold">{avgRating} / 5</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="bg-blue-100 rounded-full p-3">
                <i className="fas fa-check-circle text-blue-600 text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-gray-500 text-sm">Approved</p>
                <p className="text-2xl font-bold">{reviews.filter((r) => r.status === "Approved").length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="bg-green-100 rounded-full p-3">
                <i className="fas fa-heart text-green-600 text-xl"></i>
              </div>
              <div className="ml-4">
                <p className="text-gray-500 text-sm">Featured</p>
                <p className="text-2xl font-bold">{reviews.filter((r) => r.featured).length}</p>
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
              placeholder="Search reviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
          </div>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="rounded-lg border border-gray-300 px-3 py-2">
            <option value="">Filter by Status</option>
            <option value="Approved">Approved</option>
            <option value="Pending">Pending</option>
            <option value="Rejected">Rejected</option>
          </select>
          <select value={filterRating} onChange={(e) => setFilterRating(e.target.value)} className="rounded-lg border border-gray-300 px-3 py-2">
            <option value="">Filter by Rating</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>

        <div className="space-y-0">
          {filteredReviews.map((review) => (
            <div key={review.id} className="p-4 border-b hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-bold">{review.guestName}</h4>
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <i key={i} className="fas fa-star text-yellow-400 text-sm"></i>
                      ))}
                    </div>
                    {review.featured && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{review.comment}</p>
                  <p className="text-gray-400 text-xs">{review.date}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-3 flex-wrap">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  review.status === "Approved"
                    ? "bg-green-100 text-green-800"
                    : review.status === "Pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}>
                  {review.status}
                </span>
                {review.status === "Pending" && (
                  <>
                    <button onClick={() => updateReviewStatus(review.id, "Approved")} className="text-green-600 hover:text-green-900 text-sm">
                      <i className="fas fa-check mr-1"></i> Approve
                    </button>
                    <button onClick={() => updateReviewStatus(review.id, "Rejected")} className="text-red-600 hover:text-red-900 text-sm">
                      <i className="fas fa-ban mr-1"></i> Reject
                    </button>
                  </>
                )}
                <button onClick={() => toggleFeature(review.id)} className={`text-sm ${
                  review.featured ? "text-red-600 hover:text-red-900" : "text-blue-600 hover:text-blue-900"
                }`}>
                  <i className={`fas fa-heart ${review.featured ? "fas" : "far"} mr-1`}></i>
                  {review.featured ? "Unfeature" : "Feature"}
                </button>
                <button onClick={() => deleteReview(review.id)} className="text-red-600 hover:text-red-900 text-sm">
                  <i className="fas fa-trash mr-1"></i> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
