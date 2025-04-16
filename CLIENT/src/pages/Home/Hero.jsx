import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-bg-primary to-secondary/10 -z-10" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-secondary/5 rounded-full blur-3xl -z-10" />
      
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-5xl sm:text-5xl font-bold text-text-primary mb-8 leading-tight">
              Your Health, <span className="text-primary">Our Priority</span>
            </h1>
            <p className="text-xl sm:text-2xl text-text-secondary mb-12 max-w-3xl mx-auto leading-relaxed">
              Advanced diagnostics powered by AI, delivering personalized healthcare solutions for a healthier tomorrow.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link
                to="/ai-recommendations-test"
                className="group inline-flex items-center justify-center px-8 py-4 rounded-xl bg-primary hover:bg-primary-dark text-text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
              >
                Try AI Recommendation
                <FaArrowRight className="ml-3 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/labs"
                className="group inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-primary/20 hover:border-primary text-text-primary font-medium hover:bg-primary/5 transition-all duration-300"
              >
                View Labs
                <svg className="ml-3 h-5 w-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
