import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const OurPartner = () => {
  const [labs, setLabs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLabs = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/labs/public");
        const data = await res.json();
        setLabs(data.labs || []);
      } catch (err) {
        setLabs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchLabs();
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-b from-bg-primary to-bg-secondary py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-2">All Lab Partners</h1>
          <p className="text-lg text-text-secondary max-w-xl">
            Explore all our partner labs and their details.
          </p>
        </div>
        {/* Labs Grid */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[40vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {labs.map((lab) => (
              <div
                key={lab._id}
                className="bg-bg-primary rounded-2xl shadow-lg border border-border p-8 flex flex-col gap-4 hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={lab.image || "/default-lab.jpg"}
                  alt={lab.name}
                  className="w-28 h-28 rounded-xl object-cover border-2 border-primary/20 shadow mx-auto mb-2"
                  onError={e => (e.target.src = "/default-lab.jpg")}
                />
                <h3 className="text-xl font-bold text-text-primary text-center mb-1">{lab.name}</h3>
                <div className="flex items-center gap-2 text-sm text-text-secondary justify-center">
                  <FaMapMarkerAlt className="text-primary" />
                  <span>{lab.location || lab.address}</span>
                </div>
                {lab.address && (
                  <div className="text-sm text-text-secondary text-center">{lab.address}</div>
                )}
                {lab.phone && (
                  <div className="flex items-center gap-2 text-sm text-text-secondary justify-center">
                    <FaPhoneAlt className="text-primary" />
                    <span>{lab.phone}</span>
                  </div>
                )}
                {lab.email && (
                  <div className="flex items-center gap-2 text-sm text-text-secondary justify-center">
                    <FaEnvelope className="text-primary" />
                    <span>{lab.email}</span>
                  </div>
                )}
                {lab.description && (
                  <div className="text-sm text-text-secondary mt-2 text-center">{lab.description}</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default OurPartner; 