import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FaStar, FaMapMarkerAlt, FaArrowLeft } from "react-icons/fa";

export default function LabDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lab, setLab] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLab = async () => {
      try {
        const { data } = await axios.get(`/api/labs/public/${id}`);
        setLab(data.lab);
      } catch (error) {
        console.error("Error fetching lab details", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLab();
  }, [id]);

  if (loading) {
    return <p className="text-center text-primary mt-32">Loading lab details...</p>;
  }

  if (!lab) {
    return <p className="text-center text-error mt-32">Lab not found.</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20">

      <div className="mb-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-primary hover:underline font-medium text-lg"
        >
          <FaArrowLeft className="text-primary" />
          Back to Labs
        </button>
      </div>

      <div className="flex flex-col md:flex-row bg-bg-primary rounded-4xl shadow-primary p-10 border border-border-light mb-12 items-center md:items-start gap-12">
        
        <div className="w-full md:w-1/3 flex justify-center">
          <div className="w-72 h-72 rounded-4xl overflow-hidden border-4 border-primary shadow-lg">
            <img
              src={lab.image}
              alt={lab.name}
              className="w-full h-full object-cover object-center" 
            />
          </div>
        </div>

        <div className="flex-1 relative">
          <div className="flex justify-between items-start">
            <h1 className="text-4xl md:text-5xl font-bold text-text-dark">
              {lab.name}
            </h1>

            <div className="flex items-center gap-2 bg-warning text-text-dark px-4 py-2 rounded-full shadow-md">
              <FaStar className="text-lg" />
              <span className="text-lg font-semibold">{lab.rating}</span>
            </div>
          </div>

          <div className="mt-6 text-text-primary text-lg leading-relaxed mb-8">
            {lab.description}
          </div>
          <div className="flex justify-end">
            <div className="flex items-center gap-2 text-text-secondary">
              <FaMapMarkerAlt className="text-primary" />
              <span className="text-md">{lab.address}, {lab.location}</span>
            </div>
          </div>
          
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-bold text-text-dark mb-6">Tests & Packages</h2>
        <div className="text-text-secondary text-md">
          No tests or packages available yet. (Coming soon)
        </div>
      </div>

      <div>
        <h2 className="text-3xl font-bold text-text-dark mb-6">User Feedback</h2>
        <div className="text-text-secondary text-md">
          No feedback yet. (Coming soon)
        </div>
      </div>

    </div>
  );
}
