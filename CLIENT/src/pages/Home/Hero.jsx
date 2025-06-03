import React from 'react';
import { FaArrowRight, FaRobot } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import HeroLab1 from '../../assets/HeroLab1.png';
import HeroLab2 from '../../assets/HeroLab2.png';
import HeroLab3 from '../../assets/HeroLab3.png';
import HeroLab4 from '../../assets/HeroLab4.png';

const heroImages = [HeroLab1, HeroLab2, HeroLab3, HeroLab4];


const Hero = () => {
  return (
    <div className="relative min-h-[90vh] bg-gradient-to-br from-primary/10 via-bg-primary to-secondary/10 flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
      {/* Decorative Orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse z-0" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-l from-primary/20 to-secondary/20 rounded-full blur-3xl animate-pulse z-0" />

      {/* Hero Content Grid */}
      <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-20">
        {/* Left Content */}
        <div className=" space-y-8 text-center md:text-left">
          <h1 className="text-5xl md:text-4xl font-bold leading-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Your Health, Our Priority with
            <span className="text-4xl md:text-4xl block mt-2 ">
              AI-Based Recommendations
            </span>
          </h1>

          <p className="text-xl md:text-xl text-text-secondary leading-relaxed text-justify">
            Experience the future of healthcare with our advanced AI-driven diagnostic solutions.
            Precise, personalized, and professional medical insights at your fingertips.
          </p>

          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-6 pt-4">
            <Link
              to="/ai-recommendations-test"
              className="group inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-medium hover:scale-105 hover:shadow-xl transition-all"
            >
              <FaRobot className="mr-3 h-5 w-5" />
              AI Assistant
              <FaArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/all-tests-packages"
              className="group inline-flex items-center justify-center px-8 py-4 rounded-xl border-2 border-primary text-primary font-medium hover:bg-primary/5 hover:scale-105 transition-all"
            >
              View All Tests
              <FaArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="pt-6 flex justify-center md:justify-start gap-6 text-primary text-sm flex-wrap">
            <span className="flex items-center gap-2"><FaRobot className="text-primary" /> AI-Powered Analysis</span>
            <span className="flex items-center gap-2"><FaRobot className="text-primary" /> Instant Results</span>
            <span className="flex items-center gap-2"><FaRobot className="text-primary" /> Professional Care</span>
          </div>
        </div>

        {/* Right Side Carousel */}
        <div className="w-full h-[500px] rounded-xl overflow-hidden shadow-xl">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop={true}
            className="w-full h-full"
          >
            {heroImages.map((img, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={img}
                  alt={`Slide ${idx + 1}`}
                  className="w-full h-full object-cover rounded-xl"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Hero;
