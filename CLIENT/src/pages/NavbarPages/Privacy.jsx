import React from "react";
import { motion } from "framer-motion";
import { FaShieldAlt, FaUserLock, FaDatabase, FaEyeSlash } from "react-icons/fa";
import MetaTags from "../../components/MetaTags";

const Privacy = () => {
  const sections = [
    {
      icon: <FaShieldAlt className="text-primary" />,
      title: "Information Collection",
      content: "We collect information you provide directly to us when you create an account, book a test, or contact support. This includes your name, email address, phone number, and medical prescription details required for diagnostic testing."
    },
    {
      icon: <FaUserLock className="text-primary" />,
      title: "Data Protection",
      content: "Your data is encrypted using industry-standard SSL/TLS technology. We implement strict internal access controls to ensure that your health information is only visible to authorized lab technicians and yourself."
    },
    {
      icon: <FaDatabase className="text-primary" />,
      title: "Data Retention",
      content: "We retain your medical reports and personal information only as long as necessary to provide our services and comply with legal requirements in accordance with healthcare regulations."
    },
    {
      icon: <FaEyeSlash className="text-primary" />,
      title: "Third-Party Sharing",
      content: "We do not sell your personal information. We only share necessary details with our partner laboratories specifically to fulfill your test requests and ensure accurate reporting."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20">
      <MetaTags title="Privacy Policy" description="How we protect your health data and personal information." />
      
      {/* Header */}
      <section className="bg-white border-b border-slate-200 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-primary/5 rounded-[2rem] flex items-center justify-center mx-auto mb-6 border border-primary/10"
          >
            <FaShieldAlt className="text-3xl text-primary" />
          </motion.div>
          <h1 className="text-4xl font-black text-slate-800 mb-4 tracking-tight">Privacy Policy</h1>
          <p className="text-slate-500 font-medium italic">Last Updated: March 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-4 mt-12">
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200 border border-slate-100 p-8 md:p-14 space-y-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
          
          <div className="prose prose-slate max-w-none relative z-10">
            <p className="text-lg text-slate-600 leading-relaxed italic border-l-4 border-primary pl-6 bg-slate-50 py-4 rounded-r-2xl">
              "At TestSahulat, your privacy is our highest priority. We believe your health data belongs to you, and we are committed to protecting it with the highest standards of digital security."
            </p>
          </div>

          <div className="grid gap-10 relative z-10">
            {sections.map((section, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-6 items-start"
              >
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-xl shrink-0 border border-slate-100 shadow-sm transition-transform hover:scale-110 hover:border-primary/30">
                  {section.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-3">{section.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">{section.content}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="pt-10 border-t border-slate-100 relative z-10">
             <h3 className="text-2xl font-black text-slate-800 mb-6">Contact Us About Privacy</h3>
             <div className="bg-slate-900 rounded-3xl p-8 text-white flex flex-wrap justify-between items-center gap-6">
                <div>
                  <p className="text-slate-400 text-[10px] mb-1 uppercase tracking-widest font-black">Email your questions to</p>
                  <p className="text-xl font-bold text-primary underline underline-offset-4 decoration-2">privacy@testsahulat.com</p>
                </div>
                <button className="px-8 py-3 bg-white text-slate-900 font-bold rounded-2xl hover:bg-primary hover:text-white transition-all active:scale-95 shadow-lg">
                  Request Data Export
                </button>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
