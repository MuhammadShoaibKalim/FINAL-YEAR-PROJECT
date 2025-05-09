import React from 'react';
import { FaArrowLeft, FaHeartbeat, FaClipboardList, FaUserMd, FaCalendarAlt, FaVial } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const HeartHealthPage = () => {
  const tests = [
    { name: "Complete Lipid Profile", description: "Measures cholesterol and triglycerides" },
    { name: "Cardiac Enzyme Test", description: "Checks for heart muscle damage" },
    { name: "CRP (C-Reactive Protein)", description: "Measures inflammation linked to heart disease" },
    { name: "Homocysteine Test", description: "High levels may indicate heart disease risk" },
    { name: "Electrocardiogram (ECG)", description: "Records heart's electrical activity" },
    { name: "Stress Test", description: "Evaluates heart function under exertion" },
    { name: "Echocardiogram", description: "Ultrasound of the heart" },
    { name: "NT-proBNP", description: "Checks for heart failure" }
  ];

  const riskFactors = [
    "High blood pressure",
    "High cholesterol",
    "Diabetes",
    "Obesity",
    "Smoking",
    "Physical inactivity",
    "Family history of heart disease",
    "Age (45+ for men, 55+ for women)"
  ];

  const preventionTips = [
    "Eat a heart-healthy diet (low salt, saturated fats)",
    "Exercise regularly (150 mins/week)",
    "Maintain healthy weight",
    "Manage stress effectively",
    "Control blood pressure and cholesterol",
    "Avoid tobacco products",
    "Limit alcohol consumption",
    "Get regular health screenings"
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
      <section className="bg-gradient-to-r from-red-600 to-red-500 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Heart Health Assessments</h1>
          <p className="text-xl mb-8">Comprehensive cardiac evaluations to detect and prevent heart disease</p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-red-600 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition-all">
              Book Cardiac Tests
            </button>
            <button className="bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-6 rounded-lg border border-white transition-all">
              View Cardiac Labs
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        
        {/* Heart Health Overview */}
        <section className="mb-12 bg-white rounded-lg shadow-md p-6 border border-border-light">
          <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center">
            <FaHeartbeat className="text-red-500 mr-3" />
            Understanding Heart Health
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-text-secondary mb-4">
                Cardiovascular disease is the leading cause of death globally. Regular heart health screenings can detect 
                potential issues before symptoms appear, allowing for early intervention and better outcomes.
              </p>
              <p className="text-text-secondary">
                Our cardiac assessments evaluate multiple aspects of heart function and identify risk factors for conditions 
                like coronary artery disease, heart failure, arrhythmias, and more.
              </p>
            </div>
            <div className="bg-red-50 rounded-lg p-4 border border-red-100">
              <h3 className="font-semibold text-lg mb-2 text-red-600">When to Get Tested?</h3>
              <ul className="text-text-secondary space-y-2">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span> Age 20+ for baseline assessment
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span> Annually if risk factors present
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span> Before starting intense exercise
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">•</span> Family history of heart disease
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Key Risk Factors */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Key Risk Factors for Heart Disease</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
            {riskFactors.map((factor, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-border-light flex items-center">
                <FaClipboardList className="text-red-500 mr-3 flex-shrink-0" />
                <span className="text-text-secondary">{factor}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Prevention Strategies */}
        <section className="mb-12 bg-blue-50 rounded-lg p-6 border border-blue-100">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">Heart Disease Prevention Strategies</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {preventionTips.map((tip, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-full mr-4">
                  <FaUserMd className="text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-800 mb-1">Step {index + 1}</h3>
                  <p className="text-text-secondary">{tip}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Included Tests */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Comprehensive Cardiac Tests</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-border-light">
            <div className="grid md:grid-cols-2 gap-0">
              {tests.map((test, index) => (
                <div key={index} className="p-4 border-b border-r border-border-light">
                  <div className="flex items-start">
                    <FaVial className="text-red-500 mt-1 mr-3 flex-shrink-0" />
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

        {/* Test Preparation */}
        <section className="mb-12 bg-white rounded-lg p-6 border border-border-light">
          <h2 className="text-2xl font-bold text-text-primary mb-4">Test Preparation Guidelines</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-2 text-red-600">Fasting Requirements</h3>
              <p className="text-text-secondary mb-4">
                Most lipid profiles require 9-12 hours fasting (water only). Avoid alcohol for 24 hours before testing.
              </p>
              <h3 className="font-semibold text-lg mb-2 text-red-600">Medications</h3>
              <p className="text-text-secondary">
                Continue prescribed medications unless instructed otherwise. Inform your doctor about all supplements.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 text-red-600">Before Stress Test</h3>
              <p className="text-text-secondary mb-4">
                Wear comfortable clothing and shoes. Avoid caffeine and smoking for 3 hours prior to test.
              </p>
              <h3 className="font-semibold text-lg mb-2 text-red-600">Results Timeline</h3>
              <p className="text-text-secondary">
                Most results available in 24-48 hours. Complex tests may take 3-5 business days.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Take Control of Your Heart Health Today</h2>
          <p className="text-xl mb-6">Complete Cardiac Assessment Package - ₹2499</p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-red-600 font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 transition-all">
              Book Full Package
            </button>
            <button className="bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-8 rounded-lg border border-white transition-all">
              Customize Tests
            </button>
          </div>
          <p className="mt-4 text-red-100">Home sample collection available • Free cardiologist consultation with full package</p>
        </section>
      </div>
    </div>
  );
};

export default HeartHealthPage;