import React from 'react';
import { FaArrowLeft, FaUserAlt, FaClipboardList, FaUserMd, FaBone, FaBrain } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SeniorCarePage = () => {
  // Senior-specific tests
  const tests = [
    { name: "Bone Density Scan", description: "Detects osteoporosis risk" },
    { name: "Cognitive Function Test", description: "Assesses memory and brain health" },
    { name: "Comprehensive Metabolic Panel", description: "Kidney/liver function evaluation" },
    { name: "Vitamin D & B12 Test", description: "Common deficiencies in seniors" },
    { name: "Thyroid Function Test", description: "Metabolism regulation check" },
    { name: "Prostate-Specific Antigen (PSA)", description: "For men over 50" },
    { name: "Mammogram", description: "For women (annual screening)" },
    { name: "Fall Risk Assessment", description: "Balance and mobility evaluation" }
  ];

  // Risk factors
  const riskFactors = [
    "Age 65+",
    "Family history of dementia",
    "Sedentary lifestyle",
    "History of falls",
    "Chronic medication use",
    "Poor nutrition",
    "Social isolation",
    "Multiple chronic conditions"
  ];

  // Prevention tips
  const preventionTips = [
    "Annual wellness visits",
    "Balance exercises (prevent falls)",
    "Cognitive stimulation activities",
    "Vaccinations (flu, pneumonia, shingles)",
    "Medication reviews",
    "Social engagement",
    "Bone-healthy diet (calcium/vitamin D)",
    "Regular vision/hearing checks"
  ];

  return (
    <div className="bg-bg-primary min-h-screen">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Link to="/tests-by-concern" className="flex items-center text-primary hover:text-primary-dark transition-colors">
          <FaArrowLeft className="mr-2" /> Back to Health Concerns
        </Link>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-500 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Senior Health Screenings</h1>
          <p className="text-xl mb-8">Specialized assessments for aging adults to maintain independence</p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-purple-600 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition-all">
              Book Senior Tests
            </button>
            <button className="bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-6 rounded-lg border border-white transition-all">
              View Geriatric Labs
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        
        {/* Overview Section */}
        <section className="mb-12 bg-white rounded-lg shadow-md p-6 border border-border-light">
          <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center">
            <FaUserAlt className="text-purple-500 mr-3" />
            Senior Health Essentials
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-text-secondary mb-4">
                Aging increases risks for chronic conditions, cognitive decline, and mobility issues. Our senior health package 
                monitors key biomarkers to detect problems early when they're most treatable.
              </p>
              <p className="text-text-secondary">
                Includes screenings for dementia risk, osteoporosis, diabetes complications, and medication side effects.
              </p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
              <h3 className="font-semibold text-lg mb-2 text-purple-600">Recommended Frequency</h3>
              <ul className="text-text-secondary space-y-2">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span> Annual comprehensive checkup
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span> Bone density every 2 years (women 65+)
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span> Cognitive screening if concerns arise
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span> Medication review every 6 months
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Key Tests Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Essential Senior Health Tests</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-border-light">
            <div className="grid md:grid-cols-2 gap-0">
              {tests.map((test, index) => (
                <div key={index} className="p-4 border-b border-r border-border-light">
                  <div className="flex items-start">
                    <div className={`mr-3 mt-1 ${index % 2 === 0 ? 'text-purple-500' : 'text-purple-400'}`}>
                      {test.name.includes("Bone") ? <FaBone /> : test.name.includes("Cognitive") ? <FaBrain /> : <FaClipboardList />}
                    </div>
                    <div>
                      <h3 className="font-semibold text-text-primary">{test.name}</h3>
                      <p className="text-sm text-text-secondary">{test.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Senior Wellness Package - ₹2999</h2>
          <p className="text-xl mb-6">Includes 8 essential tests + geriatric consultation</p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-purple-600 font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 transition-all">
              Book Now
            </button>
            <button className="bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-8 rounded-lg border border-white transition-all">
              View All Tests
            </button>
          </div>
          <p className="mt-4 text-purple-100">Home sample collection available • Discounts for couples</p>
        </section>
      </div>
    </div>
  );
};

export default SeniorCarePage;