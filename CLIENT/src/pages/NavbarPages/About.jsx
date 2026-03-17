import React from "react";
import { motion } from "framer-motion";
import { FaHeartbeat, FaMicroscope, FaUserShield, FaHandHoldingHeart } from "react-icons/fa";
import MetaTags from "../../components/MetaTags";

const About = () => {
  const stats = [
    { label: "Partner Labs", value: "50+" },
    { label: "Happy Patients", value: "10k+" },
    { label: "Tests Available", value: "500+" },
    { label: "Cities Covered", value: "12+" },
  ];

  const values = [
    { icon: <FaHeartbeat />, title: "Patient First", desc: "Every decision we make starts with the patient's wellbeing and comfort." },
    { icon: <FaMicroscope />, title: "Accuracy", desc: "We only partner with ISO certified labs to ensure the highest testing standards." },
    { icon: <FaUserShield />, title: "Privacy", desc: "Your health data is encrypted and accessible only to you and your lab." },
    { icon: <FaHandHoldingHeart />, title: "Compassion", desc: "Healthcare is personal. We treat every case with the empathy it deserves." },
  ];

  return (
    <div className="bg-white pt-24 pb-20">
      <MetaTags title="About Us" description="Learn about TestSahulat mission to revolutionize diagnostic healthcare in Pakistan." />
      
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-black uppercase tracking-[0.3em] text-xs mb-4 block"
          >
            Our Mission
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight"
          >
            Revolutionizing Diagnostic <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary italic">Healthcare in Pakistan.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            TestSahulat is a digital-first platform bridging the gap between quality laboratories and patients through technology and compassion.
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-6xl mx-auto px-4 -mt-16 relative z-20">
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 p-8 md:p-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center group">
              <div className="text-3xl md:text-4xl font-black text-slate-800 mb-1 group-hover:text-primary transition-colors">{stat.value}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Values */}
      <section className="max-w-6xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">Our Core Values</h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((v, idx) => (
            <motion.div 
              whileHover={{ y: -10 }}
              key={idx} 
              className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-primary/10 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white text-2xl mb-6 shadow-lg shadow-primary/20">
                {v.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{v.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-slate-50 py-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-30"></div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-secondary/20 rounded-full blur-3xl opacity-30"></div>
            <img 
              src="https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Medical Lab" 
              className="rounded-[3rem] shadow-2xl relative z-10 border-8 border-white"
            />
          </div>
          <div>
            <span className="text-primary font-black uppercase tracking-widest text-xs mb-4 block">How we started</span>
            <h2 className="text-4xl font-black text-slate-800 mb-6 leading-tight tracking-tight">Making healthcare accessible for everyone, anywhere.</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              TestSahulat was born out of a simple observation: finding, comparing, and booking medical tests in Pakistan was a fragmented and stressful experience. Patients often had no way to verify price accuracy or track their historical reports in one place.
            </p>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Today, we serve thousands of users across the country, providing them with a transparent, efficient, and compassionate way to manage their diagnostic journey. We are not just a booking portal; we are your health partner.
            </p>
            <button className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-primary transition-all shadow-xl shadow-slate-200">
              Join our Network
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
