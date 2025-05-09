import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaHeartbeat, FaFlask, FaFemale, 
  FaMale, FaUserAlt, FaChild 
} from 'react-icons/fa';

const healthConcerns = [
  {
    name: "Heart Health", icon: FaHeartbeat, description: "Cardiac assessments",
    color: "from-red-500/10 to-red-600/5", border: "border-red-500/20",
    iconColor: "text-red-500", bgColor: "bg-red-500/5", style: "style1"
  },
  {
    name: "Diabetes Care", icon: FaFlask, description: "Diabetes management",
    color: "from-blue-500/10 to-blue-600/5", border: "border-blue-500/20",
    iconColor: "text-blue-500", bgColor: "bg-blue-500/5", style: "style2"
  },
  {
    name: "Women's Health", icon: FaFemale, description: "Women's screenings",
    color: "from-pink-500/10 to-pink-600/5", border: "border-pink-500/20",
    iconColor: "text-pink-500", bgColor: "bg-pink-500/5", style: "style3"
  },
  {
    name: "Men's Health", icon: FaMale, description: "Men's health checks",
    color: "from-indigo-500/10 to-indigo-600/5", border: "border-indigo-500/20",
    iconColor: "text-indigo-500", bgColor: "bg-indigo-500/5", style: "style4"
  },
  {
    name: "Senior Care", icon: FaUserAlt, description: "Elderly health",
    color: "from-purple-500/10 to-purple-600/5", border: "border-purple-500/20",
    iconColor: "text-purple-500", bgColor: "bg-purple-500/5", style: "style5"
  },
  {
    name: "Child Health", icon: FaChild, description: "Pediatric care",
    color: "from-green-500/10 to-green-600/5", border: "border-green-500/20",
    iconColor: "text-green-500", bgColor: "bg-green-500/5", style: "style6"
  }
];

const getCardStyle = (style, concern) => {
  const base = `group relative overflow-hidden rounded-xl 
    bg-bg-primary/30 backdrop-blur-sm hover:border-primary/30
    transition-all duration-500 hover:shadow-lg hover:shadow-primary/10 
    hover:translate-y-[-4px]`;

  const borders = {
    style1: `border-l-4 ${concern.border}`,
    style2: `border-t-4 ${concern.border}`,
    style3: `border-r-4 ${concern.border}`,
    style4: `border-b-4 ${concern.border}`,
    style5: `border-2 ${concern.border}`,
    style6: `border ${concern.border}`
  };

  return `${base} ${borders[style]}`;
};

const TestHealthConcern = () => {
  const navigate = useNavigate();

  const handleCardClick = (concernName) => {
    const path = concernName.toLowerCase().replace(/\s+/g, '-');
    navigate(`/${path}`);
  };

  return (
    <section className="px-6 py-12 max-w-7xl mx-auto">
      {/* Back to home */}
      <div className="mb-6">
        <button 
          onClick={() => navigate('/')} 
          className="text-sm text-primary hover:underline"
        >
          ← Back to Home
        </button>
      </div>

      {/* Title and description */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-text-primary mb-4">Tests by Health Concern</h1>
        <p className="text-lg text-text-secondary">
          Explore targeted health tests based on your specific concern. Each section offers
          expert-recommended test packages to help you monitor and manage your health.
        </p>
      </div>

      {/* Test cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
        {healthConcerns.map((concern, index) => (
          <div 
            key={index}
            className={getCardStyle(concern.style, concern)}
            onClick={() => handleCardClick(concern.name)}
            style={{ cursor: 'pointer' }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${concern.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            <div className="relative p-4">
              <div className={`w-10 h-10 rounded-lg ${concern.bgColor} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-500`}>
                <concern.icon className={`w-5 h-5 ${concern.iconColor}`} />
              </div>
              <div>
                <h3 className="text-base font-semibold text-text-primary group-hover:text-primary transition-colors duration-500">
                  {concern.name}
                </h3>
                <p className="text-sm text-text-secondary mt-1">{concern.description}</p>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-primary/0 group-hover:bg-primary/30 transition-all duration-500" />
            </div>
          </div>
        ))}
      </div>

      {/* Additional information */}
      <div className="bg-bg-primary/20 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold text-text-primary mb-4">Why Health Concern Based Testing?</h2>
        <p className="text-text-secondary mb-2">
          Health concern-based testing allows individuals to take control of their health by focusing on
          specific symptoms, risks, or medical advice. Instead of general testing, these packages are curated
          to help detect early signs of illness, monitor ongoing conditions, and guide treatment decisions.
        </p>
        <p className="text-text-secondary">
          These tests are recommended by healthcare professionals and are tailored for proactive wellness and
          preventive care. Select the category that best matches your current concern to see what's offered.
        </p>
      </div>
    </section>
  );
};

export default TestHealthConcern;
