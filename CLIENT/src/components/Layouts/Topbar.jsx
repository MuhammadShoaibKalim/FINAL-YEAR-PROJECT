import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { IoMdTime } from 'react-icons/io';

const Topbar = () => {
  return (
    <div className="bg-gradient-to-r from-primary to-primary-dark text-white text-xs md:text-sm relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-[50px] animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-white/5 rounded-full blur-[50px] animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-12">
          {/* Left side - Contact Info */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="tel:+1234567890" className="flex items-center group">
              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300 backdrop-blur-sm">
                <FaPhone className="text-white" size={12} />
              </div>
              <span className="ml-2 group-hover:text-white/80 transition-colors duration-300">+1 (234) 567-890</span>
            </a>
            <a href="mailto:info@labcore.com" className="flex items-center group">
              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300 backdrop-blur-sm">
                <FaEnvelope className="text-white" size={12} />
              </div>
              <span className="ml-2 group-hover:text-white/80 transition-colors duration-300">info@labcore.com</span>
            </a>
            <div className="flex items-center group">
              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300 backdrop-blur-sm">
                <IoMdTime className="text-white" size={14} />
              </div>
              <span className="ml-2 group-hover:text-white/80 transition-colors duration-300">Mon-Fri: 8AM-6PM</span>
            </div>
          </div>

          {/* Right side - Social Links & Quick Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4 mr-4">
              <a href="#" className="group">
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300 backdrop-blur-sm">
                  <FaWhatsapp className="text-white" size={14} />
                </div>
              </a>
              <a href="#" className="group">
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300 backdrop-blur-sm">
                  <FaFacebook className="text-white" size={14} />
                </div>
              </a>
              <a href="#" className="group">
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300 backdrop-blur-sm">
                  <FaTwitter className="text-white" size={14} />
                </div>
              </a>
              <a href="#" className="group">
                <div className="flex items-center justify-center w-7 h-7 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300 backdrop-blur-sm">
                  <FaLinkedin className="text-white" size={14} />
                </div>
              </a>
            </div>
            
            {/* Quick Actions */}
            <div className="flex items-center space-x-3 border-l border-white/20 pl-4">
              <a href="#" className="text-xs md:text-sm hover:text-white/80 transition-colors duration-300 font-medium">
                Emergency
              </a>
              <span className="text-white/20">|</span>
              <a href="#" className="text-xs md:text-sm hover:text-white/80 transition-colors duration-300 font-medium">
                Book Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
