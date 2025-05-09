import React from 'react';
import { FaArrowLeft, FaHeartbeat, FaUserMd, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ThyroidProfile = () => {
  const testDetails = {
    whatIs: "A thyroid profile evaluates how well your thyroid gland is working by measuring levels of thyroid hormones (T3, T4) and thyroid-stimulating hormone (TSH).",
    whyImportant: [
      "Thyroid disorders affect 12% of population",
      "Undiagnosed hypothyroidism can lead to heart disease",
      "Hyperthyroidism can cause osteoporosis",
      "Critical for women's reproductive health"
    ],
    testsIncluded: [
      "TSH (Thyroid Stimulating Hormone): Primary screening test (Normal 0.4-4.0 mIU/L)",
      "Free T4 (Thyroxine): Measures active thyroid hormone (Normal 0.8-1.8 ng/dL)",
      "Free T3 (Triiodothyronine): Active thyroid hormone (Normal 2.3-4.2 pg/mL)",
      "Thyroid Antibodies: Detects autoimmune thyroid disease"
    ],
    symptoms: {
      hypothyroidism: [
        "Fatigue", "Weight gain", "Cold intolerance",
        "Dry skin", "Depression", "Constipation"
      ],
      hyperthyroidism: [
        "Weight loss", "Rapid heartbeat", "Anxiety",
        "Tremors", "Heat intolerance", "Sleep problems"
      ]
    },
    whenToTest: [
      "Unexplained weight changes",
      "Fatigue or energy changes",
      "Menstrual irregularities",
      "Pregnancy planning",
      "History of autoimmune disease",
      "Cholesterol abnormalities"
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
      <section className="bg-gradient-to-r from-info to-info-dark text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Thyroid Profile</h1>
          <p className="text-xl mb-8">Comprehensive evaluation of thyroid function</p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-info font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition-all">
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
            <FaHeartbeat className="text-info mr-3" />
            Thyroid Function Testing
          </h2>
          <p className="text-text-secondary mb-4">{testDetails.whatIs}</p>
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2 text-info">Tests Included:</h3>
            <ul className="text-text-secondary space-y-2">
              {testDetails.testsIncluded.map((test, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-info mr-2">•</span> {test}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Symptoms */}
        <section className="mb-12 grid md:grid-cols-2 gap-6">
          <div className="bg-red-50 rounded-lg p-6 border border-red-100">
            <h3 className="font-bold text-lg text-red-700 mb-3">Hypothyroidism Symptoms</h3>
            <ul className="text-text-secondary space-y-2">
              {testDetails.symptoms.hypothyroidism.map((symptom, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-red-500 mr-2">•</span> {symptom}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-purple-50 rounded-lg p-6 border border-purple-100">
            <h3 className="font-bold text-lg text-purple-700 mb-3">Hyperthyroidism Symptoms</h3>
            <ul className="text-text-secondary space-y-2">
              {testDetails.symptoms.hyperthyroidism.map((symptom, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-purple-500 mr-2">•</span> {symptom}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-info to-info-dark text-white rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Complete Thyroid Profile - ₹1299</h2>
          <p className="text-xl mb-6">Includes TSH, Free T3, Free T4 + Antibody tests</p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-info font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 transition-all">
              Book Now
            </button>
            <button className="bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-8 rounded-lg border border-white transition-all">
              Consult Endocrinologist
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ThyroidProfile;