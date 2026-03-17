import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import {
  FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaArrowUp, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaShieldAlt
} from "react-icons/fa";

const Footer = () => {
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-900 pt-24 pb-12 relative overflow-hidden font-sans">
      {/* Decorative background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -mr-64 -mt-64 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] -ml-64 -mb-64 animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          {/* Brand Section */}
          <div className="lg:col-span-4 space-y-8">
            <Link to="/" className="flex items-center gap-4 group">
              <div className="w-16 h-16 bg-white rounded-[1.5rem] flex items-center justify-center p-2 shadow-2xl group-hover:scale-105 transition-transform border-4 border-slate-800">
                <img src={logo} alt="TestSahulat" className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="text-3xl font-black text-white tracking-tighter">Test<span className="text-primary italic">Sahulat</span></span>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 -mt-1">Healthcare Reimagined</p>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              Empowering patients with AI-driven diagnostic insights and connecting them with certified laboratories across Pakistan for a seamless healthcare journey.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <FaFacebookF />, color: 'hover:bg-blue-600' },
                { icon: <FaTwitter />, color: 'hover:bg-sky-500' },
                { icon: <FaLinkedinIn />, color: 'hover:bg-blue-700' },
                { icon: <FaInstagram />, color: 'hover:bg-pink-600' },
              ].map((social, idx) => (
                <button
                  key={idx}
                  className={`w-10 h-10 rounded-xl bg-slate-800 text-slate-400 flex items-center justify-center transition-all duration-300 hover:text-white hover:scale-110 shadow-lg ${social.color}`}
                >
                  {social.icon}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-8">
            <h5 className="text-sm font-black text-white uppercase tracking-[0.3em]">Services</h5>
            <ul className="space-y-4">
              {[
                { name: "Diagnostic Tests", path: "/all-tests-packages" },
                { name: "Lab Partners", path: "/labs" },
                { name: "AI Health Assistant", path: "/ai-recommendations-test" },
                { name: "Join Laboratory", path: "/join" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="text-slate-500 hover:text-primary text-sm font-bold transition-colors block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="lg:col-span-2 space-y-8">
            <h5 className="text-sm font-black text-white uppercase tracking-[0.3em]">Support</h5>
            <ul className="space-y-4">
              {[
                { name: "About Us", path: "/about" },
                { name: "Contact Support", path: "/contact" },
                { name: "Privacy Policy", path: "/privacy-policy" },
                { name: "Terms of Use", path: "/terms" },
              ].map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="text-slate-500 hover:text-primary text-sm font-bold transition-colors block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-4 space-y-8">
            <h5 className="text-sm font-black text-white uppercase tracking-[0.3em]">Contact Hub</h5>
            <div className="space-y-6">
              <div className="flex gap-4 group">
                 <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-lg shrink-0">
                    <FaMapMarkerAlt />
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Our Location</p>
                    <p className="text-sm text-slate-300 font-bold leading-snug">U.O.E Multan Campus, Bosan Road, Multan, Pakistan</p>
                 </div>
              </div>
              <div className="flex gap-4 group">
                 <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-lg shrink-0">
                    <FaEnvelope />
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Email Support</p>
                    <p className="text-sm text-slate-300 font-bold leading-snug">care@testsahulat.com</p>
                 </div>
              </div>
              <div className="flex gap-4 group">
                 <div className="w-12 h-12 bg-slate-800 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-lg shrink-0">
                    <FaWhatsapp />
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">WhatsApp Primary</p>
                    <p className="text-sm text-slate-300 font-bold leading-snug">+92 344 7977457</p>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3 bg-slate-800/50 px-6 py-3 rounded-2xl border border-white/5 shadow-inner">
             <FaShieldAlt className="text-secondary text-xl" />
             <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Verified Secure</p>
                <p className="text-[9px] font-bold text-slate-500 uppercase italic">NABL & ISO Lab Certifications Validated</p>
             </div>
          </div>
          <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest text-center">
            © {new Date().getFullYear()} <span className="text-primary">TestSahulat</span> Industries Pakistan. All Rights Reserved.
          </p>
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
             <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">System Status: Optimal</span>
          </div>
        </div>
      </div>

      {/* Back to Top */}
      {showTopButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-10 right-10 w-14 h-14 bg-primary text-white flex items-center justify-center rounded-2xl shadow-2xl hover:bg-secondary hover:-translate-y-2 transition-all duration-500 z-[100] group active:scale-90"
          aria-label="Back to top"
        >
          <FaArrowUp className="text-xl group-hover:scale-125 transition-transform" />
        </button>
      )}
    </footer>
  );
};

export default Footer;