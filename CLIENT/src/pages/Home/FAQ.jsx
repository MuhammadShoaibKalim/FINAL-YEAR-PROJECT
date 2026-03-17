import React, { useState } from 'react';
import { FaPlus, FaMinus, FaHeadset, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How do I book a diagnostic test?",
      answer: "You can book a test through our platform by selecting your desired test from the catalog and following the simple checkout process. Our system will guide you through site selection and scheduling."
    },
    {
      question: "How long does it take to receive results?",
      answer: "Most standard diagnostic results are available within 24-48 hours. Specialized tests may take longer, typically between 3-5 business days for full laboratory validation."
    },
    {
      question: "Is home sample collection available?",
      answer: "Yes, we offer home sample collection services in most major cities. You can select the 'Home Collection' option during the booking process."
    },
    {
      question: "Are the partner laboratories certified?",
      answer: "All our partner laboratories are rigorously vetted and hold either NABL or ISO certifications, ensuring the highest standards of accuracy and quality."
    },
    {
      question: "How do I access my reports?",
      answer: "Once your results are ready, they will be uploaded to your secure Patient Dashboard. You will also receive an email notification with a direct link to view your reports."
    },
    {
      question: "Is my personal data secure?",
      answer: "Protecting your health information is our priority. We use advanced encryption and follow strict privacy protocols to ensure your data remains confidential and secure."
    }
  ];

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Refined Header */}
      <section className="bg-slate-50 py-24 border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-6 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Support Center</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tighter">
            Frequently Asked <span className="text-primary">Questions.</span>
          </h1>
          <p className="text-slate-500 font-bold uppercase text-[11px] tracking-widest">
            Clear answers to common questions about our services and processes.
          </p>
        </div>
      </section>

      {/* Simplified FAQ List */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border rounded-2xl transition-all duration-300 ${activeIndex === index ? 'border-primary bg-slate-50/50 shadow-lg shadow-slate-100' : 'border-slate-100 hover:border-slate-200'}`}
            >
              <button 
                onClick={() => toggleAnswer(index)}
                className="w-full text-left px-8 py-6 flex justify-between items-center gap-4 group"
              >
                <span className={`text-[13px] font-black uppercase tracking-tight transition-colors ${activeIndex === index ? 'text-primary' : 'text-slate-700'}`}>
                  {faq.question}
                </span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${activeIndex === index ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200'}`}>
                  {activeIndex === index ? <FaMinus className="text-[10px]" /> : <FaPlus className="text-[10px]" />}
                </div>
              </button>
              
              <div className={`grid transition-all duration-300 ease-in-out ${activeIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                  <div className="px-8 pb-8 pt-0">
                    <div className="h-px bg-slate-100 mb-6" />
                    <p className="text-sm font-bold text-slate-500 leading-relaxed uppercase tracking-tighter italic">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Simple CTA */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-slate-900 rounded-[2.5rem] p-10 text-center space-y-6 shadow-2xl shadow-slate-200">
            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto text-primary text-2xl border border-white/10">
              <FaHeadset />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-white tracking-tight">Still have questions?</h3>
              <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">Our support team is ready to assist you anytime.</p>
            </div>
            <Link to="/contact" className="inline-block">
              <button className="bg-primary text-white border-2 border-primary hover:bg-transparent hover:text-white px-10 py-4 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all">
                Contact Support
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;