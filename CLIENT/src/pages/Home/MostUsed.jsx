import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { 
  FaFlask, 
  FaSyringe, 
  FaHeartbeat, 
  FaVial,
  FaHospital,
  FaClinicMedical,
  FaMicroscope
} from "react-icons/fa"; 
import { Link } from "react-router-dom";

const FBookedTest = () => {
  const popularTests = [
    {
      name: "Complete Blood Count",
      lab: "City Medical Lab",
      labIcon: FaHospital,
      testIcon: FaFlask,
      color: "from-primary/10 to-primary/5",
      iconColor: "text-primary",
      link: "/labs/city-medical-lab/cbc"
    },
    {
      name: "Diabetes Screening",
      lab: "HealthCare Diagnostics",
      labIcon: FaClinicMedical,
      testIcon: FaSyringe,
      color: "from-secondary/10 to-secondary/5",
      iconColor: "text-secondary",
      link: "/labs/healthcare-diagnostics/diabetes"
    },
    {
      name: "Thyroid Profile",
      lab: "Advanced Lab Services",
      labIcon: FaMicroscope,
      testIcon: FaHeartbeat,
      color: "from-accent/10 to-accent/5",
      iconColor: "text-accent",
      link: "/labs/advanced-lab/thyroid"
    },
    {
      name: "Lipid Profile",
      lab: "City Medical Lab",
      labIcon: FaHospital,
      testIcon: FaVial,
      color: "from-primary/10 to-primary/5",
      iconColor: "text-primary",
      link: "/labs/city-medical-lab/lipid"
    }
  ];

  return (
    <section className="relative py-12 bg-gradient-to-b from-bg-primary to-bg-secondary overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Most Popular Tests
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Frequently booked diagnostic tests from our partner labs
          </p>
        </div>

        {/* Tests Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularTests.map((test, index) => (
            <Link to={test.link} key={index}>
              <div 
                className="group relative overflow-hidden rounded-xl 
                  bg-bg-primary/30 backdrop-blur-sm
                  border border-border/20
                  hover:border-primary/30 transition-all duration-500
                  hover:shadow-lg hover:shadow-primary/10
                  hover:translate-y-[-4px]"
              >
                {/* Hover effect overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${test.color} 
                  opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                {/* Content */}
                <div className="relative p-6">
                  {/* Lab Info */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`w-8 h-8 rounded-lg ${test.color} 
                      flex items-center justify-center`}>
                      <test.labIcon className={`w-4 h-4 ${test.iconColor}`} />
                    </div>
                    <span className="text-sm text-text-secondary">
                      {test.lab}
                    </span>
                  </div>

                  {/* Test Icon */}
                  <div className={`w-12 h-12 rounded-lg ${test.color} 
                    flex items-center justify-center mb-4
                    group-hover:scale-110 transition-transform duration-500`}>
                    <test.testIcon className={`w-6 h-6 ${test.iconColor}`} />
                  </div>
                  
                  {/* Test Name */}
                  <h3 className="text-lg font-semibold text-text-primary 
                    group-hover:text-primary transition-colors duration-500">
                    {test.name}
                  </h3>

                  {/* Hover indicator */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-primary/0 
                    group-hover:bg-primary/30 transition-all duration-500" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to="/labs">
            <button className="inline-flex items-center justify-center 
              bg-primary text-white font-medium py-3 px-6 rounded-lg
              hover:bg-primary/90 transition-all duration-300
              hover:translate-y-[-2px] hover:shadow-lg hover:shadow-primary/20">
              View All Labs
              <AiOutlineArrowRight className="ml-2" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FBookedTest;
