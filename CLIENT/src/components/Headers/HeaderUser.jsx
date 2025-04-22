import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignInAlt, FaBars, FaTimes, FaUserCircle, FaSignOutAlt, FaChartLine, FaPhone, FaEnvelope } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { SetUser, Logout } from '../../redux/AuthSlice.js';
import toast from 'react-hot-toast';
import logo from "../../assets/logo.png";

const HeaderUser = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const logout = () => {
    localStorage.removeItem('token');
    dispatch(SetUser(null));
    dispatch(Logout());
    toast.success('Logged out successfully');
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'AI Recommendation', path: '/ai-recommendations-test' },
    { name: 'Labs', path: '/labs' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" onClick={scrollToTop} className="flex items-center">
              <img
                src={logo}
                alt="LabCore Logo"
                className="h-12 sm:h-14 md:h-16 w-auto object-contain rounded-full"
              />
            </Link>

            {/* Desktop Navigation - Centered */}
            <div className="hidden md:flex items-center justify-center flex-1">
              <div className="flex items-center space-x-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={scrollToTop}
                    className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium px-3 py-2 text-sm rounded-md hover:bg-gray-50"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Profile Section */}
            <div className="flex items-center" ref={dropdownRef}>
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors duration-200"
                >
                 {user?.image ? (
  <img
    src={user.image}
    alt="Profile"
    className="w-8 h-8 rounded-full object-cover border border-gray-300"
  />
) : (
  <FaUserCircle className="text-2xl text-gray-600" />
)}
<span className="text-sm font-medium">{user?.firstName || 'User'}</span>

                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    {/* <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.firstName || 'User'}</p>
                      <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
                    </div> */}
                    <Link
                      to="/userprofile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <FaChartLine className="mr-2" /> Dashboard
                    </Link>
                    {/* <Link
                      to="/userprofile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <FaUserCircle className="mr-2" /> Profile
                    </Link> */}
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        logout();
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center"
                    >
                      <FaSignOutAlt className="mr-2" /> Logout
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600 hover:text-primary transition-colors duration-200"
              >
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-b">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => {
                      setIsOpen(false);
                      scrollToTop();
                    }}
                    className="text-gray-700 hover:text-primary hover:bg-gray-50 px-3 py-2 text-base font-medium rounded-md transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="pt-4 pb-3 border-t border-gray-200">
                  <div className="px-3 py-2 border-b border-gray-100">
                    <div className="flex items-center space-x-2">
                    {user?.image ? (
  <img
    src={user.image}
    alt="Profile"
    className="w-8 h-8 rounded-full object-cover border border-gray-300"
  />
) : (
  <FaUserCircle className="text-xl text-gray-600" />
)}

                      <div>
                        <p className="font-medium text-gray-900">{user?.firstName || 'User'}</p>
                      </div>
                    </div>
                  </div>
                  <Link
                    to="/userprofile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors duration-200"
                  >
                    <FaChartLine className="mr-2" /> Dashboard
                  </Link>
                  <Link
                    to="/userprofile"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors duration-200"
                  >
                    <FaUserCircle className="mr-2" /> Profile
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      logout();
                    }}
                    className="w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-gray-50 rounded-md transition-colors duration-200 flex items-center"
                  >
                    <FaSignOutAlt className="mr-2" /> Logout
                  </button>
                </div>
              </div>
      </div>
          )}
        </nav>
    </header>
    </>
  );
};

export default HeaderUser;
