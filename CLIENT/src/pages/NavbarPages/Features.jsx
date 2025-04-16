import { FiActivity,  FiShield, FiUserCheck } from "react-icons/fi"; 
import {FaCalendarCheck, FaFlask, FaInfoCircle, FaRobot, FaShieldAlt } from "react-icons/fa";

const Features = () => {
  const features = [
    {
      icon: FiActivity,
      title: "AI-Powered Analysis",
      description: "Smart health insights using advanced AI technology"
    },
    {
      icon: FaFlask,
      title: "Lab Network",
      description: "Access to certified laboratories nationwide"
    },
    {
      icon: FiShield,
      title: "Data Privacy & Security",
      description: "Your health data is protected with strict security protocols and encryption."
    },
    {
      icon: FiUserCheck,
      title: "Expert Support",
      description: "24/7 access to healthcare professionals"
    },
    {
      icon: FaShieldAlt,
      title: "Trusted Labs",
      description: "All our partner laboratories are NABL accredited and follow strict quality protocols"
    },
    {
      icon: FaRobot,
      title: "Personalized Healthcare",
      description: "Tailored test suggestions empower patients to make informed decisions independently."
    },
    {
      icon: FaCalendarCheck,
      title: "Easy Scheduling",
      description: "Book lab tests seamlessly through our user-friendly platform for convenience."
    },
    {
      icon: FaInfoCircle,
      title: "Centralized Test Information",
      description: "Access comprehensive lab test details, pricing, and instructions for informed healthcare decisions"
    }
  ];

  return (
    <section className="py-20 bg-bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-text-primary mb-4">Our Features</h2>
          <p className="text-text-secondary">Experience healthcare reimagined with our innovative solutions</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-6 bg-bg-primary rounded-2xl shadow-primary hover:scale-105 transition-transform duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold text-text-primary mb-2">{feature.title}</h3>
                <p className="text-text-secondary">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

