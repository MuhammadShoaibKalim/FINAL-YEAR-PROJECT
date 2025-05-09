import React from 'react';
import { FaArrowLeft, FaChild, FaClipboardList, FaUserMd, FaHeartbeat, FaFlask } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ChildHealthPage = () => {
  // ... (keep all your existing const declarations here)

  return (
    <div className="bg-bg-primary min-h-screen">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Link to="/tests-by-concern" className="flex items-center text-primary hover:text-primary-dark transition-colors">
          <FaArrowLeft className="mr-2" /> Back to Health Concerns
        </Link>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-500 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Pediatric Health Checks</h1>
          <p className="text-xl mb-8">Monitoring growth and development from infancy to adolescence</p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-green-600 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition-all">
              Book Child Tests
            </button>
            <button className="bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-6 rounded-lg border border-white transition-all">
              View Pediatric Labs
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Age-Based Recommendations Section */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8 border border-border-light">
          <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center">
            <FaChild className="text-green-500 mr-3" />
            Age-Appropriate Testing
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="border-r border-border-light pr-6">
              <h3 className="font-bold text-green-600 mb-2">Infants (0-1yr)</h3>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>Newborn screening</li>
                <li>Bilirubin levels</li>
                <li>Vitamin D</li>
              </ul>
            </div>
            <div className="border-r border-border-light pr-6">
              <h3 className="font-bold text-green-600 mb-2">Toddlers (1-5yrs)</h3>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>Lead screening</li>
                <li>Hemoglobin check</li>
                <li>Developmental screening</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-green-600 mb-2">School Age (6-18yrs)</h3>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>Annual wellness check</li>
                <li>Sports physicals</li>
                <li>Mental health screening</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Test Preparation Section */}
        <section className="bg-yellow-50 rounded-lg p-6 mb-8 border border-yellow-100">
          <h2 className="text-xl font-bold text-yellow-800 mb-4">For Parents: Preparing Your Child</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex items-start">
              <div className="bg-yellow-100 p-2 rounded-full mr-3">
                <FaUserMd className="text-yellow-600" />
              </div>
              <p className="text-text-secondary">Explain the process in child-friendly terms</p>
            </div>
            <div className="flex items-start">
              <div className="bg-yellow-100 p-2 rounded-full mr-3">
                <FaUserMd className="text-yellow-600" />
              </div>
              <p className="text-text-secondary">Bring comfort items (stuffed toy, blanket)</p>
            </div>
            <div className="flex items-start">
              <div className="bg-yellow-100 p-2 rounded-full mr-3">
                <FaUserMd className="text-yellow-600" />
              </div>
              <p className="text-text-secondary">Schedule morning appointments (best cooperation)</p>
            </div>
            <div className="flex items-start">
              <div className="bg-yellow-100 p-2 rounded-full mr-3">
                <FaUserMd className="text-yellow-600" />
              </div>
              <p className="text-text-secondary">Avoid saying "it won't hurt" for blood tests</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Child Wellness Packages Starting at ₹1499</h2>
          <p className="text-xl mb-6">Age-specific bundles with pediatrician consultation</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-green-600 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition-all">
              Infant Screening
            </button>
            <button className="bg-white text-green-600 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition-all">
              Toddler Package
            </button>
            <button className="bg-white text-green-600 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition-all">
              Teen Health Check
            </button>
          </div>
          <p className="mt-4 text-green-100">Child-friendly collection centers • Play areas available</p>
        </section>
      </div>
    </div>
  );
};

export default ChildHealthPage;