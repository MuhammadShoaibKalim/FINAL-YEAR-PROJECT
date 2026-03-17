import React from "react";
import { motion } from "framer-motion";
import { FaFileContract, FaCheckCircle, FaExclamationTriangle, FaGavel } from "react-icons/fa";
import MetaTags from "../../components/MetaTags";

const Terms = () => {
  const terms = [
    {
      title: "Medical Disclaimer",
      icon: <FaExclamationTriangle className="text-amber-500" />,
      content: "The content on TestSahulat is for informational purposes only. It is not intended as medical advice. Always consult a physician for diagnosis and treatment."
    },
    {
      title: "Booking & Payments",
      icon: <FaCheckCircle className="text-primary" />,
      content: "All bookings are subject to availability of the selected laboratory. Payments are non-refundable once the sample collection process has initiated."
    },
    {
      title: "Privacy & Data",
      icon: <FaFileContract className="text-secondary" />,
      content: "By using our services, you agree to the collection and use of your health data as outlined in our Privacy Policy for diagnostic purposes."
    },
    {
      title: "Legal Jurisdiction",
      icon: <FaGavel className="text-slate-500" />,
      content: "These terms are governed by the laws of Pakistan. Any disputes shall be subject to the exclusive jurisdiction of the courts in Lahore/Islamabad."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-20">
      <MetaTags title="Terms of Service" description="Our agreement with you regarding the use of TestSahulat diagnostic platform." />
      
      {/* Header */}
      <section className="bg-white border-b border-slate-200 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-20 h-20 bg-slate-900 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-slate-200"
          >
            <FaFileContract className="text-3xl text-white" />
          </motion.div>
          <h1 className="text-4xl font-black text-slate-800 mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Terms of Service</h1>
          <p className="text-slate-500 font-medium italic underline decoration-primary/30 underline-offset-4">Your agreement with TestSahulat diagnostic platform.</p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-4 mt-12">
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200 border border-slate-100 p-8 md:p-14">
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-black text-slate-800 mb-4">Agreement to Terms</h2>
              <p className="text-slate-500 leading-relaxed">
                By accessing or using TestSahulat, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
              </p>
            </div>

            <div className="grid gap-8">
              {terms.map((term, idx) => (
                <div key={idx} className="bg-slate-50 p-6 rounded-3xl border border-slate-100 flex gap-6 items-start hover:bg-white hover:border-primary/20 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-xl shadow-sm border border-slate-100 shrink-0">
                    {term.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">{term.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{term.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-10 mt-10 border-t border-slate-100 text-center">
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-6">Questions about our terms?</p>
              <button className="px-12 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-primary transition-all shadow-xl shadow-slate-200 uppercase text-xs tracking-widest">
                Contact Legal Team
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;
