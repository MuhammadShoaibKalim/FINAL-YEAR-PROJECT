import React from 'react';
import { FaArrowRight, FaRobot } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative min-h-[90vh] flex items-center">
      {/* Advanced gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-bg-primary to-secondary/10 opacity-70" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-l from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
      
      {/* Decorative patterns */}
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(30deg,_#09acb4_12%,_transparent_12.5%,_transparent_87%,_#09acb4_87.5%,_#09acb4),linear-gradient(150deg,_#09acb4_12%,_transparent_12.5%,_transparent_87%,_#09acb4_87.5%,_#09acb4),linear-gradient(30deg,_#09acb4_12%,_transparent_12.5%,_transparent_87%,_#09acb4_87.5%,_#09acb4),linear-gradient(150deg,_#09acb4_12%,_transparent_12.5%,_transparent_87%,_#09acb4_87.5%,_#09acb4),linear-gradient(60deg,_#09acb477_25%,_transparent_25.5%,_transparent_75%,_#09acb477_75%,_#09acb477),linear-gradient(60deg,_#09acb477_25%,_transparent_25.5%,_transparent_75%,_#09acb477_75%,_#09acb477)] bg-[length:80px_140px] bg-[position:0_0,_0_0,_40px_70px,_40px_70px,_0_0,_40px_70px]" />

      <section className="relative z-10 overflow-hidden w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-8">
            {/* Main heading with gradient text */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary tracking-tight">
              Revolutionizing Healthcare with
              <span className="block mt-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                AI-Powered Diagnostics
              </span>
            </h1>

            {/* Enhanced description */}
            <p className="text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              Experience the future of healthcare with our advanced AI-driven diagnostic solutions. 
              Precise, personalized, and professional medical insights at your fingertips.
            </p>

            {/* Enhanced CTA buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-6 pt-8">
              <Link
                to="/ai-recommendations-test"
                className="group relative inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-primary/20 overflow-hidden"
              >
                <span className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <FaRobot className="mr-3 h-5 w-5" />
                AI Assistant
                <FaArrowRight className="ml-3 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/all-tests-packages"
                className="group inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-primary text-primary font-medium hover:bg-primary/5 transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                View All Tests
                <FaArrowRight className="ml-3 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="pt-12 flex justify-center items-center gap-8 text-text-secondary text-sm">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                AI-Powered Analysis
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Instant Results
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Professional Care
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
