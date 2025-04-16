import { useNavigate } from 'react-router-dom';
import { FaStethoscope, FaLungs, FaHeadSideCough, FaHeartbeat, FaTired, FaCapsules, FaTemperatureHigh, FaFrownOpen, FaSyringe } from "react-icons/fa"; 

const MostAskedSymptoms = () => {
  const navigate = useNavigate();
  
  const commonSymptoms = [
    { name: "Fever", icon: FaTemperatureHigh },
    { name: "Cough", icon: FaHeadSideCough },
    { name: "Headache", icon: FaHeartbeat },
    { name: "Fatigue", icon: FaTired },
    { name: "Shortness of Breath", icon: FaLungs },
    { name: "Sore Throat", icon: FaStethoscope }
  ];

  const handleViewAll = () => {
    navigate('/symptoms');
  };

  return (
    <section className="relative py-16 bg-gradient-to-b from-bg-primary to-bg-secondary overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Section with Title and View All Button */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary">Common Symptoms</h2>
          </div>
          <div className="mt-4 md:mt-0">
            <button 
              onClick={handleViewAll}
              className="group relative px-5 py-2.5 bg-primary text-text-white rounded-lg 
                hover:bg-primary-dark transition-all duration-500
                shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30
                overflow-hidden inline-flex items-center text-sm"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <span>View All Symptoms</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-500" 
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary 
                opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
          </div>
        </div>

        {/* Description Section */}
        <div className="mb-8">
          <p className="text-lg text-text-secondary max-w-2xl">
            Track and monitor your health with our comprehensive symptom database. Learn about common symptoms, 
            their potential causes, and when to seek medical attention.
          </p>
        </div>

        {/* Symptoms Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {commonSymptoms.map((symptom, index) => (
            <div 
              key={index} 
              onClick={() => navigate(`/symptoms/${symptom.name.toLowerCase()}`)}
              className="group relative overflow-hidden rounded-xl 
                bg-bg-primary/30 backdrop-blur-sm
                border border-border/20 cursor-pointer
                hover:border-primary/30 transition-all duration-500
                hover:shadow-md hover:shadow-primary/10"
            >
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent 
                opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Content */}
              <div className="relative p-4 flex flex-col items-center space-y-2">
                {/* Icon container */}
                <div className="w-12 h-12 rounded-xl bg-primary/10 
                  flex items-center justify-center
                  group-hover:bg-primary/20 group-hover:scale-110 
                  transition-all duration-500">
                  <symptom.icon className="w-6 h-6 text-primary" />
                </div>
                
                {/* Text content */}
                <div className="text-center">
                  <h3 className="text-base font-semibold text-text-primary 
                    group-hover:text-primary transition-colors duration-500">
                    {symptom.name}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MostAskedSymptoms;
