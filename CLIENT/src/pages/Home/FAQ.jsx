import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaHeadset } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

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
    <div className="max-w-9xl mx-auto px-4 font-sans">
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-bg-primary to-bg-secondary/90 overflow-hidden  shadow">
        {/* Decorative background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-primary/5 rounded-full blur-[80px] md:blur-[100px] animate-pulse" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-secondary/5 rounded-full blur-[80px] md:blur-[100px] animate-pulse" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] md:w-[1000px] md:h-[1000px] bg-accent/5 rounded-full blur-[100px] md:blur-[120px] animate-pulse" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Header Section */}
          <div className="text-center mb-12 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4 md:mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg md:text-xl text-text-secondary/90 max-w-2xl mx-auto">
              Find answers to common questions about our services and processes
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4 md:space-y-6">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className={`group relative overflow-hidden rounded-xl md:rounded-2xl 
                  bg-bg-primary/60 backdrop-blur-sm
                  border border-border/20
                  hover:border-primary/40 transition-all duration-300
                  ${activeIndex === index ? 'shadow-lg shadow-primary/10' : 'shadow-md'}
                  hover:shadow-lg hover:shadow-primary/10
                  hover:-translate-y-[1px]`}
              >
                {/* Question */}
                <div
                  className="flex justify-between items-center p-6 md:p-8 cursor-pointer"
                  onClick={() => toggleAnswer(index)}
                >
                  <h3 className="text-lg md:text-xl font-semibold text-text-primary 
                    group-hover:text-primary transition-colors duration-300">
                    {faq.question}
                  </h3>
                  <div className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center
                    ${activeIndex === index ? 'bg-primary/20 text-primary' : 'bg-bg-primary/50 text-text-secondary'}
                    group-hover:bg-primary/20 transition-all duration-300
                    group-hover:scale-105`}>
                    {activeIndex === index ? (
                      <FaChevronUp className="w-4 h-4 md:w-5 md:h-5" />
                    ) : (
                      <FaChevronDown className="w-4 h-4 md:w-5 md:h-5" />
                    )}
                  </div>
                </div>

                {/* Answer */}
                {activeIndex === index && (
                  <div className="px-6 md:px-8 pb-6 md:pb-8">
                    <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent mb-6 md:mb-8" />
                    <p className="text-base md:text-lg text-text-secondary/90 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Support */}
          <div className="text-center mt-12 md:mt-16">
            <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/10 mb-4 md:mb-6">
              <FaHeadset className="w-6 h-6 md:w-8 md:h-8 text-primary" />
            </div>
            <p className="text-lg md:text-xl text-text-secondary/90 mb-4 md:mb-6">
              Still have questions? {`We're`} here to help!
            </p>
            <Link to="/contact">
              <button className="inline-flex items-center justify-center 
                bg-gradient-to-r from-primary to-primary/80 text-white 
                font-medium py-3 px-6 md:py-4 md:px-8 rounded-lg md:rounded-xl
                hover:from-primary/90 hover:to-primary/70 
                transition-all duration-300
                hover:-translate-y-[1px] hover:shadow-lg hover:shadow-primary/20
                group">
                Contact Support
                <FaChevronDown className="ml-2 w-3 h-3 md:w-4 md:h-4 transform group-hover:translate-y-1 transition-transform duration-300" />
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;