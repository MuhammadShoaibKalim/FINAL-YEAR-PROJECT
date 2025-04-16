import React from "react";
import {
  FaHeartbeat,
  FaMicroscope,
  FaHandsHelping,
  FaCogs,
} from "react-icons/fa";

const WhyUs = () => {
  const features = [
    {
      icon: FaHeartbeat,
      title: "Patient-Centric Care",
      description: "At LabCore, we prioritize your well-being by delivering personalized and transparent healthcare solutions.",
      color: "text-primary"
    },
    {
      icon: FaMicroscope,
      title: "Advanced Diagnostics",
      description: "Access the latest in medical testing with AI-driven recommendations and reliable results.",
      color: "text-secondary"
    },
    {
      icon: FaHandsHelping,
      title: "Trusted Support",
      description: "Our team ensures a smooth experience, providing guidance and support at every step of your healthcare journey.",
      color: "text-accent"
    },
    {
      icon: FaCogs,
      title: "Seamless Technology",
      description: "We combine innovative tools with user-friendly interfaces to make healthcare services easily accessible.",
      color: "text-primary"
    }
  ];

  return (
    <div className="py-16 bg-bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Why Choose <span className="text-primary">LabCore</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto text-justify">
            We revolutionize healthcare with cutting-edge technology, ensuring better medical decisions, 
            seamless access to services, and a patient-first experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6">
              <div className="flex flex-col items-center gap-4">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-lg ${feature.color}/10 
                  flex items-center justify-center flex-shrink-0`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                
                {/* Title and Description */}
                <div className="text-center">
                  <h3 className={`text-xl font-bold ${feature.color} mb-2`}>
                    {feature.title}
                  </h3>
                </div>
                <div className="w-full">
                  <p className="text-text-secondary text-justify">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
