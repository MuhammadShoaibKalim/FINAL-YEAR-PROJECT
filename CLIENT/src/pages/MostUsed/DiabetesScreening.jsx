import React from 'react';
import { FaArrowLeft, FaSyringe, FaUserMd, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const DiabetesScreening = () => {
  const testDetails = {
    whatIs: "Diabetes screening tests help identify prediabetes and diabetes by measuring your blood glucose levels. Early detection can prevent serious complications.",
    types: [
      "Fasting Plasma Glucose (FPG): Measures blood sugar after 8-hour fast (Normal <100 mg/dL)",
      "HbA1c Test: Average blood sugar over 2-3 months (Normal <5.7%)",
      "Oral Glucose Tolerance Test (OGTT): Measures body's response to sugar (Normal <140 mg/dL after 2 hours)"
    ],
    whyImportant: [
      "Diabetes affects 1 in 11 adults worldwide",
      "Early detection can prevent nerve, kidney, and eye damage",
      "Helps manage blood sugar through lifestyle changes"
    ],
    riskFactors: [
      "Overweight (BMI ≥25)",
      "Age 45+",
      "Family history of diabetes",
      "High blood pressure",
      "Physical inactivity",
      "History of gestational diabetes"
    ],
    symptoms: [
      "Increased thirst and urination",
      "Unexplained weight loss",
      "Fatigue",
      "Blurred vision",
      "Slow-healing sores"
    ]
  };

  return (
    <div className="bg-bg-primary min-h-screen">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Link to="/tests" className="flex items-center text-primary hover:text-primary-dark transition-colors">
          <FaArrowLeft className="mr-2" /> Back to Tests
        </Link>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary to-secondary-dark text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Diabetes Screening</h1>
          <p className="text-xl mb-8">Early detection of prediabetes and diabetes mellitus</p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-secondary font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition-all">
              Book This Test
            </button>
            <button className="bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-6 rounded-lg border border-white transition-all">
              View Packages
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        
        {/* What is */}
        <section className="mb-12 bg-white rounded-lg shadow-md p-6 border border-border-light">
          <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center">
            <FaSyringe className="text-secondary mr-3" />
            Understanding Diabetes Screening
          </h2>
          <p className="text-text-secondary mb-4">{testDetails.whatIs}</p>
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2 text-secondary">Test Types:</h3>
            <ul className="text-text-secondary space-y-2">
              {testDetails.types.map((type, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-secondary mr-2">•</span> {type}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Why Important */}
        <section className="mb-12 bg-green-50 rounded-lg p-6 border border-green-100">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Why Screen for Diabetes?</h2>
          <ul className="text-text-secondary space-y-3">
            {testDetails.whyImportant.map((item, index) => (
              <li key={index} className="flex items-start">
                <div className="bg-green-100 p-1 rounded-full mr-3 mt-1">
                  <FaUserMd className="text-green-600 text-xs" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Risk Factors */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Risk Factors</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {testDetails.riskFactors.map((factor, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-border-light">
                <p className="text-text-secondary">{factor}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-secondary to-secondary-dark text-white rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Comprehensive Diabetes Panel - ₹899</h2>
          <p className="text-xl mb-6">Includes 3 tests + endocrinologist consultation</p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-secondary font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 transition-all">
              Book Now
            </button>
            <button className="bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-8 rounded-lg border border-white transition-all">
              Learn Prevention Tips
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiabetesScreening;