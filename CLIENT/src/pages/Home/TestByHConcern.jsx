import React from 'react';
import { 
  FaHeartbeat, 
  FaFlask, 
  FaFemale, 
  FaMale, 
  FaUserAlt, 
  FaChild,
  FaArrowRight
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const TestByHConcern = () => {
  const navigate = useNavigate(); 

  const healthConcerns = [
    {
      name: "Heart Health",
      icon: FaHeartbeat,
      description: "Cardiac Analysis",
      accent: "rose"
    },
    {
      name: "Diabetes Care",
      icon: FaFlask,
      description: "Glucose Control",
      accent: "sky"
    },
    {
      name: "Women's Health",
      icon: FaFemale,
      description: "Hormonal Screening",
      accent: "pink"
    },
    {
      name: "Men's Health",
      icon: FaMale,
      description: "Wellness Checks",
      accent: "indigo"
    },
    {
      name: "Senior Care",
      icon: FaUserAlt,
      description: "Geriatric Support",
      accent: "amber"
    },
    {
      name: "Child Health",
      icon: FaChild,
      description: "Pediatric Profile",
      accent: "emerald"
    }
  ];

  const handleCardClick = (concernName) => {
    const path = concernName.toLowerCase().replace(/\s+/g, '-');
    navigate(`/${path}`);
  };

  const getAccentDetails = (accent) => {
    const map = {
        rose: "bg-rose-50 text-rose-500 border-rose-100 hover:bg-rose-500",
        sky: "bg-sky-50 text-sky-500 border-sky-100 hover:bg-sky-500",
        pink: "bg-pink-50 text-pink-500 border-pink-100 hover:bg-pink-500",
        indigo: "bg-indigo-50 text-indigo-500 border-indigo-100 hover:bg-indigo-500",
        amber: "bg-amber-50 text-amber-500 border-amber-100 hover:bg-amber-500",
        emerald: "bg-emerald-50 text-emerald-500 border-emerald-100 hover:bg-emerald-500"
    }
    return map[accent] || "bg-slate-50 text-slate-500 border-slate-100 hover:bg-slate-900";
  }

  return (
    <section className="relative py-24 bg-slate-50 overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight leading-tight">
              Test by <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Health Concern.</span>
            </h2>
            <p className="text-lg text-slate-500 font-medium max-w-xl">
              Precision-mapped diagnostic packages designed to address specific clinical requirements for every age group.
            </p>
          </div>
          <button className="px-8 py-4 bg-white text-slate-800 border-2 border-slate-200 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-primary hover:text-white hover:border-primary transition-all active:scale-95 shadow-sm">
             Browse Clinical Index
          </button>
        </div>

        {/* Health Concerns Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {healthConcerns.map((concern, index) => (
            <div 
              key={index}
              onClick={() => handleCardClick(concern.name)} 
              className={`group relative p-8 rounded-[2rem] border-2 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer h-full flex flex-col justify-between ${getAccentDetails(concern.accent)}`}
            >
              <div className="space-y-6">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-xl shadow-sm border border-black/5 group-hover:scale-110 transition-transform duration-500">
                  <concern.icon />
                </div>
                <div>
                  <h3 className="text-base font-black tracking-tight mb-1 group-hover:text-white transition-colors">{concern.name}</h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 group-hover:text-white/60 transition-colors">{concern.description}</p>
                </div>
              </div>
              
              <div className="pt-8 flex justify-end">
                 <FaArrowRight className="text-xs opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-4 transition-all duration-500 text-white" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestByHConcern;
