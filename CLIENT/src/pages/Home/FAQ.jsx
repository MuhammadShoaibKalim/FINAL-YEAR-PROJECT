import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaHeadset } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // const faqs = [
  //   {
  //     question: "What is Digital LabCore Test Information?",
  //     answer: "Our platform provides access to detailed lab test information, including pricing and instructions, ensuring you can make informed healthcare decisions.",
  //   },
  //   {
  //     question: "How does AI-Powered Recommendations work?",
  //     answer: "Our advanced AI analyzes your symptoms and suggests relevant tests, helping you choose the most appropriate tests for your health needs.",
  //   },
  //   {
  //     question: "What is Personalized Healthcare?",
  //     answer: "The platform offers personalized test recommendations based on your health status, empowering you to make independent and informed decisions.",
  //   },
  //   {
  //     question: "How do I schedule a test?",
  //     answer: "You can easily book your lab tests through our intuitive platform. Simply select the tests you need, choose a convenient time, and complete your booking.",
  //   },
  //   {
  //     question: "Is my data secure?",
  //     answer: "Yes, your health data is protected with the highest level of security protocols and encryption, ensuring complete privacy and safety.",
  //   },
  // ];
  const faqs = [
    {
      question: "How do I book a test?",
      answer: "You can book a test through our website by selecting the desired test and following the simple booking process. We'll guide you through each step."
    },
    {
      question: "How long does it take to get results?",
      answer: "Most test results are available within 24-48 hours after sample collection. Some specialized tests might take longer."
    },
    {
      question: "Is home sample collection available?",
      answer: "Yes, we offer convenient home sample collection services in most areas. You can select this option during booking."
    },
    {
      question: "Are the laboratories certified?",
      answer: "Yes, all our partner laboratories are certified and follow strict quality control measures to ensure accurate results."
    }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-bg-primary to-bg-secondary overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-accent/5 rounded-full blur-[120px] animate-pulse" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Section */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Find answers to common questions about our services and processes
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-2xl 
                bg-bg-primary/40 backdrop-blur-md
                border border-border/20
                hover:border-primary/40 transition-all duration-500
                hover:shadow-xl hover:shadow-primary/10
                hover:translate-y-[-2px]"
            >
              {/* Question */}
              <div
                className="flex justify-between items-center p-8 cursor-pointer"
                onClick={() => toggleAnswer(index)}
              >
                <h3 className="text-xl font-semibold text-text-primary 
                  group-hover:text-primary transition-colors duration-500">
                  {faq.question}
                </h3>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center
                  ${activeIndex === index ? 'bg-primary/20' : 'bg-bg-primary/50'}
                  group-hover:bg-primary/20 transition-all duration-500
                  group-hover:scale-110`}>
                  {activeIndex === index ? (
                    <FaChevronUp className="w-5 h-5 text-primary" />
                  ) : (
                    <FaChevronDown className="w-5 h-5 text-text-secondary 
                      group-hover:text-primary transition-colors duration-500" />
                  )}
                </div>
              </div>

              {/* Answer */}
              {activeIndex === index && (
                <div className="px-8 pb-8">
                  <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent mb-8" />
                  <p className="text-lg text-text-secondary leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <FaHeadset className="w-8 h-8 text-primary" />
          </div>
          <p className="text-xl text-text-secondary mb-6">
            Still have questions? {`We're`} here to help!
          </p>
          <Link to="/contact">
            <button className="inline-flex items-center justify-center 
              bg-gradient-to-r from-primary to-primary/80 text-white 
              font-medium py-4 px-8 rounded-xl
              hover:from-primary/90 hover:to-primary/70 
              transition-all duration-300
              hover:translate-y-[-2px] hover:shadow-xl hover:shadow-primary/20
              group">
              Contact Support
              <FaChevronDown className="ml-2 w-4 h-4 transform group-hover:translate-y-1 transition-transform duration-300" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
