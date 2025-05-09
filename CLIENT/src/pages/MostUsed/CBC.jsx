import React from 'react';
import { FaArrowLeft, FaFlask, FaUserMd, FaCalendarAlt, FaVial } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const CompleteBloodCount = () => {
  const testDetails = {
    whatIs: "A Complete Blood Count (CBC) is a common blood test that evaluates your overall health and detects a wide range of disorders including anemia, infection, and leukemia.",
    whyImportant: "It measures several components and features of your blood including red blood cells, white blood cells, hemoglobin, hematocrit, and platelets.",
    whenToTest: [
      "Routine medical checkup",
      "Unexplained fatigue or weakness",
      "Fever, inflammation, or infection",
      "Bruising or bleeding",
      "Before surgery",
      "Monitoring medical treatments"
    ],
    preparation: [
      "No fasting required (unless ordered with other tests)",
      "Continue normal medications unless advised otherwise",
      "Wear loose sleeves for easy blood draw"
    ],
    risks: "Minimal - slight pain or bruising at needle site",
    results: [
      "Red Blood Cells (RBC): Carry oxygen (normal: 4.5-5.9 million cells/mcL)",
      "White Blood Cells (WBC): Fight infection (normal: 4,500-11,000 cells/mcL)",
      "Hemoglobin (Hb): Oxygen-carrying protein (normal: 13.5-17.5 g/dL men, 12.0-15.5 g/dL women)",
      "Platelets: Help blood clotting (normal: 150,000-450,000/mcL)"
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
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Complete Blood Count (CBC)</h1>
          <p className="text-xl mb-8">Comprehensive blood analysis for overall health assessment</p>
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
        
        {/* What is CBC */}
        <section className="mb-12 bg-white rounded-lg shadow-md p-6 border border-border-light">
          <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center">
            <FaFlask className="text-primary mr-3" />
            What is a Complete Blood Count?
          </h2>
          <p className="text-text-secondary mb-4">{testDetails.whatIs}</p>
          <p className="text-text-secondary">This test provides information about three main types of cells in your blood: red blood cells, white blood cells, and platelets.</p>
        </section>

        {/* Why Important */}
        <section className="mb-12 bg-blue-50 rounded-lg p-6 border border-blue-100">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Why is this Test Important?</h2>
          <p className="text-text-secondary mb-4">{testDetails.whyImportant}</p>
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            {testDetails.results.map((item, index) => (
              <div key={index} className="bg-white p-3 rounded-lg border border-border-light">
                <p className="font-medium text-text-primary">{item.split(':')[0]}:</p>
                <p className="text-sm text-text-secondary">{item.split(':')[1]}</p>
              </div>
            ))}
          </div>
        </section>

        {/* When to Test */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6">When Should You Get Tested?</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {testDetails.whenToTest.map((reason, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-border-light flex items-start">
                <FaCalendarAlt className="text-primary mr-3 mt-1 flex-shrink-0" />
                <span className="text-text-secondary">{reason}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Complete Blood Count + Doctor Consultation - ₹599</h2>
          <p className="text-xl mb-6">Includes free home sample collection</p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-primary font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 transition-all">
              Book Now
            </button>
            <button className="bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-8 rounded-lg border border-white transition-all">
              Add More Tests
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CompleteBloodCount;