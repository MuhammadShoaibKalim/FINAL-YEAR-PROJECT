import React from 'react';
import { FaArrowLeft, FaFlask, FaAppleAlt, FaChartLine, FaSyringe, FaClipboardCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const DiabetesCarePage = () => {
  const tests = [
    { name: "Fasting Blood Glucose", description: "Measures sugar levels after fasting" },
    { name: "HbA1c (Glycated Hemoglobin)", description: "3-month average blood sugar" },
    { name: "Postprandial Glucose", description: "Sugar levels 2 hours after eating" },
    { name: "Oral Glucose Tolerance Test", description: "Evaluates insulin response" },
    { name: "C-Peptide Test", description: "Measures insulin production" },
    { name: "Insulin Assay", description: "Direct insulin level measurement" },
    { name: "Urine Microalbumin", description: "Checks for kidney damage" },
    { name: "Lipid Profile", description: "Cholesterol and triglycerides" }
  ];

  const symptoms = [
    "Frequent urination",
    "Excessive thirst",
    "Unexplained weight loss",
    "Increased hunger",
    "Blurry vision",
    "Slow-healing sores",
    "Frequent infections",
    "Fatigue/irritability"
  ];

  const managementTips = [
    "Monitor blood sugar regularly",
    "Follow balanced meal plan",
    "Engage in regular physical activity",
    "Maintain healthy weight",
    "Take medications as prescribed",
    "Manage stress effectively",
    "Check feet daily for sores",
    "Get regular eye exams"
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
      <section className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Diabetes Care & Management</h1>
          <p className="text-xl mb-8">Comprehensive testing for prevention, diagnosis and monitoring</p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-blue-600 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition-all">
              Book Diabetes Tests
            </button>
            <button className="bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-6 rounded-lg border border-white transition-all">
              View Monitoring Devices
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        
        {/* Diabetes Overview */}
        <section className="mb-12 bg-white rounded-lg shadow-md p-6 border border-border-light">
          <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center">
            <FaFlask className="text-blue-500 mr-3" />
            Understanding Diabetes
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-text-secondary mb-4">
                Diabetes is a chronic condition affecting how your body processes glucose. Uncontrolled diabetes can lead 
                to serious complications including heart disease, kidney failure, nerve damage and vision problems.
              </p>
              <p className="text-text-secondary">
                Regular monitoring through our diabetes care tests helps in early detection, proper management, and 
                prevention of complications for both Type 1 and Type 2 diabetes.
              </p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <h3 className="font-semibold text-lg mb-2 text-blue-600">Who Should Get Tested?</h3>
              <ul className="text-text-secondary space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span> Adults over 45 (repeat every 3 years)
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span> Those with BMI ≥25 plus risk factors
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span> Family history of diabetes
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span> History of gestational diabetes
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Warning Signs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Diabetes Warning Signs</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {symptoms.map((symptom, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-border-light flex items-center">
                <FaAppleAlt className="text-blue-500 mr-3 flex-shrink-0" />
                <span className="text-text-secondary">{symptom}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Management Strategies */}
        <section className="mb-12 bg-green-50 rounded-lg p-6 border border-green-100">
          <h2 className="text-2xl font-bold text-green-800 mb-6">Diabetes Management Plan</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {managementTips.map((tip, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-green-100 p-2 rounded-full mr-4">
                  <FaChartLine className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-800 mb-1">Strategy {index + 1}</h3>
                  <p className="text-text-secondary">{tip}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Included Tests */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Essential Diabetes Tests</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-border-light">
            <div className="grid md:grid-cols-2 gap-0">
              {tests.map((test, index) => (
                <div key={index} className="p-4 border-b border-r border-border-light">
                  <div className="flex items-start">
                    <FaSyringe className="text-blue-500 mt-1 mr-3 flex-shrink-0" />
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

        {/* Test Frequency */}
        <section className="mb-12 bg-white rounded-lg p-6 border border-border-light">
          <h2 className="text-2xl font-bold text-text-primary mb-4">Recommended Testing Frequency</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-border-light">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-4 py-2 text-left text-blue-800 border-b border-border-light">Test</th>
                  <th className="px-4 py-2 text-left text-blue-800 border-b border-border-light">Prediabetes</th>
                  <th className="px-4 py-2 text-left text-blue-800 border-b border-border-light">Type 2 (Controlled)</th>
                  <th className="px-4 py-2 text-left text-blue-800 border-b border-border-light">Type 1/Uncontrolled</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border-b border-border-light">HbA1c</td>
                  <td className="px-4 py-2 border-b border-border-light">Every 6 months</td>
                  <td className="px-4 py-2 border-b border-border-light">Every 3 months</td>
                  <td className="px-4 py-2 border-b border-border-light">Every 3 months</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-border-light">Fasting Glucose</td>
                  <td className="px-4 py-2 border-b border-border-light">Every 6 months</td>
                  <td className="px-4 py-2 border-b border-border-light">Every 3-6 months</td>
                  <td className="px-4 py-2 border-b border-border-light">Monthly</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border-b border-border-light">Lipid Profile</td>
                  <td className="px-4 py-2 border-b border-border-light">Annually</td>
                  <td className="px-4 py-2 border-b border-border-light">Annually</td>
                  <td className="px-4 py-2 border-b border-border-light">Every 6 months</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Microalbumin</td>
                  <td className="px-4 py-2">Annually</td>
                  <td className="px-4 py-2">Annually</td>
                  <td className="px-4 py-2">Every 6 months</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Take Control of Your Diabetes Today</h2>
          <p className="text-xl mb-6">Complete Diabetes Care Package - ₹1799</p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-blue-600 font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 transition-all">
              Book Full Package
            </button>
            <button className="bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-8 rounded-lg border border-white transition-all">
              View Glucose Monitors
            </button>
          </div>
          <p className="mt-4 text-blue-100">Free endocrinologist consultation with full package • Discount on repeat tests</p>
        </section>
      </div>
    </div>
  );
};

export default DiabetesCarePage;