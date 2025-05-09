import React from 'react';
import { FaArrowLeft, FaFemale, FaBaby, FaFlask, FaCalendarAlt, FaHeartbeat } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const WomensHealthPage = () => {
  const tests = [
    { name: "Pap Smear", description: "Cervical cancer screening" },
    { name: "HPV DNA Test", description: "High-risk HPV detection" },
    { name: "Mammogram", description: "Breast cancer screening" },
    { name: "Bone Density (DEXA)", description: "Osteoporosis assessment" },
    { name: "Thyroid Profile", description: "Thyroid function tests" },
    { name: "Pregnancy Test", description: "hCG hormone detection" },
    { name: "Prenatal Panel", description: "Comprehensive pregnancy screening" },
    { name: "Hormone Panel", description: "Reproductive hormone levels" }
  ];

  const screeningsByAge = [
    {
      age: "20-29",
      tests: ["Annual pelvic exam", "Pap smear every 3 years", "STD screening if sexually active", "Breast self-exam education"]
    },
    {
      age: "30-39",
      tests: ["Pap + HPV co-testing every 5 years", "Clinical breast exam annually", "Fertility testing if needed", "Baseline mammogram if high risk"]
    },
    {
      age: "40-49",
      tests: ["Annual mammograms", "Diabetes screening", "Thyroid testing", "Cardiovascular risk assessment"]
    },
    {
      age: "50+",
      tests: ["Colon cancer screening", "Bone density testing", "Hormone level checks", "Vision and hearing tests"]
    }
  ];

  const pregnancyTests = [
    { trimester: "First", tests: ["Complete blood count", "Blood type/Rh factor", "Rubella immunity", "Hepatitis B", "HIV", "Urine culture"] },
    { trimester: "Second", tests: ["Glucose challenge", "Quad screen", "Amniocentesis (if needed)", "Anatomy ultrasound"] },
    { trimester: "Third", tests: ["Group B strep", "Repeat CBC", "Repeat glucose (if needed)", "Fetal monitoring"] }
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
      <section className="bg-gradient-to-r from-pink-600 to-pink-500 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Women's Health Screenings</h1>
          <p className="text-xl mb-8">Comprehensive care through all life stages</p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-pink-600 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-gray-100 transition-all">
              Book Women's Tests
            </button>
            <button className="bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-6 rounded-lg border border-white transition-all">
              View Prenatal Packages
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        
        {/* Women's Health Overview */}
        <section className="mb-12 bg-white rounded-lg shadow-md p-6 border border-border-light">
          <h2 className="text-2xl font-bold text-text-primary mb-4 flex items-center">
            <FaFemale className="text-pink-500 mr-3" />
            Essential Women's Health
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-text-secondary mb-4">
                Women have unique health needs that change throughout life. Regular screenings can detect issues early 
                when they're most treatable, from reproductive health to menopause and beyond.
              </p>
              <p className="text-text-secondary">
                Our comprehensive women's health tests cover cancer screenings, bone health, hormonal balance, 
                pregnancy care, and general wellness tailored to each life stage.
              </p>
            </div>
            <div className="bg-pink-50 rounded-lg p-4 border border-pink-100">
              <h3 className="font-semibold text-lg mb-2 text-pink-600">Key Focus Areas</h3>
              <ul className="text-text-secondary space-y-2">
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span> Reproductive health
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span> Breast & cervical cancer
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span> Bone density
                </li>
                <li className="flex items-start">
                  <span className="text-pink-500 mr-2">•</span> Heart health
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Screenings by Age */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Recommended Screenings by Age</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {screeningsByAge.map((group, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm p-4 border border-border-light">
                <h3 className="font-bold text-lg mb-3 text-pink-600">{group.age} Years</h3>
                <ul className="text-text-secondary space-y-2">
                  {group.tests.map((test, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-pink-500 mr-2">•</span> {test}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Pregnancy Testing */}
        <section className="mb-12 bg-purple-50 rounded-lg p-6 border border-purple-100">
          <h2 className="text-2xl font-bold text-purple-800 mb-6 flex items-center">
            <FaBaby className="mr-3" />
            Pregnancy Testing Timeline
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {pregnancyTests.map((trimester, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border border-border-light">
                <h3 className="font-semibold text-purple-700 mb-3">{trimester.trimester} Trimester</h3>
                <ul className="text-text-secondary space-y-2">
                  {trimester.tests.map((test, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-purple-500 mr-2">•</span> {test}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Included Tests */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Comprehensive Women's Health Tests</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-border-light">
            <div className="grid md:grid-cols-2 gap-0">
              {tests.map((test, index) => (
                <div key={index} className="p-4 border-b border-r border-border-light">
                  <div className="flex items-start">
                    <FaFlask className="text-pink-500 mt-1 mr-3 flex-shrink-0" />
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

        {/* Special Considerations */}
        <section className="mb-12 bg-white rounded-lg p-6 border border-border-light">
          <h2 className="text-2xl font-bold text-text-primary mb-4">Special Considerations</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-lg mb-2 text-pink-600">Birth Control Users</h3>
              <p className="text-text-secondary mb-4">
                Regular blood pressure checks and monitoring for blood clots recommended. Annual STI screening advised.
              </p>
              <h3 className="font-semibold text-lg mb-2 text-pink-600">Menopause Transition</h3>
              <p className="text-text-secondary">
                Hormone level testing can help manage symptoms. Increased focus on bone and heart health.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 text-pink-600">Fertility Testing</h3>
              <p className="text-text-secondary mb-4">
                Day 3 FSH, AMH, and estrogen tests help assess ovarian reserve. Partner testing also recommended.
              </p>
              <h3 className="font-semibold text-lg mb-2 text-pink-600">Breast Health</h3>
              <p className="text-text-secondary">
                Genetic testing available for BRCA mutations if strong family history of breast cancer.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-pink-600 to-pink-500 text-white rounded-lg p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Prioritize Your Health Today</h2>
          <p className="text-xl mb-6">Complete Women's Wellness Package - ₹2999</p>
          <div className="flex justify-center gap-4">
            <button className="bg-white text-pink-600 font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 transition-all">
              Book Full Package
            </button>
            <button className="bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-8 rounded-lg border border-white transition-all">
              View OB-GYN Labs
            </button>
          </div>
          <p className="mt-4 text-pink-100">Discreet testing available • Female phlebotomists on request</p>
        </section>
      </div>
    </div>
  );
};

export default WomensHealthPage;