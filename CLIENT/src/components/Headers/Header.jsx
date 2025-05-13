import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaUserCircle, FaSignInAlt, FaSignOutAlt, FaShoppingCart,
  FaChartLine, FaBars, FaTimes, FaChevronDown, FaSearch
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/AuthSlice';
import toast from 'react-hot-toast';
import logo from '../../assets/logo.png';
import Topbar from '../Layouts/Topbar';

const SUGGESTIONS = [
  'CBC',
  'Diabetes',
  'Lipid Profile',
  'Heart Health',
  'Thyroid',
  "Women's Health",
  'Senior Care',
  'Child Health',
  'Vitamin D',
  'Kidney Function',
];

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const profileDropdownRef = useRef(null);
  const exploreDropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef(null);

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

  useEffect(() => {
    const stored = localStorage.getItem('searchHistory');
    if (stored) setSearchHistory(JSON.parse(stored));
  }, []);

  useEffect(() => {
    if (!showSuggestions && !searchQuery) return;
    const handleClick = (e) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [showSuggestions, searchQuery]);

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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Update history
      setSearchHistory((prev) => {
        const newHistory = [searchQuery.trim(), ...prev.filter((q) => q !== searchQuery.trim())].slice(0, 8);
        localStorage.setItem('searchHistory', JSON.stringify(newHistory));
        return newHistory;
      });
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleQuickSearch = useCallback((q) => {
    setSearchQuery(q);
    setSearchHistory((prev) => {
      const newHistory = [q, ...prev.filter((item) => item !== q)].slice(0, 8);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      return newHistory;
    });
    navigate(`/search?q=${encodeURIComponent(q)}`);
  }, [navigate]);

  // Filter suggestions as user types
  const filteredSuggestions = SUGGESTIONS.filter(s =>
    s.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const shouldShowDropdown = showSuggestions || searchQuery.length > 0;

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
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder="Search any test or lab..."
                    className="w-[350px] px-4 py-2 rounded-full text-sm border border-gray-300 focus:ring-primary focus:outline-none"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowSuggestions(true)}
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary"
                  >
                    <FaSearch />
                  </button>
                  {/* Search History & Suggestions */}
                  {shouldShowDropdown && (searchHistory.length > 0 || filteredSuggestions.length > 0) && (
                    <div
  ref={suggestionsRef}
  className="absolute left-1/2 -translate-x-1/2 max-w-7xl w-full h-full  bg-gray-100 shadow-2xl rounded-b-xl mt-3 z-50 p-3 mr-120 border border-t-0 border-gray-200"
  style={{ minWidth: 1250, maxWidth: '90vw', minHeight: '100px', maxHeight: '90vw' }}
>
                      {searchHistory.length > 0 && (
                        <div className="mb-2 flex flex-wrap gap-2">
                          {searchHistory.map((item, idx) => (
                            <button
                              key={item + idx}
                              className="px-3 py-1 bg-gray-100 hover:bg-primary/10 text-primary rounded-lg border border-primary/20 text-xs"
                              onMouseDown={() => handleQuickSearch(item)}
                              type="button"
                            >
                              {item}
                            </button>
                          ))}
                        </div>
                      )}
                      <div className="flex flex-wrap gap-2">
                        {filteredSuggestions.map((item, idx) => (
                          <button
                            key={item + idx}
                            className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg border border-blue-200 text-xs"
                            onMouseDown={() => handleQuickSearch(item)}
                            type="button"
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </form>
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