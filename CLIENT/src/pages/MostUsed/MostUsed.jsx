import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FaFlask, FaSyringe, FaHeartbeat, FaVial, FaExternalLinkAlt, FaArrowLeft, FaHome, FaHeadset } from "react-icons/fa";
import { Link } from "react-router-dom";

const MostUsed = () => {
  const popularTests = [
    {
      name: "Complete Blood Count",
      description: "Measures overall health and detects disorders like anemia, infection, and many other diseases",
      route: "/most-used/cbc",
      testIcon: FaFlask,
      color: "from-primary/10 to-primary/5",
      iconColor: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
      hoverBorderColor: "group-hover:border-primary/40",
      buttonBg: "bg-primary/20 hover:bg-primary/30",
      buttonText: "text-primary",
      benefits: [
        "Detects anemia, infection",
        "Monitors overall health",
        "Checks for blood disorders"
      ]
    },
    {
      name: "Diabetes Screening",
      description: "Comprehensive blood sugar level analysis including fasting and postprandial tests",
      route: "/most-used/diabetes-screening",
      testIcon: FaSyringe,
      color: "from-secondary/10 to-secondary/5",
      iconColor: "text-secondary",
      bgColor: "bg-secondary/10",
      borderColor: "border-secondary/20",
      hoverBorderColor: "group-hover:border-secondary/40",
      buttonBg: "bg-secondary/20 hover:bg-secondary/30",
      buttonText: "text-secondary",
      benefits: [
        "Early diabetes detection",
        "Monitors blood sugar control",
        "Helps prevent complications"
      ]
    },
    {
      name: "Thyroid Profile",
      description: "Complete thyroid function assessment including TSH, T3, and T4 levels",
      route: "/most-used/thyroid-profile",
      testIcon: FaHeartbeat,
      color: "from-info/10 to-info/5",
      iconColor: "text-info",
      bgColor: "bg-info/10",
      borderColor: "border-info/20",
      hoverBorderColor: "group-hover:border-info/40",
      buttonBg: "bg-info/20 hover:bg-info/30",
      buttonText: "text-info",
      benefits: [
        "Diagnoses hypothyroidism",
        "Detects hyperthyroidism",
        "Monitors thyroid treatment"
      ]
    },
    {
      name: "Lipid Profile",
      description: "Comprehensive cholesterol check including HDL, LDL, and triglycerides",
      route: "/most-used/lipid-profile",
      testIcon: FaVial,
      color: "from-primary/10 to-primary/5",
      iconColor: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
      hoverBorderColor: "group-hover:border-primary/40",
      buttonBg: "bg-primary/20 hover:bg-primary/30",
      buttonText: "text-primary",
      benefits: [
        "Assesses heart disease risk",
        "Monitors cholesterol levels",
        "Evaluates diet effectiveness"
      ]
    }
  ];

  const healthTips = [
    {
      title: "Fasting Requirements",
      content: "Most blood tests require 8-12 hours of fasting. Drink water but avoid food, coffee, or tea."
    },
    {
      title: "Medication Disclosure",
      content: "Inform your doctor about all medications as some can affect test results."
    },
    {
      title: "Best Time for Tests",
      content: "Morning is ideal for most tests as hormone levels are most stable."
    },
    {
      title: "Hydration Matters",
      content: "Being well-hydrated makes blood draws easier and more comfortable."
    }
  ];

  return (
    <section className="relative py-16 md:py-24 bg-gradient-to-b from-bg-primary to-bg-secondary/90 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[120px] opacity-60" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-info/5 rounded-full blur-[100px] opacity-40" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Back Button - Centered */}
        <div className="flex  mb-8">
          <Link 
            to="/" 
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/90 hover:bg-white text-primary font-medium shadow-sm hover:shadow-md transition-all duration-300 border border-border-light"
          >
            <FaArrowLeft className="text-primary" />
            Back to Home
          </Link>
        </div>

        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-3">
            <span className="inline-block py-1.5 px-4 text-sm font-semibold text-primary bg-primary-light/10 rounded-full uppercase tracking-wider border border-primary/20">
              Popular Diagnostics
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            Most Commonly Booked <span className="text-primary relative">
              Health Tests
              <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 140 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 3C48 3 92 3 138 3" stroke="#09acb4" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Essential health screenings recommended by medical professionals for proactive healthcare
          </p>
        </div>

        {/* Tests Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20">
          {popularTests.map((test, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl bg-bg-primary/90 backdrop-blur-sm border ${test.borderColor} ${test.hoverBorderColor} transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1.5`}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${test.color} opacity-30 group-hover:opacity-50 transition-opacity duration-300`} />

              {/* Content */}
              <div className="relative p-6 flex flex-col h-full">
                {/* Test Icon */}
                <div className={`w-14 h-14 rounded-xl ${test.bgColor} flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-300 ease-in-out`}>
                  <test.testIcon className={`w-6 h-6 ${test.iconColor}`} aria-hidden="true" />
                </div>

                {/* Test Name */}
                <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-primary transition-colors duration-300">
                  {test.name}
                </h3>

                {/* Test Description */}
                <p className="text-text-secondary/90 text-sm mb-4">{test.description}</p>

                {/* Benefits List */}
                <ul className="mb-5 space-y-1.5">
                  {test.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start text-xs text-text-secondary">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-1.5 mr-2"></span>
                      {benefit}
                    </li>
                  ))}
                </ul>

                {/* View button */}
                <div className="mt-auto pt-3">
                  <Link to={test.route}>
                    <button
                      className={`w-full flex items-center justify-between ${test.buttonBg} ${test.buttonText} rounded-lg py-2.5 px-4 font-medium text-sm transition-all duration-300 ease-in-out hover:shadow-sm`}
                    >
                      <span>View Details</span>
                      <FaExternalLinkAlt size={12} />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Why Testing Matters Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-10 mb-16 border border-border-light shadow-sm">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">
              The Importance of Regular Health Testing
            </h3>
            <p className="text-lg text-text-secondary mb-8">
              Preventive health screenings can detect potential health issues before symptoms appear, allowing for early intervention and better outcomes.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mb-10">
              <div className="bg-bg-secondary/50 p-6 rounded-xl border border-border-light">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <FaHeartbeat className="text-primary text-xl" />
                </div>
                <h4 className="font-bold text-text-primary mb-2">Early Detection</h4>
                <p className="text-sm text-text-secondary/90">
                  Identifies health problems at their most treatable stages, often before symptoms develop.
                </p>
              </div>
              <div className="bg-bg-secondary/50 p-6 rounded-xl border border-border-light">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <FaFlask className="text-secondary text-xl" />
                </div>
                <h4 className="font-bold text-text-primary mb-2">Preventive Care</h4>
                <p className="text-sm text-text-secondary/90">
                  Helps prevent diseases or detect them early enough for more effective treatment.
                </p>
              </div>
              <div className="bg-bg-secondary/50 p-6 rounded-xl border border-border-light">
                <div className="w-12 h-12 bg-info/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <FaVial className="text-info text-xl" />
                </div>
                <h4 className="font-bold text-text-primary mb-2">Peace of Mind</h4>
                <p className="text-sm text-text-secondary/90">
                  Regular testing provides reassurance about your health status and reduces anxiety.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Preparation Tips Section */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-text-primary mb-2">
            Test Preparation Guidelines
          </h3>
          <p className="text-lg text-center text-text-secondary mb-8 max-w-3xl mx-auto">
            Follow these tips to ensure accurate test results and a smooth testing experience
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {healthTips.map((tip, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-border-light hover:border-primary/30 transition-colors duration-300">
                <h4 className="font-bold text-text-primary mb-3 flex items-center">
                  <span className="w-6 h-6 rounded-md bg-primary/10 text-primary flex items-center justify-center mr-3 text-sm">
                    {index + 1}
                  </span>
                  {tip.title}
                </h4>
                <p className="text-sm text-text-secondary/90">{tip.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 md:p-10 text-center border border-border-light">
          <h3 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
            Ready to Take Control of Your Health?
          </h3>
          <p className="text-lg text-text-secondary mb-6 max-w-2xl mx-auto">
            Book your tests today and get personalized insights about your health status
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/all-tests" 
              className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2"
            >
              Browse All Tests <AiOutlineArrowRight />
            </Link>
            <Link 
              to="/contact" 
              className="px-6 py-3 bg-white hover:bg-bg-secondary text-primary font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2 border border-border-light"
            >
              Contact Our Experts <FaHeadset />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MostUsed;