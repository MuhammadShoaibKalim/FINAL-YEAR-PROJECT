import React, { useEffect, useState, useRef } from "react";
import { FaStar, FaMapMarkerAlt, FaUserCircle, FaChevronLeft, FaChevronRight, FaQuoteRight, FaQuoteLeft } from "react-icons/fa";
import axios from "axios";

const LabReviews = () => {
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchLabsAndReviews = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get("/api/labs/public");
        const labsData = data.labs || [];
        const reviewsPromises = labsData.map(lab =>
          axios.get(`/api/labs/${lab._id}/reviews`).then(res => res.data.reviews || [])
        );
        const allReviews = await Promise.all(reviewsPromises);
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
            (rating >= i ? "text-primary shadow-sm" : rating >= i - 0.5 ? "text-primary/70" : "text-slate-200")
          }
        />
      );
    }
    return <span className="flex items-center text-[10px]">{stars}</span>;
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
      <div className="flex flex-col gap-6 justify-center items-center min-h-[60vh] bg-white">
        <div className="w-16 h-16 border-4 border-slate-100 border-t-primary rounded-full animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Loading Clinical Feedback</p>
      </div>
    );
  }

  return (
    <section className="relative py-24 bg-slate-900 overflow-hidden font-sans">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[140px] -mr-96 -mt-96"></div>
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[140px] -ml-96 -mb-96"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
           <div className="space-y-4">
              <div className="inline-block px-4 py-1.5 bg-white/5 rounded-full border border-white/10">
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/80 leading-none">Trust & Credibility</p>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Verified <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Clinical Reviews.</span></h2>
              <p className="text-lg text-slate-400 font-medium max-w-xl">
                 Transparent feedback from patients across Pakistan helping you choose the best diagnostic experience.
              </p>
           </div>
           <a
             href="/our-partners"
             className="px-10 py-5 bg-white text-slate-900 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-primary hover:text-white transition-all active:scale-95 shadow-2xl"
           >
             Accredited Partner Index
           </a>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Controls */}
          <div className="absolute -top-12 right-0 flex gap-4">
             <button onClick={() => scroll('left')} className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-primary transition-all active:scale-90"><FaChevronLeft /></button>
             <button onClick={() => scroll('right')} className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-primary transition-all active:scale-90"><FaChevronRight /></button>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto pb-12 hide-scrollbar scroll-smooth"
          >
            {labs.map((lab) => (
              <div
                key={lab._id}
                className="min-w-[400px] max-w-[400px] group relative p-1 bg-gradient-to-br from-white/10 to-transparent rounded-[2.5rem] overflow-hidden transition-all duration-700 hover:-translate-y-2"
              >
                <div className="h-full bg-slate-800/80 backdrop-blur-3xl p-10 rounded-[2.4rem] border border-white/5 flex flex-col gap-8">
                   {/* Lab Identity */}
                   <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-[1.5rem] overflow-hidden border-2 border-primary/20 p-1 group-hover:border-primary transition-colors">
                        <img 
                          src={lab.image || "/default-lab.jpg"} 
                          alt={lab.name} 
                          className="w-full h-full object-cover rounded-[1.1rem]"
                          onError={e => (e.target.src = "/default-lab.jpg")}
                        />
                      </div>
                      <div className="space-y-1">
                         <h3 className="text-xl font-black text-white tracking-tight group-hover:text-primary transition-colors">{lab.name}</h3>
                         <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                            <FaMapMarkerAlt className="text-primary" />
                            <span className="truncate max-w-[150px]">{lab.location || lab.address}</span>
                         </div>
                         <div className="flex items-center gap-3 pt-1">
                            {renderStars(lab.rating || 0)}
                            <span className="text-[10px] font-black text-primary uppercase bg-primary/10 px-2 py-0.5 rounded-md">{lab.rating?.toFixed(1) || "New"}</span>
                         </div>
                      </div>
                   </div>

                   {/* Testimonial Quote */}
                   <div className="flex-1 relative">
                      <FaQuoteLeft className="absolute -top-4 -left-4 text-primary opacity-20 text-4xl" />
                      {lab.reviews && lab.reviews.length > 0 ? (
                        <div className="space-y-6">
                           <p className="text-slate-300 font-medium leading-relaxed italic relative z-10 text-sm">
                             " {lab.reviews[0].comment.length > 120 ? lab.reviews[0].comment.substring(0, 120) + '...' : lab.reviews[0].comment} "
                           </p>
                           <div className="flex items-center gap-3">
                              {lab.reviews[0].user?.image ? (
                                <img src={lab.reviews[0].user.image} className="w-8 h-8 rounded-full border border-white/10" />
                              ) : (
                                <FaUserCircle className="text-slate-600 text-2xl" />
                              )}
                              <div>
                                 <p className="text-[10px] font-black text-white uppercase tracking-widest">{lab.reviews[0].user?.firstName} {lab.reviews[0].user?.lastName}</p>
                                 <p className="text-[8px] font-bold text-slate-500 uppercase tracking-tighter">Verified Patient Account</p>
                              </div>
                           </div>
                        </div>
                      ) : (
                        <div className="bg-slate-900/50 rounded-2xl p-6 border border-white/5 text-center">
                           <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Awaiting First Review</p>
                        </div>
                      )}
                   </div>

                   {/* Foot Action */}
                   <div className="pt-6 border-t border-white/5 flex gap-4">
                      <a href={`/labs/${lab._id}/details`} className="flex-1 text-center py-4 bg-white/5 hover:bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">Details</a>
                      <a href={`/labs/${lab._id}/details#reviews`} className="flex-1 text-center py-4 bg-primary/10 hover:bg-primary rounded-2xl text-[10px] font-black uppercase tracking-widest text-primary hover:text-white transition-all">All Reviews</a>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LabReviews;
