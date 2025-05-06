import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaUserCircle, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/AuthSlice';
import toast from 'react-hot-toast';
import logo from '../../assets/logo.png';
import Topbar from '../Layouts/Topbar';

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const role = user?.role?.toLowerCase();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isMinimal = ['superadmin', 'labadmin'].includes(role);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const logout = () => {
    dispatch(logoutUser()).then(() => {
      toast.success('Logged out successfully');
      navigate('/login');
    });
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = isMinimal
    ? [
        {
          name: 'Dashboard',
          path:
            role === 'superadmin'
              ? '/admin/super/overview'
              : '/labadmin/lab/labdashboard',
        },
        {
          name: 'Profile',
          path:
            role === 'superadmin'
              ? '/admin/super/settings'
              : '/labadmin/lab/profile',
        },
      ]
    : [
        { name: 'Home', path: '/' },
        { name: 'AI Recommendation', path: '/ai-recommendations-test' },
        { name: 'Labs', path: '/labs' },
        { name: 'About Us', path: '/about' },
        { name: 'Contact Us', path: '/contact' },
      ];

  return (
    <>
      <Topbar />
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

            {/* Center Nav */}
            <div className="hidden md:flex items-center justify-center flex-1">
              <div className="flex items-center space-x-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-gray-600 hover:text-primary transition px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4" ref={dropdownRef}>
              {!user ? (
                <Link
                  to="/login"
                  className="bg-primary text-white hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium flex items-center gap-2"
                >
                  <FaSignInAlt /> Login / Sign Up
                </Link>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 text-gray-700 hover:text-primary transition"
                  >
                    {user.image ? (
                      <img
                        src={user.image}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <FaUserCircle className="text-2xl" />
                    )}
                    <span className="text-sm font-medium">
                      {user.firstName || 'User'}
                    </span>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-50">
                      {navLinks.map((link) => (
                        <Link
                          key={link.name}
                          to={link.path}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          {link.name}
                        </Link>
                      ))}
                      <button
                        onClick={() => {
                          logout();
                          setIsDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                      >
                        <FaSignOutAlt className="inline mr-1" /> Logout
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Mobile Toggle */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-gray-600 hover:text-primary"
                >
                  {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden px-2 pt-2 pb-3 bg-white border-t">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="block px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {user && (
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-red-600 hover:bg-gray-50 rounded-md"
                >
                  <FaSignOutAlt className="inline mr-1" /> Logout
                </button>
              )}
            </div>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
