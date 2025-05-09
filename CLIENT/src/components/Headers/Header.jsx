import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaUserCircle, FaSignInAlt, FaSignOutAlt, FaShoppingCart,
  FaChartLine, FaBars, FaTimes, FaChevronDown
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/AuthSlice';
import toast from 'react-hot-toast';
import logo from '../../assets/logo.png';
import Topbar from '../Layouts/Topbar';

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const profileDropdownRef = useRef(null);
  const exploreDropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const role = user?.role?.toLowerCase();
  const isMinimal = ['superadmin', 'labadmin'].includes(role);

  const logout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (err) {
      toast.error('Logout failed. Try again.');
      console.error(err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      // Close profile dropdown if clicked outside
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
      
      // Close explore dropdown if clicked outside
      if (exploreDropdownRef.current && !exploreDropdownRef.current.contains(e.target)) {
        setIsExploreOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProfileClick = (e) => {
    e.stopPropagation();
    setIsProfileOpen(!isProfileOpen);
    setIsExploreOpen(false);
  };

  const handleExploreClick = (e) => {
    e.stopPropagation();
    setIsExploreOpen(!isExploreOpen);
    setIsProfileOpen(false);
  };

  const handleMobileLinkClick = () => {
    setIsMobileOpen(false);
  };

  return (
    <>
      {!isMinimal && <Topbar />}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-border-dark shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="LabCore Logo" className="h-20 w-auto rounded-full object-cover" />
            </Link>

            {/* Center: Explore, Search */}
            {!isMinimal && (
              <div className="flex items-center space-x-6 flex-1 justify-center text-sm font-medium">
                <div className="relative" ref={exploreDropdownRef}>
                  <button
                    onClick={handleExploreClick}
                    className="flex items-center gap-1 text-gray-700 hover:text-primary"
                  >
                    Explore
                    <FaChevronDown className={`transition-transform duration-300 ${isExploreOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isExploreOpen && (
                    <div className="absolute top-full mt-2 w-52 bg-white border shadow rounded z-40">
                      <Link
                        to="/labs"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setIsExploreOpen(false)}
                      >
                        All Labs
                      </Link>
                      <Link
                        to="/all-tests-packages"
                        className="block px-4 py-2 hover:bg-gray-100"
                        onClick={() => setIsExploreOpen(false)}
                      >
                        Tests & Packages
                      </Link>
                    </div>
                  )}
                </div>
                <Link to="/ai-recommendations-test" className="text-gray-700 hover:text-primary">
                  AI Recommendation
                </Link>
                <input
                  type="text"
                  placeholder="Search any test or lab..."
                  className="w-[350px] px-4 py-2 rounded-full text-sm border border-gray-300 focus:ring-primary focus:outline-none"
                />
              </div>
            )}

            {/* Right: Profile + Cart */}
            <div className="flex items-center gap-4">
              {!user ? (
                <Link to="/login" className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                  <FaSignInAlt /> Login / Register
                </Link>
              ) : (
                <div className="relative" ref={profileDropdownRef}>
                  <button
                    onClick={handleProfileClick}
                    className="flex items-center gap-2 text-gray-700 hover:text-primary"
                  >
                    {user.image ? (
                      <img src={user.image} alt="User" className="w-8 h-8 rounded-full object-cover border border-gray-300" />
                    ) : (
                      <FaUserCircle className="text-2xl" />
                    )}
                    <span className="text-sm">{user.firstName}</span>
                  </button>
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border shadow-md rounded-md z-50">
                      <Link 
                        to="/user" 
                        className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <FaChartLine className="mr-2" /> Dashboard
                      </Link>
                      <button
                        onClick={logout}
                        className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <FaSignOutAlt className="mr-2" /> Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
              {!isMinimal && (
                <Link to="/user/cart" className="relative text-gray-700 hover:text-primary">
                  <FaShoppingCart size={20} />
                  {totalQuantity > 0 && (
                    <span className="absolute -top-2 -right-2 text-xs px-1.5 py-0.5 bg-red-600 text-white rounded-full animate-bounce">
                      {totalQuantity}
                    </span>
                  )}
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center justify-between h-16">
            {!isMinimal && (
              <Link to="/user/cart" className="relative text-gray-700 hover:text-primary">
                <FaShoppingCart size={20} />
                {totalQuantity > 0 && (
                  <span className="absolute -top-2 -right-2 text-xs px-1 py-0.5 bg-red-600 text-white rounded-full animate-bounce">
                    {totalQuantity}
                  </span>
                )}
              </Link>
            )}
            {!isMinimal && (
              <input
                type="text"
                placeholder="Search..."
                className="w-1/2 px-3 py-1.5 rounded-full text-sm border border-gray-300 focus:ring-primary focus:outline-none"
              />
            )}
            <button 
              onClick={() => setIsMobileOpen(!isMobileOpen)} 
              className="text-gray-700 hover:text-primary"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>

          {isMobileOpen && (
            <div className="md:hidden bg-white border-t px-4 pt-4 pb-6 space-y-3">
              {!isMinimal && (
                <>
                  <Link 
                    to="/labs" 
                    className="block px-3 py-2 rounded hover:bg-gray-100" 
                    onClick={handleMobileLinkClick}
                  >
                    Labs
                  </Link>
                  <Link 
                    to="/all-tests-packages" 
                    className="block px-3 py-2 rounded hover:bg-gray-100" 
                    onClick={handleMobileLinkClick}
                  >
                    Tests & Packages
                  </Link>
                  <Link 
                    to="/ai-recommendations-test" 
                    className="block px-3 py-2 rounded hover:bg-gray-100" 
                    onClick={handleMobileLinkClick}
                  >
                    AI Recommendation
                  </Link>
                </>
              )}
              {user && !isMinimal && (
                <>
                  <Link 
                    to="/user" 
                    className="flex items-center px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={handleMobileLinkClick}
                  >
                    <FaChartLine className="mr-2" /> Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileOpen(false);
                    }}
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <FaSignOutAlt className="mr-2" /> Logout
                  </button>
                </>
              )}
              {!user && !isMinimal && (
                <Link 
                  to="/login" 
                  className="block text-center bg-primary text-white py-2 rounded font-semibold"
                  onClick={handleMobileLinkClick}
                >
                  Login / Register
                </Link>
              )}
            </div>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;