import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import {
  FaFlask,
  FaSyringe,
  FaHeartbeat,
  FaVial,
  FaExternalLinkAlt
} from "react-icons/fa";
import { Link } from "react-router-dom";

const MostUsedTest = () => {
  const popularTests = [
    {
      name: "Complete Blood Count",
      description: "Measures overall health and detects disorders",
      route: "/most-used/cbc",
      testIcon: FaFlask,
      color: "from-primary/10 to-primary/5",
      iconColor: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
      hoverBorderColor: "group-hover:border-primary/40",
      buttonBg: "bg-primary/20 hover:bg-primary/30",
      buttonText: "text-primary"
    },
    {
      name: "Diabetes Screening",
      description: "Blood sugar level analysis",
      route: "/most-used/diabetes-screening",
      testIcon: FaSyringe,
      color: "from-secondary/10 to-secondary/5",
      iconColor: "text-secondary",
      bgColor: "bg-secondary/10",
      borderColor: "border-secondary/20",
      hoverBorderColor: "group-hover:border-secondary/40",
      buttonBg: "bg-secondary/20 hover:bg-secondary/30",
      buttonText: "text-secondary"
    },
    {
      name: "Thyroid Profile",
      description: "Thyroid function assessment",
      route: "/most-used/thyroid-profile",
      testIcon: FaHeartbeat,
      color: "from-info/10 to-info/5",
      iconColor: "text-info",
      bgColor: "bg-info/10",
      borderColor: "border-info/20",
      hoverBorderColor: "group-hover:border-info/40",
      buttonBg: "bg-info/20 hover:bg-info/30",
      buttonText: "text-info"
    },
    {
      name: "Lipid Profile",
      description: "Cholesterol and triglycerides check",
      route: "/most-used/lipid-profile",
      testIcon: FaVial,
      color: "from-primary/10 to-primary/5",
      iconColor: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
      hoverBorderColor: "group-hover:border-primary/40",
      buttonBg: "bg-primary/20 hover:bg-primary/30",
      buttonText: "text-primary"
    }
  ];

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-bg-primary to-bg-secondary overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[120px] opacity-60" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-info/5 rounded-full blur-[100px] opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-3">
            <span className="inline-block py-1 px-3 text-xs font-semibold text-primary bg-primary-light/10 rounded-full uppercase tracking-wider">
              Popular Diagnostics
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            Frequently Booked <span className="text-primary relative">
              Tests
              <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 140 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 3C48 3 92 3 138 3" stroke="#09acb4" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Essential health screenings recommended by medical professionals
          </p>
        </div>

        {/* Tests Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {popularTests.map((test, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl 
                bg-bg-primary/90 backdrop-blur-sm
                border ${test.borderColor} ${test.hoverBorderColor}
                transition-all duration-500 ease-in-out
                hover:shadow-xl hover:shadow-${test.iconColor}/10
                hover:translate-y-[-8px]`}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${test.color} 
                opacity-30 group-hover:opacity-50 transition-opacity duration-500`} />

              {/* Content */}
              <div className="relative p-6 flex flex-col h-full">
                {/* Test Icon */}
                <div className={`w-16 h-16 rounded-xl ${test.bgColor} 
                  flex items-center justify-center mb-6
                  group-hover:scale-110 transition-transform duration-500 ease-in-out`}>
                  <test.testIcon className={`w-8 h-8 ${test.iconColor}`} aria-hidden="true" />
                </div>

                {/* Test Name */}
                <h3 className="text-xl font-bold text-text-primary mb-2
                  group-hover:text-primary transition-colors duration-300">
                  {test.name}
                </h3>

                {/* Test Description */}
                <p className="text-text-secondary mb-6 text-sm">
                  {test.description}
                </p>

                {/* View button */}
                <div className="mt-auto pt-4">
                  <Link to={test.route}>
                    <button
                      className={`w-full flex items-center justify-between
      ${test.buttonBg} ${test.buttonText} rounded-lg
      py-2.5 px-4 font-medium text-sm
      transition-all duration-300 ease-in-out
      hover:shadow-md`}
                    >
                      <span>View Test</span>
                      <FaExternalLinkAlt size={12} />
                    </button>
                  </Link>
                </div>

                {/* Decorative corner accent */}
                <div className={`absolute top-0 right-0 w-12 h-12 ${test.iconColor} opacity-0 
                  group-hover:opacity-10 transition-opacity duration-500
                  rounded-bl-3xl`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <Link to="/all-tests-packages">
            <button className="inline-flex items-center justify-center 
              bg-primary text-white font-semibold py-3.5 px-8 rounded-xl
              hover:bg-primary-hover transition-all duration-300 ease-in-out
              hover:translate-y-[-2px] hover:shadow-lg hover:shadow-primary/20
              focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2">
              Browse All Tests
              <AiOutlineArrowRight className="ml-2.5 w-5 h-5" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MostUsedTest;