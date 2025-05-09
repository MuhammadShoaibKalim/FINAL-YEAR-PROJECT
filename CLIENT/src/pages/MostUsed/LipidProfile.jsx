import React from 'react';
import { FaArrowLeft, FaVial, FaUserMd, FaHeartbeat } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const LipidProfile = () => {
  const testDetails = {
    whatIs: "A lipid profile measures the amount of cholesterol and triglycerides in your blood to assess cardiovascular risk.",
    components: [
      "Total Cholesterol: Combined measurement (Desirable <200 mg/dL)",
      "LDL (Bad Cholesterol): Contributes to plaque (Optimal <100 mg/dL)",
      "HDL (Good Cholesterol): Removes LDL (Optimal ≥60 mg/dL)",
      "Triglycerides: Blood fats (Normal <150 mg/dL)"
    ],
    whyImportant: [
      "High cholesterol causes 4.4 million deaths yearly",
      "Every 10% reduction in LDL reduces heart disease risk by 20-30%",
      "Early detection allows lifestyle interventions",
      "Helps monitor effectiveness of cholesterol medications"
    ],
    preparation: [
      "9-12 hour fasting required (water only)",
      "Avoid alcohol for 24 hours before test",
      "Continue medications unless instructed otherwise",
      "Inform doctor about supplements"
    ],
    riskCategories: [
      "Smokers",
      "Age (men ≥45, women ≥55)",
      "Family history of heart disease",
      "High blood pressure",
      "Diabetes or prediabetes",
      "Obesity (BMI ≥30)",
      "Physical inactivity"
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
      <section className="bg-gradient-to-r from-primary to-primary-dark text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Lipid Profile</h1>
          <p className="text-xl mb-8">Comprehensive cholesterol and cardiovascular risk assessment</p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-primary font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition-all">
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
            <FaVial className="text-primary mr-3" />
            Understanding Your Lipid Profile
          </h2>
          <p className="text-text-secondary mb-4">{testDetails.whatIs}</p>
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2 text-primary">Test Components:</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {testDetails.components.map((component, index) => (
                <div key={index} className="bg-bg-primary p-3 rounded-lg border border-border-light">
                  <p className="text-text-primary font-medium">{component.split(':')[0]}:</p>
                  <p className="text-sm text-text-secondary">{component.split(':')[1]}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Important */}
        <section className="mb-12 bg-red-50 rounded-lg p-6 border border-red-100">
          <h2 className="text-2xl font-bold text-red-800 mb-4">Why Monitor Lipids?</h2>
          <ul className="text-text-secondary space-y-3">
            {testDetails.whyImportant.map((item, index) => (
              <li key={index} className="flex items-start">
                <div className="bg-red-100 p-1 rounded-full mr-3 mt-1">
                  <FaHeartbeat className="text-red-600 text-xs" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* Risk Factors */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Who Should Get Tested?</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {testDetails.riskCategories.map((category, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-border-light">
                <p className="text-text-secondary">{category}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Advanced Cardiac Risk Panel - ₹1499</h2>
          <p className="text-xl mb-6">Includes lipid profile + CRP + homocysteine</p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-primary font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 transition-all">
              Book Now
            </button>
            <button className="bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-8 rounded-lg border border-white transition-all">
              Get Diet Plan
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LipidProfile;