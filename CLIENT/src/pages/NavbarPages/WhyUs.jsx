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
      description: "At TestSahulat, we prioritize your well-being by delivering personalized and transparent healthcare solutions.",
      color: "primary",
      animation: "fade-right"
    },
    {
      icon: FaMicroscope,
      title: "Advanced Diagnostics",
      description: "Access the latest in medical testing with AI-driven recommendations and reliable results.",
      color: "secondary",
      animation: "fade-left"
    },
    {
      icon: FaHandsHelping,
      title: "Trusted Support",
      description: "Our team ensures a smooth experience, providing guidance and support at every step of your healthcare journey.",
      color: "info",
      animation: "fade-right"
    },
    {
      icon: FaCogs,
      title: "Seamless Technology",
      description: "We combine innovative tools with user-friendly interfaces to make healthcare services easily accessible.",
      color: "primary",
      animation: "fade-left"
    }
  ];

  return (
    <section id="why-us" className="py-20 bg-gradient-to-b from-bg-primary to-bg-secondary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary-light/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-light/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <div className="inline-block mb-3">
            <span className="inline-block py-1 px-3 text-xs font-semibold text-primary bg-primary-light/10 rounded-full uppercase tracking-wider">
              Why Choose Us
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6 relative inline-block">
            Why Choose <span className="text-primary relative">
              TestSahulat
              <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 124 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3C46.4 3 81.6667 3 121 3" stroke="#09acb4" strokeWidth="5" strokeLinecap="round"/>
              </svg>
            </span>
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto text-justify">
            We revolutionize healthcare with cutting-edge technology, ensuring better medical decisions, 
            seamless access to services, and a patient-first experience.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`group relative bg-bg-primary rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-border-light hover:border-${feature.color}/30`}
              data-aos={feature.animation}
              data-aos-delay={index * 100}
            >
              <div className="flex items-start gap-6">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-lg bg-${feature.color}/10 
                  flex items-center justify-center flex-shrink-0 border border-${feature.color}/20
                  group-hover:bg-${feature.color}/20 transition-all duration-300`}>
                  <feature.icon className={`w-7 h-7 text-${feature.color}`} aria-hidden="true" />
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <h3 className={`text-xl font-bold text-${feature.color} mb-3 group-hover:text-${feature.color}-hover transition-colors duration-300`}>
                    {feature.title}
                  </h3>
                  <p className="text-text-secondary">
                    {feature.description}
                  </p>
                </div>
              </div>
              
              {/* Decorative Elements */}
              <div className={`absolute w-3 h-3 rounded-full bg-${feature.color}/50 top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="mt-16 text-center">
          <a 
            href="/labs" 
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary hover:bg-primary-hover text-white font-medium transition-all duration-300 transform hover:scale-105 shadow-primary hover:shadow-lg"
          >
            Get Started With TestSahulat
            <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
