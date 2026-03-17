import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import {
  FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaArrowUp, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp
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
    <footer className="relative bg-gradient-to-b from-bg-primary to-bg-secondary text-text-primary pt-16 pb-0">
      {/* Main Panel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-bg-primary/90 rounded-4xl shadow-2xl p-10 md:p-16 flex flex-col md:flex-row md:justify-between gap-12 md:gap-20 -mt-20 relative z-10 border border-border">
          {/* Left: Brand & Newsletter */}
          <div className="flex-1 flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <img src={logo} alt="TestSahulat Logo" aria-label="TestSahulat Logo" className="w-14 h-14 rounded-2xl bg-white p-1 shadow" />
              <div>
                <span className="text-3xl font-extrabold text-primary">TestSahulat</span>
                <p className="text-base text-text-secondary mt-1">Your trusted digital healthcare partner</p>
              </div>
            </div>
            <div>
            </div>
            <div className="flex gap-3 ">
              {[
                { href: "https://facebook.com", icon: <FaFacebook /> },
                { href: "https://twitter.com", icon: <FaTwitter /> },
                { href: "https://linkedin.com", icon: <FaLinkedin /> },
                { href: "https://instagram.com", icon: <FaInstagram /> },
              ].map(({ href, icon }, idx) => (
                <a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary/10 hover:bg-primary text-primary hover:text-white rounded-full p-2 transition-all duration-300 shadow focus:outline-none focus:ring-2 focus:ring-primary"
                  aria-label={`Visit our ${href.split('.')[1]} page`}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
          {/* Right: Links & Contact */}
          <div className="flex-[2] grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Quick Links */}
            <div>
              <h5 className="text-lg font-bold mb-4 text-primary">Quick Links</h5>
              <ul className="space-y-3">
                {[
                  { text: "AI Recommendations", path: "/ai-recommendations-test" },
                  { text: "Most Used Tests", path: "/tests" },
                  { text: "Our Partners", path: "/our-partners" },
                ].map(({ text, path }, idx) => (
                  <li key={idx}>
                    <Link
                      to={path}
                      className="text-text-secondary hover:text-primary font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
  
            {/* Contact */}
            <div>
              <h5 className="text-lg font-bold mb-4 text-primary">Contact Us</h5>
              <div className="space-y-3 text-text-secondary">
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-primary" />
                  <a
                    href="https://maps.google.com/?q=123+Lab+Street,+Science+City,+Country"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    University of Education Lahore, Multan Campus
                  </a>
                </div>
                {/* <div className="flex items-center gap-3">
                  <FaPhoneAlt className="text-primary" />
                  <a href="tel:+1234567890" className="hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary">+123 456 7890</a>
                </div> */}
                <div className="flex items-center gap-3">
                  <FaEnvelope className="text-primary" />
                  <a href="mailto:support@TestSahulat.com" className="hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary">support@TestSahulat.com</a>
                </div>
                <div className="flex items-center gap-3">
                  <FaWhatsapp className="text-primary" />
                  <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary">+123 456 7890</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Divider */}
        <div className="border-t border-border/40 mt-12 mb-0"></div>
        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-text-secondary text-sm">
            © {new Date().getFullYear()} <span className="font-semibold text-primary">TestSahulat</span>. All Rights Reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy-policy" className="text-text-secondary hover:text-primary text-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary">Privacy Policy</Link>
            <Link to="/terms" className="text-text-secondary hover:text-primary text-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary">Terms of Service</Link>
            <Link to="/faq" className="text-text-secondary hover:text-primary text-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary">FAQ</Link>
            {/* <Link to="/accessibility" className="text-text-secondary hover:text-primary text-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary">Accessibility</Link> */}
          </div>
        </div>
        {/* Back to Top Button */}
        {showTopButton && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 bg-primary text-white p-3 rounded-full shadow-primary hover:bg-secondary transition-all duration-300 hover:scale-110 z-50 focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Back to top"
          >
            <FaArrowUp size={20} />
          </button>
        )}
      </div>
    </footer>
  );
};

export default Footer;