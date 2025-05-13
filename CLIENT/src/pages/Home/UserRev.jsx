import React, { useEffect, useState } from "react";
import { FaStar, FaMapMarkerAlt, FaQuoteLeft, FaUserCircle, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";

const LabReviews = () => {
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = React.useRef(null);

  useEffect(() => {
    const fetchLabsAndReviews = async () => {
      setLoading(true);
      try {
        // Fetch all labs
        const { data } = await axios.get("/api/labs/public");
        const labsData = data.labs || [];
        // Fetch reviews for each lab
        const reviewsPromises = labsData.map(lab =>
          axios.get(`/api/labs/${lab._id}/reviews`).then(res => res.data.reviews || [])
        );
        const allReviews = await Promise.all(reviewsPromises);
        // Attach reviews to labs
        const labsWithReviews = labsData.map((lab, idx) => ({
          ...lab,
          reviews: allReviews[idx],
        }));
        setLabs(labsWithReviews);
      } catch (err) {
        setLabs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLabsAndReviews();
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={
            "inline-block mr-0.5 " +
            (rating >= i ? "text-yellow-400" : rating >= i - 0.5 ? "text-yellow-300" : "text-gray-300")
          }
        />
      );
    }
    return <span className="flex items-center">{stars}</span>;
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <section className="relative py-12 bg-gradient-to-b from-bg-primary to-bg-secondary overflow-hidden min-h-screen">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[80px] animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[80px] animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-4">
          <div className="text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-2 md:mb-1">
              Lab Reviews & Ratings
            </h2>
            <p className="text-lg text-text-secondary max-w-xl">
              Real feedback from users for every lab on our platform
            </p>
          </div>
          <a
            href="/our-partners"
            className="px-8 py-3 rounded-full bg-primary text-white font-bold shadow-lg hover:bg-primary-dark transition-colors duration-300 text-lg whitespace-nowrap mt-4 md:mt-0"
          >
            View All Lab Reviews
          </a>
        </div>

        {/* Lab Review Cards Carousel */}
        <div className="relative">
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-primary text-primary hover:text-white rounded-full shadow p-2 transition-colors duration-200"
            style={{ display: 'flex', alignItems: 'center' }}
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            <FaChevronLeft size={22} />
          </button>
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto pb-4 hide-scrollbar scrollbar-hide"
            style={{ scrollBehavior: 'smooth' }}
          >
            {labs.map((lab) => (
              <div
                key={lab._id}
                className="min-w-[340px] max-w-[340px] group relative overflow-hidden rounded-2xl bg-white/90 backdrop-blur-md border border-border/20 hover:border-primary/40 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1.5 p-7 flex flex-col"
              >
                {/* Lab Info */}
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={lab.image || "/default-lab.jpg"}
                    alt={lab.name}
                    className="w-20 h-20 rounded-xl object-cover border-2 border-primary/20 shadow"
                    onError={e => (e.target.src = "/default-lab.jpg")}
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-text-primary mb-1 group-hover:text-primary transition-colors duration-500">
                      {lab.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-text-secondary mb-1">
                      <FaMapMarkerAlt className="text-primary" />
                      <span>{lab.location || lab.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {renderStars(lab.rating || 0)}
                      <span className="ml-1 text-primary font-semibold">{lab.rating?.toFixed(1) || "New"}</span>
                      <span className="text-xs text-gray-500 ml-2">({lab.ratingCount || lab.reviews.length} reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Recent Reviews */}
                <div className="flex-1">
                  {lab.reviews && lab.reviews.length > 0 ? (
                    <div className="space-y-4">
                      {lab.reviews.slice(0, 2).map((review) => (
                        <div key={review._id} className="bg-bg-primary/40 rounded-lg p-4 border border-border/10">
                          <div className="flex items-center gap-2 mb-2">
                            {review.user?.image ? (
                              <img src={review.user.image} alt={review.user.firstName} className="w-8 h-8 rounded-full object-cover" />
                            ) : (
                              <FaUserCircle className="w-8 h-8 text-primary/40" />
                            )}
                            <span className="font-semibold text-text-primary">{review.user?.firstName} {review.user?.lastName}</span>
                            <span className="text-xs text-gray-500 ml-auto">{new Date(review.createdAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1 mb-1">
                            {renderStars(review.rating)}
                            <span className="text-xs text-gray-500 ml-2">{review.rating} / 5</span>
                          </div>
                          <p className="text-text-secondary text-sm italic">&quot;{review.comment}&quot;</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center text-gray-400 py-6">No reviews yet for this lab.</div>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-6 flex justify-between items-center">
                  <a
                    href={`/labs/${lab._id}/details`}
                    className="text-primary font-semibold hover:underline text-sm"
                  >
                    View Lab Details
                  </a>
                  <a
                    href={`/labs/${lab._id}/details#reviews`}
                    className="text-blue-600 font-semibold hover:underline text-sm"
                  >
                    View All Reviews
                  </a>
                </div>
              </div>
            ))}
          </div>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-primary text-primary hover:text-white rounded-full shadow p-2 transition-colors duration-200"
            style={{ display: 'flex', alignItems: 'center' }}
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            <FaChevronRight size={22} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default LabReviews;
