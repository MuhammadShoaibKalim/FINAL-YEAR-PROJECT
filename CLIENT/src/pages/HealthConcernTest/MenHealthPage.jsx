import React from 'react';
import { FaArrowLeft, FaFlask, FaHeartbeat, FaProcedures, FaCalendarAlt, FaQuestionCircle, FaPhone } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MenHealthPage = () => {
  const tests = [
    { name: "Complete Blood Count (CBC)", description: "Measures overall health and detects disorders" },
    { name: "Lipid Profile", description: "Checks cholesterol and triglyceride levels" },
    { name: "Liver Function Test", description: "Evaluates liver health and function" },
    { name: "Kidney Function Test", description: "Assesses kidney performance" },
    { name: "Prostate-Specific Antigen (PSA)", description: "Screens for prostate health" },
    { name: "Blood Sugar (Fasting/Random)", description: "Measures glucose levels for diabetes" },
    { name: "Vitamin D & B12", description: "Checks for common vitamin deficiencies" },
    { name: "Testosterone Level", description: "Measures male hormone levels" },
    { name: "ECG", description: "Checks heart rhythm and electrical activity" },
    { name: "Thyroid Profile", description: "Evaluates thyroid function" }
  ];

  const faqs = [
    { question: "Do I need to fast before these tests?", answer: "Yes, fasting for 8-12 hours is required for accurate lipid profile and blood sugar tests." },
    { question: "How long will the tests take?", answer: "The entire process takes about 30-45 minutes for sample collection." },
    { question: "When will I get my results?", answer: "Most results are available within 24-48 hours. Some specialized tests may take longer." },
    { question: "Is the blood test painful?", answer: "You may feel a slight pinch during blood collection, but it's generally not painful." }
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
      <section className="bg-gradient-to-r from-primary-dark to-primary text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Men's Health Checkups</h1>
          <p className="text-xl mb-8">Comprehensive tests tailored for men's well-being</p>
          <button className="bg-white text-primary font-bold py-3 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
            Book a Test
          </button>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Overview Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-text-primary mb-4">Overview</h2>
          <div className="bg-white rounded-lg shadow-md p-6 border border-border-light">
            <p className="text-text-secondary mb-4">
              Regular health checks are crucial for men to detect potential health issues early and maintain optimal well-being. 
              Men often neglect routine checkups, which can lead to late diagnosis of serious conditions.
            </p>
            <p className="text-text-secondary">
              Our Men's Health Package screens for common concerns like heart disease, diabetes, prostate health, 
              cholesterol levels, and hormonal balance, providing a comprehensive picture of your current health status.
            </p>
          </div>
        </section>

        {/* Importance Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Why Men's Health Checks are Important</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 flex items-start border border-border-light">
              <FaHeartbeat className="text-error text-2xl mr-4 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2 text-text-primary">Early Detection</h3>
                <p className="text-text-secondary">Identify silent conditions like hypertension before they become serious.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 flex items-start border border-border-light">
              <FaFlask className="text-info text-2xl mr-4 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2 text-text-primary">Vital Metrics</h3>
                <p className="text-text-secondary">Track cholesterol, blood sugar, and other key health indicators.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 flex items-start border border-border-light">
              <FaProcedures className="text-success text-2xl mr-4 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2 text-text-primary">Cancer Screening</h3>
                <p className="text-text-secondary">Prostate and colon cancer screenings for early intervention.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 flex items-start border border-border-light">
              <FaHeartbeat className="text-primary text-2xl mr-4 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2 text-text-primary">Hormone Balance</h3>
                <p className="text-text-secondary">Monitor testosterone and other hormone levels that affect energy and vitality.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Included Tests */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Included Tests</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-border-light">
            <div className="grid md:grid-cols-2 gap-0">
              {tests.map((test, index) => (
                <div key={index} className="p-4 border-b border-r border-border-light">
                  <h3 className="font-semibold text-text-primary">{test.name}</h3>
                  <p className="text-sm text-text-secondary">{test.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Age Groups */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Recommended By Age Group</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-bg-tertiary rounded-lg p-6 border border-border-light">
              <h3 className="font-bold text-lg mb-3 text-primary-dark">20-39 Years</h3>
              <ul className="text-text-secondary space-y-2">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span> Basic metabolic panel
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span> Complete blood count
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span> Testosterone screening
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span> STD screening (if applicable)
                </li>
              </ul>
            </div>
            <div className="bg-bg-tertiary rounded-lg p-6 border border-border-light">
              <h3 className="font-bold text-lg mb-3 text-primary">40-59 Years</h3>
              <ul className="text-text-secondary space-y-2">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span> All basic tests plus
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span> Prostate health (PSA)
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span> Comprehensive lipid profile
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span> Diabetes screening
                </li>
              </ul>
            </div>
            <div className="bg-bg-tertiary rounded-lg p-6 border border-border-light">
              <h3 className="font-bold text-lg mb-3 text-primary-light">60+ Years</h3>
              <ul className="text-text-secondary space-y-2">
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span> Complete annual checkup
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span> Cardiac risk assessment
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span> Bone density (if needed)
                </li>
                <li className="flex items-start">
                  <span className="text-primary mr-2">•</span> Colon cancer screening
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* When to Test */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6">When Should You Get Tested?</h2>
          <div className="bg-white rounded-lg shadow-md p-6 border border-border-light">
            <div className="flex items-start mb-4">
              <FaCalendarAlt className="text-primary mr-4 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2 text-text-primary">Annual Checkup</h3>
                <p className="text-text-secondary">All men over 40 should have annual health screenings, younger men every 2-3 years.</p>
              </div>
            </div>
            <div className="flex items-start mb-4">
              <FaCalendarAlt className="text-primary mr-4 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2 text-text-primary">Lifestyle Factors</h3>
                <p className="text-text-secondary">If you smoke, drink alcohol regularly, are overweight, or have high stress levels.</p>
              </div>
            </div>
            <div className="flex items-start">
              <FaCalendarAlt className="text-primary mr-4 mt-1" />
              <div>
                <h3 className="font-semibold text-lg mb-2 text-text-primary">Family History</h3>
                <p className="text-text-secondary">If you have a family history of heart disease, diabetes, or prostate cancer.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section
        <section className="mb-12 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 border border-primary/20">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Benefits of Booking With Us</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-4 shadow-sm border border-border-light">
              <h3 className="font-semibold mb-2 text-text-primary">NABL-Accredited Labs</h3>
              <p className="text-sm text-text-secondary">Highest quality standards for accurate results</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-border-light">
              <h3 className="font-semibold mb-2 text-text-primary">Home Sample Collection</h3>
              <p className="text-sm text-text-secondary">Convenient testing at your location</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-border-light">
              <h3 className="font-semibold mb-2 text-text-primary">Fast Results</h3>
              <p className="text-sm text-text-secondary">Most reports within 24-48 hours</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm border border-border-light">
              <h3 className="font-semibold mb-2 text-text-primary">Doctor Consultation</h3>
              <p className="text-sm text-text-secondary">Free report interpretation with our experts</p>
            </div>
          </div>
        </section> */}

        {/* Booking CTA */}
        <section className="mb-12 text-center bg-primary text-white rounded-lg p-8 shadow-lg border border-primary-dark">
          <h2 className="text-2xl font-bold mb-4">Ready to Take Charge of Your Health?</h2>
          <p className="text-xl mb-6">Complete Men's Health Package - 1999 PKR</p>
          <button className="bg-white text-primary font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-300 hover:shadow-xl">
            Book Now
          </button>
          <p className="mt-4 text-primary-lighter">Home sample collection available • Free doctor consultation</p>
        </section>

        {/* FAQs */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-text-primary mb-6">Frequently Asked Questions</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-border-light">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-border-light last:border-0">
                <div className="p-4">
                  <h3 className="font-semibold flex items-center text-text-primary">
                    <FaQuestionCircle className="text-primary mr-3" />
                    {faq.question}
                  </h3>
                  <p className="mt-2 pl-8 text-text-secondary">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

      
      </div>
    </div>
  );
};

export default MenHealthPage;