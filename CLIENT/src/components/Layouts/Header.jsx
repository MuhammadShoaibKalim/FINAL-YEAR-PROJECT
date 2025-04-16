import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/AuthSlice';
import { FaBars, FaTimes, FaUserCircle, FaSignInAlt, FaUserPlus, FaChevronDown } from 'react-icons/fa';
import toast from 'react-hot-toast';
import Topbar from './Topbar';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const user = useSelector((state) => state.Auth?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(setUser(null));
    toast.success('Logged out successfully!');
    navigate('/login');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  const defaultLinks = [
    { name: 'Home', path: '/' },
    { name: 'AI Recommendation', path: '/ai-recommendations-test' },
    { name: 'Labs', path: '/labs' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const userLinks = {
    superadmin: [
      { name: 'Dashboard', path: '/superadmin/dashboard' },
      { name: 'Settings', path: '/superadmin/settings' },
    ],
    admin: [
      { name: 'Dashboard', path: '/admin' },
      { name: 'Users', path: '/admin/users' },
      { name: 'Settings', path: '/admin/settings' },
    ],
    user: [
      { name: 'Dashboard', path: '/dashboard' },
      { name: 'Profile', path: '/profile' },
      { name: 'Settings', path: '/settings' },
    ],
  };

  const roleBasedLinks = user ? userLinks[user.role] || [] : [];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <Topbar />
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" onClick={scrollToTop} className="flex items-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              LabCore
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {defaultLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={scrollToTop}
                className="text-gray-600 hover:text-primary transition-colors duration-200 font-medium px-3 py-2 text-sm rounded-md hover:bg-gray-50"
              >
                {link.name}
              </Link>
            ))}

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors duration-200"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <FaUserCircle size={20} />
                  <span className="font-medium">{user.name?.split(" ")[0] || "User"}</span>
                  <FaChevronDown className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} size={14} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      {roleBasedLinks.map((link) => (
                        <Link
                          key={link.name}
                          to={link.path}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors duration-200"
                        >
                          {link.name}
                        </Link>
                      ))}
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors duration-200"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-primary text-white hover:bg-primary/90 transition-colors duration-200 font-medium px-6 py-2 text-sm rounded-md flex items-center gap-2"
              >
                <FaSignInAlt />
                <span>Login / Sign Up</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
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
              {defaultLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => {
                    setIsOpen(false);
                    scrollToTop();
                  }}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}

              {!user ? (
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className=" px-3 py-2 text-base font-medium text-white bg-primary hover:bg-primary/90 rounded-md transition-colors duration-200 flex items-center gap-2"
                  >
                    <FaSignInAlt />
                    <span>Login / Sign Up</span>
                  </Link>
                </div>
              ) : (
                <div className="pt-4 pb-3 border-t border-gray-200">
                  {roleBasedLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  ))}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:bg-gray-50 rounded-md transition-colors duration-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header; 