import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Topbar = () => {
  return (
    <div className="bg-slate-900 text-white/80 text-[10px] uppercase font-black tracking-widest relative overflow-hidden z-[60] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-10">
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-primary text-[8px]" />
              <span>+92 300 1234567</span>
            </div>
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-primary text-[8px]" />
              <span className="lowercase">support@testsahulat.com</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6 ml-auto md:ml-0">
            <div className="flex items-center gap-4 border-l border-white/10 pl-6">
              <a href="/about" className="hover:text-primary transition-colors">About</a>
              <a href="/contact" className="hover:text-primary transition-colors">Support</a>
              <a href="/join" className="px-3 py-1 bg-primary/10 text-primary rounded-lg border border-primary/20 hover:bg-primary hover:text-white transition-all">Lab Join</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
