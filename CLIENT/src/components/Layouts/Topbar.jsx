import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import { IoMdTime } from 'react-icons/io';

const Topbar = () => {
  return (
    <div className="bg-gradient-to-r from-primary to-primary-dark text-white text-xs md:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-9">
          {/* Left side - Contact Info */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="tel:+1234567890" className="flex items-center group">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300">
                <FaPhone className="text-white" size={10} />
              </div>
              <span className="ml-2 group-hover:text-gray-200 transition-colors duration-200">+1 (234) 567-890</span>
            </a>
            <a href="mailto:info@labcore.com" className="flex items-center group">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300">
                <FaEnvelope className="text-white" size={10} />
              </div>
              <span className="ml-2 group-hover:text-gray-200 transition-colors duration-200">info@labcore.com</span>
            </a>
            <div className="flex items-center group">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300">
                <IoMdTime className="text-white" size={12} />
              </div>
              <span className="ml-2 group-hover:text-gray-200 transition-colors duration-200">Mon-Fri: 8AM-6PM</span>
            </div>
          </div>

          {/* Right side - Social Links & Quick Actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4 mr-4">
              <a href="#" className="group">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300">
                  <FaWhatsapp className="text-white" size={12} />
                </div>
              </a>
              <a href="#" className="group">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300">
                  <FaFacebook className="text-white" size={12} />
                </div>
              </a>
              <a href="#" className="group">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300">
                  <FaTwitter className="text-white" size={12} />
                </div>
              </a>
              <a href="#" className="group">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300">
                  <FaLinkedin className="text-white" size={12} />
                </div>
              </a>
            </div>
            
            {/* Quick Actions */}
            <div className="flex items-center space-x-2 border-l border-white/20 pl-4">
              <a href="#" className="text-xs md:text-sm hover:text-gray-200 transition-colors duration-200">Emergency</a>
              <span className="text-white/20">|</span>
              <a href="#" className="text-xs md:text-sm hover:text-gray-200 transition-colors duration-200">Book Now</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
