import React from 'react';
import { 
  FaHeartbeat, 
  FaFlask, 
  FaFemale, 
  FaMale, 
  FaUserAlt, 
  FaChild 
} from 'react-icons/fa';

export const TestByHConcern = () => {
  const healthConcerns = [
    {
      name: "Heart Health",
      icon: FaHeartbeat,
      description: "Cardiac assessments",
      color: "from-red-500/10 to-red-600/5",
      border: "border-red-500/20",
      iconColor: "text-red-500",
      bgColor: "bg-red-500/5",
      style: "style1"
    },
    {
      name: "Diabetes Care",
      icon: FaFlask,
      description: "Diabetes management",
      color: "from-blue-500/10 to-blue-600/5",
      border: "border-blue-500/20",
      iconColor: "text-blue-500",
      bgColor: "bg-blue-500/5",
      style: "style2"
    },
    {
      name: "Women's Health",
      icon: FaFemale,
      description: "Women's screenings",
      color: "from-pink-500/10 to-pink-600/5",
      border: "border-pink-500/20",
      iconColor: "text-pink-500",
      bgColor: "bg-pink-500/5",
      style: "style3"
    },
    {
      name: "Men's Health",
      icon: FaMale,
      description: "Men's health checks",
      color: "from-indigo-500/10 to-indigo-600/5",
      border: "border-indigo-500/20",
      iconColor: "text-indigo-500",
      bgColor: "bg-indigo-500/5",
      style: "style4"
    },
    {
      name: "Senior Care",
      icon: FaUserAlt,
      description: "Elderly health",
      color: "from-purple-500/10 to-purple-600/5",
      border: "border-purple-500/20",
      iconColor: "text-purple-500",
      bgColor: "bg-purple-500/5",
      style: "style5"
    },
    {
      name: "Child Health",
      icon: FaChild,
      description: "Pediatric care",
      color: "from-green-500/10 to-green-600/5",
      border: "border-green-500/20",
      iconColor: "text-green-500",
      bgColor: "bg-green-500/5",
      style: "style6"
    }
  ];

  const getCardStyle = (style, concern) => {
    switch(style) {
      case 'style1':
        return `group relative overflow-hidden rounded-xl 
          bg-bg-primary/30 backdrop-blur-sm
          border-l-4 ${concern.border}
          hover:border-primary/30 transition-all duration-500
          hover:shadow-lg hover:shadow-primary/10
          hover:translate-y-[-4px]`;
      case 'style2':
        return `group relative overflow-hidden rounded-xl 
          bg-bg-primary/30 backdrop-blur-sm
          border-t-4 ${concern.border}
          hover:border-primary/30 transition-all duration-500
          hover:shadow-lg hover:shadow-primary/10
          hover:translate-y-[-4px]`;
      case 'style3':
        return `group relative overflow-hidden rounded-xl 
          bg-bg-primary/30 backdrop-blur-sm
          border-r-4 ${concern.border}
          hover:border-primary/30 transition-all duration-500
          hover:shadow-lg hover:shadow-primary/10
          hover:translate-y-[-4px]`;
      case 'style4':
        return `group relative overflow-hidden rounded-xl 
          bg-bg-primary/30 backdrop-blur-sm
          border-b-4 ${concern.border}
          hover:border-primary/30 transition-all duration-500
          hover:shadow-lg hover:shadow-primary/10
          hover:translate-y-[-4px]`;
      case 'style5':
        return `group relative overflow-hidden rounded-xl 
          bg-bg-primary/30 backdrop-blur-sm
          border-2 ${concern.border}
          hover:border-primary/30 transition-all duration-500
          hover:shadow-lg hover:shadow-primary/10
          hover:translate-y-[-4px]`;
      case 'style6':
        return `group relative overflow-hidden rounded-xl 
          bg-bg-primary/30 backdrop-blur-sm
          border ${concern.border}
          hover:border-primary/30 transition-all duration-500
          hover:shadow-lg hover:shadow-primary/10
          hover:translate-y-[-4px]`;
      default:
        return '';
    }
  };

  return (
    <section className="relative py-16 bg-gradient-to-b from-bg-primary to-bg-secondary overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Tests by Health Concern
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Comprehensive test packages tailored to specific health needs
          </p>
        </div>

        {/* Health Concerns Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {healthConcerns.map((concern, index) => (
            <div 
              key={index}
              className={getCardStyle(concern.style, concern)}
            >
              {/* Hover effect overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${concern.color} 
                opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              {/* Content */}
              <div className="relative p-4">
                {/* Icon */}
                <div className={`w-10 h-10 rounded-lg ${concern.bgColor} 
                  flex items-center justify-center mb-3
                  group-hover:scale-110 transition-transform duration-500`}>
                  <concern.icon className={`w-5 h-5 ${concern.iconColor}`} />
                </div>
                
                {/* Title and Description */}
                <div>
                  <h3 className="text-base font-semibold text-text-primary 
                    group-hover:text-primary transition-colors duration-500">
                    {concern.name}
                  </h3>
                  <p className="text-sm text-text-secondary mt-1">
                    {concern.description}
                  </p>
                </div>

                {/* Hover indicator */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-primary/0 
                  group-hover:bg-primary/30 transition-all duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestByHConcern;
