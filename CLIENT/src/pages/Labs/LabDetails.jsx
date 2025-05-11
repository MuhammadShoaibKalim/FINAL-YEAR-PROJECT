import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaStar, FaMapMarkerAlt, FaArrowLeft, FaPhone, FaEnvelope, FaClock } from "react-icons/fa";
import { toast } from "react-hot-toast";

export default function LabDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lab, setLab] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchLabAndReviews = async () => {
      try {
        const [labRes, reviewsRes] = await Promise.all([
          axios.get(`/api/labs/public/${id}`),
          axios.get(`/api/labs/${id}/reviews`)
        ]);
        setLab(labRes.data.lab);
        setReviews(reviewsRes.data.reviews);
      } catch (error) {
        console.error("Error fetching lab details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLabAndReviews();
  }, [id]);

  const handleSubmitReview = async () => {
    if (!userRating || !reviewText.trim()) {
      toast.error("Please provide both rating and review text");
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await axios.post(`/api/labs/${id}/reviews`, {
        rating: userRating,
        comment: reviewText
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
      });

      // Update reviews list
      const reviewsRes = await axios.get(`/api/labs/${id}/reviews`);
      setReviews(reviewsRes.data.reviews);

      // Update lab data to get new rating
      const labRes = await axios.get(`/api/labs/public/${id}`);
      setLab(labRes.data.lab);

      toast.success("Review submitted successfully!");
      setUserRating(0);
      setReviewText("");
    } catch (error) {
      console.error("Error submitting review", error);
      toast.error(error.response?.data?.message || "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <p className="text-center text-primary mt-32">Loading lab details...</p>;
  }

  if (!lab) {
    return <p className="text-center text-error mt-32">Lab not found.</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-primary hover:underline font-medium text-lg mb-8"
      >
        <FaArrowLeft className="text-primary" />
        Back to Labs
      </button>

      {/* Lab Header */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="relative h-96">
          <img
            src={lab.image}
            alt={lab.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{lab.name}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <FaStar className="text-yellow-400" />
                <span className="font-semibold">{lab.rating?.toFixed(1) || 'New'}</span>
              </div>
              <a 
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lab.address + ', ' + lab.location)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <FaMapMarkerAlt />
                <span>{lab.address}, {lab.location}</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-8">
          {/* Introduction */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Introduction</h2>
            <p className="text-gray-600 leading-relaxed">{lab.description}</p>
          </div>

          {/* Reviews Section */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Reviews & Ratings</h2>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-400" />
                  <span className="font-semibold">{lab.rating?.toFixed(1) || 'New'}</span>
                </div>
                <span className="text-gray-500">({lab.ratingCount || 0} reviews)</span>
              </div>
            </div>
            
            {/* Add Review Form */}
            <div className="mb-8 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
              <div className="flex items-center gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setUserRating(star)}
                    className={`text-2xl transition-colors ${
                      star <= userRating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  >
                    <FaStar />
                  </button>
                ))}
              </div>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Write your review..."
                className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-primary focus:border-primary"
                rows="3"
              />
              <button
                onClick={handleSubmitReview}
                disabled={isSubmitting}
                className={`bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </div>

            {/* Reviews List */}
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review._id} className="border-b pb-6 last:border-b-0">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`text-sm ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="font-medium">{review.user.firstName} {review.user.lastName}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
              {reviews.length === 0 && (
                <p className="text-center text-gray-500 py-4">No reviews yet. Be the first to review!</p>
              )}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FaPhone className="text-primary" />
                <span className="text-gray-600">{lab.phone || 'Not available'}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-primary" />
                <span className="text-gray-600">{lab.email || 'Not available'}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaClock className="text-primary" />
                <span className="text-gray-600">{lab.timing || 'Not available'}</span>
              </div>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-primary" />
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lab.address + ', ' + lab.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Tests & Packages</h2>
            <p className="text-gray-600 mb-4">Explore our comprehensive range of diagnostic tests and health packages.</p>
            <button
              onClick={() => navigate(`/labs/${id}/testpackage`)}
              className="w-full bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors"
            >
              View All Tests & Packages
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
