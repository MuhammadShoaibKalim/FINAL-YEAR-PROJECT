import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900">
      <div className="relative">
        {/* Outer ambient glow */}
        <div className="absolute -inset-10 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        
        <div className="relative flex flex-col items-center gap-8">
          {/* Animated Logo/Icon placeholder */}
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.3, 1, 0.3],
                  backgroundColor: i === 1 ? '#00f2fe' : '#ffffff'
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
                className="w-4 h-12 rounded-full shadow-[0_0_20px_rgba(0,242,254,0.3)]"
              />
            ))}
          </div>

          <div className="text-center space-y-2">
            <p className="text-[10px] font-black text-white/50 uppercase tracking-[0.5em] animate-pulse">Initializing Environment</p>
            <div className="flex items-center gap-3">
               <span className="w-8 h-[1px] bg-white/10"></span>
               <p className="text-xl font-black text-white tracking-tighter italic">Patient <span className="text-primary NOT-italic">Portal.</span></p>
               <span className="w-8 h-[1px] bg-white/10"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
