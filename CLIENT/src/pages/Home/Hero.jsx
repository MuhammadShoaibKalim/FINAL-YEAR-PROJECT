import React from 'react';
import { FaArrowRight, FaRobot, FaMicroscope, FaShieldAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

import HeroLab1 from '../../assets/HeroLab1.png';
import HeroLab2 from '../../assets/HeroLab2.png';
import HeroLab3 from '../../assets/HeroLab3.png';
import HeroLab4 from '../../assets/HeroLab4.png';

const heroImages = [HeroLab1, HeroLab2, HeroLab3, HeroLab4];

const Hero = () => {
  return (
    <div className="relative min-h-[95vh] bg-white flex items-center overflow-hidden font-sans">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/50 to-transparent z-10"></div>
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect={'fade'}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          className="w-full h-full grayscale opacity-20"
        >
          {heroImages.map((img, idx) => (
            <SwiperSlide key={idx}>
              <img src={img} alt="Lab" className="w-full h-full object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-10 max-w-2xl">
            <div className="inline-flex items-center gap-3 bg-primary/5 px-6 py-3 rounded-2xl border border-primary/10 animate-in fade-in slide-in-from-left duration-700">
               <span className="relative flex h-3 w-3">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
               </span>
               <p className="text-[10px] font-black uppercase tracking-[0.3em] text-primary">Next-Gen AI Diagnostics Active</p>
            </div>

            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl font-black text-slate-800 leading-[1.05] tracking-tight">
                Healthcare <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary italic">Redefined.</span>
              </h1>
              <p className="text-xl text-slate-500 leading-relaxed font-medium">
                Experience Pakistan's first AI-powered diagnostic platform. Instant recommendations, verified lab testing, and secure digital records all in one place.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <Link
                to="/ai-recommendations-test"
                className="group px-10 py-5 bg-slate-900 text-white rounded-[1.5rem] font-black uppercase text-xs tracking-[0.2em] hover:bg-primary transition-all active:scale-95 shadow-2xl shadow-slate-200 flex items-center justify-center gap-4"
              >
                <FaRobot className="text-lg text-secondary" />
                Launch AI Assistant
                <FaArrowRight className="text-[10px] group-hover:translate-x-2 transition-transform" />
              </Link>

              <Link
                to="/all-tests-packages"
                className="px-10 py-5 bg-white text-slate-800 border-2 border-slate-100 rounded-[1.5rem] font-black uppercase text-xs tracking-[0.2em] hover:border-primary/30 transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                Explore All Tests
              </Link>
            </div>

            <div className="pt-12 grid grid-cols-2 sm:grid-cols-3 gap-8">
               <div className="space-y-2">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-primary border border-slate-100 shadow-sm">
                     <FaMicroscope />
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">50+ Certified Labs</p>
               </div>
               <div className="space-y-2">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-secondary border border-slate-100 shadow-sm">
                     <FaShieldAlt />
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ISO Validated</p>
               </div>
               <div className="space-y-2">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-primary border border-slate-100 shadow-sm">
                     <FaRobot />
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">AI Recommendations</p>
               </div>
            </div>
          </div>

          {/* Right Image/Carousel with Glassmorphic Card */}
          <div className="relative group lg:block hidden">
            <div className="absolute -inset-10 bg-primary/20 rounded-full blur-[100px] opacity-30 animate-pulse"></div>
            <div className="relative z-10 w-full aspect-[4/5] rounded-[3rem] overflow-hidden border-8 border-white shadow-2xl shadow-slate-200 group-hover:scale-[1.02] transition-transform duration-700">
                <Swiper
                  modules={[Autoplay]}
                  autoplay={{ delay: 3500, disableOnInteraction: false }}
                  loop={true}
                  className="w-full h-full"
                >
                  {heroImages.map((img, idx) => (
                    <SwiperSlide key={idx}>
                      <img src={img} alt={`Health ${idx}`} className="w-full h-full object-cover" />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg">T</div>
                      <div>
                         <p className="text-white font-black tracking-tight">Verified Diagnostic Partners</p>
                         <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest">National Accreditation Council Certified</p>
                      </div>
                   </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
