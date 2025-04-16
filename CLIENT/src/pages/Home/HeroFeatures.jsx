import { FiActivity, FiShield, FiUserCheck } from "react-icons/fi"; 
import { FaCalendarCheck, FaFlask, FaInfoCircle, FaRobot, FaShieldAlt } from "react-icons/fa";

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
    <section className="relative py-12 bg-gradient-to-b from-bg-primary to-bg-secondary">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-text-primary mb-6">Our Features</h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Experience healthcare reimagined with our innovative solutions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group p-8 bg-bg-primary/50 backdrop-blur-sm rounded-2xl border border-border/20 
                shadow-lg shadow-primary/5
                hover:border-primary/30 transition-all duration-300 
                hover:shadow-2xl hover:shadow-primary/30 
                hover:-translate-y-2 hover:scale-[1.02]
                hover:bg-bg-primary/80"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-4 bg-primary/10 rounded-xl mb-6 
                  group-hover:bg-primary/20 group-hover:scale-110 
                  transition-all duration-300">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3 
                  group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-text-secondary leading-relaxed 
                  group-hover:text-text-primary/90 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

/*

*/ 
