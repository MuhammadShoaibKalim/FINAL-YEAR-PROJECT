import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import { 
  FaFacebook, FaTwitter, FaLinkedin, FaInstagram, 
  FaArrowUp, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt,
  FaClock, FaWhatsapp
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
    <footer className="bg-gradient-to-b from-primary to-primary-dark text-white">
    
      {/* Main Footer Content */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* About Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold relative inline-block">
                About LabCore
                <span className="absolute bottom-0 left-0 w-12 h-1 bg-bg-primary/30 rounded-full"></span>
              </h3>
              <p className="text-white text-sm leading-relaxed">
                Your trusted healthcare partner offering AI-powered insights, personalized recommendations, and seamless test booking.
              </p>
              <div className="flex space-x-4">
                {[
                  { href: "https://facebook.com", icon: <FaFacebook /> },
                  { href: "https://twitter.com", icon: <FaTwitter /> },
                  { href: "https://linkedin.com", icon: <FaLinkedin /> },
                  { href: "https://instagram.com", icon: <FaInstagram /> },
                ].map(({ href, icon }, index) => (
                  <Link 
                    key={index} 
                    to={href} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white hover:text-white/80 transition-all duration-300 hover:scale-110 text-lg"
                  >
                    {icon}
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold relative inline-block">
                Quick Links
                <span className="absolute bottom-0 left-0 w-12 h-1 bg-bg-primary/30 rounded-full"></span>
              </h3>
              <ul className="space-y-2">
                {[
                  { text: "Book a Test", path: "/labs" },
                  { text: "Most Used Tests", path: "/labs" },
                  { text: "AI Recommendations", path: "/ai-recommendations-test" },
                  { text: "Emergency Services", path: "/emergency" },
                ].map(({ text, path }, index) => (
                  <li key={index}>
                    <Link 
                      to={path} 
                      className="text-white hover:text-white/80 transition-colors duration-300 flex items-center group"
                    >
                      <span className="w-1.5 h-1.5 bg-bg-primary/30 rounded-full mr-2 group-hover:bg-bg-primary transition-colors duration-300"></span>
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold relative inline-block">
                Our Services
                <span className="absolute bottom-0 left-0 w-12 h-1 bg-bg-primary/30 rounded-full"></span>
              </h3>
              <ul className="space-y-2">
                {[
                  { text: "Lab Tests", path: "/services/lab-tests" },
                  { text: "Health Packages", path: "/services/health-packages" },
                  { text: "Home Collection", path: "/services/home-collection" },
                  { text: "Corporate Services", path: "/services/corporate" },
                ].map(({ text, path }, index) => (
                  <li key={index}>
                    <Link 
                      to={path} 
                      className="text-white hover:text-white/80 transition-colors duration-300 flex items-center group"
                    >
                      <span className="w-1.5 h-1.5 bg-bg-primary/30 rounded-full mr-2 group-hover:bg-bg-primary transition-colors duration-300"></span>
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold relative inline-block">
                Contact Us
                <span className="absolute bottom-0 left-0 w-12 h-1 bg-bg-primary/30 rounded-full"></span>
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <FaMapMarkerAlt className="text-white mt-1" />
                  <p className="text-white text-sm">123 Lab Street, Science City, Country</p>
                </div>
                <div className="flex items-center space-x-3">
                  <FaPhoneAlt className="text-white" />
                  <p className="text-white text-sm">+123 456 7890</p>
                </div>
                <div className="flex items-center space-x-3">
                  <FaEnvelope className="text-white" />
                  <p className="text-white text-sm">support@labcore.com</p>
                </div>
                <div className="flex items-center space-x-3">
                  <FaClock className="text-white" />
                  <p className="text-white text-sm">Mon-Fri: 8AM-6PM</p>
                </div>
                <div className="flex items-center space-x-3">
                  <FaWhatsapp className="text-white" />
                  <p className="text-white text-sm">+123 456 7890</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showTopButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-bg-primary text-black p-3 rounded-full shadow-primary hover:bg-bg-secondary transition-all duration-300 hover:scale-110 z-50"
          aria-label="Back to top"
        >
          <FaArrowUp size={20} />
        </button>
      )}

      {/* Footer Bottom */}
      <div className="border-t border-border py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white text-sm">
              © {new Date().getFullYear()} <span className="font-semibold">LabCore</span>. All Rights Reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy-policy" className="text-white hover:text-white/80 text-sm transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-white hover:text-white/80 text-sm transition-colors duration-300">
                Terms of Service
              </Link>
              <Link to="/faq" className="text-white hover:text-white/80 text-sm transition-colors duration-300">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;