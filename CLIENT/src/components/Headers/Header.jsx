import { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FaUserCircle, FaSignInAlt, FaSignOutAlt, FaShoppingCart,
  FaChartLine, FaBars, FaTimes, FaChevronDown, FaSearch, FaRobot
} from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/AuthSlice';
import toast from 'react-hot-toast';
import logo from '../../assets/logo.png';
import Topbar from '../Layouts/Topbar';

const SUGGESTIONS = [
  'CBC (Complete Blood Count)',
  'Diabetes Screening (HbA1c)',
  'Lipid Profile (Cholesterol)',
  'Heart Health Package',
  'Thyroid Profile (T3, T4, TSH)',
  "Women's Hormonal Profile",
  'Senior Citizen Wellness',
  'Kidney Function Test (KFT)',
  'Vitamin D (25-Hydroxy)',
  'Liver Function Test (LFT)',
];

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const logout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (err) {
      toast.error('Logout failed');
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target)) setIsProfileOpen(false);
      if (exploreDropdownRef.current && !exploreDropdownRef.current.contains(e.target)) setIsExploreOpen(false);
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target)) setShowSuggestions(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem('searchHistory');
    if (stored) setSearchHistory(JSON.parse(stored));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const newHistory = [searchQuery.trim(), ...searchHistory.filter(q => q !== searchQuery.trim())].slice(0, 5);
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleQuickSearch = (q) => {
    setSearchQuery(q);
    navigate(`/search?q=${encodeURIComponent(q)}`);
    setShowSuggestions(false);
  };

  const filteredSuggestions = SUGGESTIONS.filter(s =>
    s.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {!isMinimal && <Topbar />}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-xl' : 'bg-white'}`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center p-1 group-hover:bg-primary/10 transition-colors shadow-sm border border-primary/10">
                <img src={logo} alt="TestSahulat" className="w-full h-full object-contain" />
              </div>
              <div className="hidden sm:block">
                <span className="text-2xl font-black text-slate-800 tracking-tighter">Test<span className="text-primary">Sahulat</span></span>
                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 -mt-1">Verified Care</p>
              </div>
            </Link>

            {/* Desktop Center: Search & Nav */}
            {!isMinimal && (
              <div className="hidden lg:flex items-center flex-1 justify-center max-w-2xl mx-10">
                <form onSubmit={handleSearch} className="relative w-full group">
                  <div className={`flex items-center bg-slate-50 border-2 transition-all duration-300 rounded-2xl px-5 py-3 ${showSuggestions ? 'border-primary ring-4 ring-primary/5' : 'border-slate-100'}`}>
                    <FaSearch className="text-slate-400 mr-4" />
                    <input
                      type="text"
                      placeholder="Search tests, labs, or concerns..."
                      className="bg-transparent border-none outline-none w-full text-sm font-bold text-slate-700 placeholder:text-slate-400 placeholder:font-medium"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setShowSuggestions(true)}
                    />
                  </div>

                  {/* Search Dropdown */}
                  {showSuggestions && (
                    <div ref={suggestionsRef} className="absolute top-[calc(100%+32px)] left-0 w-full bg-white rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border border-slate-100 p-10 animate-in fade-in slide-in-from-top-4 duration-300 z-[100] max-h-[60vh] overflow-y-auto scrollbar-hide">
                      <div className="space-y-8">
                        {searchHistory.length > 0 && (
                          <div>
                            <div className="flex items-center gap-2 mb-4">
                              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
                              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Recent Searches</p>
                            </div>
                            <div className="flex flex-wrap gap-2 px-1">
                              {searchHistory.map((q, i) => (
                                <button key={i} onClick={() => handleQuickSearch(q)} className="px-4 py-2 bg-slate-50 hover:bg-slate-100 rounded-xl text-[11px] font-bold text-slate-600 border border-slate-100 transition-all hover:scale-105">{q}</button>
                              ))}
                            </div>
                          </div>
                        )}
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-primary">Popular Clinical Tests</p>
                          </div>
                          <div className="space-y-1">
                            {filteredSuggestions.map((s, i) => (
                              <button 
                                key={i} 
                                onClick={() => handleQuickSearch(s)} 
                                className="w-full text-left px-5 py-3.5 hover:bg-primary/5 rounded-[1.25rem] text-sm font-bold text-slate-700 transition-all border border-transparent hover:border-primary/10 flex items-center justify-between group/item"
                              >
                                <span className="group-hover/item:text-primary transition-colors">{s}</span>
                                <FaSearch className="text-[10px] text-slate-300 group-hover/item:text-primary transition-colors" />
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            )}

            {/* Desktop Right */}
            <div className="hidden md:flex items-center gap-6">
              {!isMinimal && (
                <Link to="/ai-recommendations-test" className="flex items-center gap-2 text-slate-600 hover:text-primary font-black uppercase text-[10px] tracking-widest transition-colors">
                  <FaRobot className="text-lg text-secondary" />
                  AI Assistant
                </Link>
              )}
              
              <div className="h-6 w-px bg-slate-200" />

              {!user ? (
                <Link to="/login" className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-primary transition-all active:scale-95 shadow-xl shadow-slate-200">
                  Account Sign In
                </Link>
              ) : (
                <div className="relative" ref={profileDropdownRef}>
                  <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl border-2 border-primary/20 p-0.5 shadow-sm">
                      {user.image ? (
                        <img src={user.image} alt="U" className="w-full h-full rounded-[14px] object-cover" />
                      ) : (
                        <FaUserCircle className="w-full h-full text-slate-300" />
                      )}
                    </div>
                    <FaChevronDown className={`text-slate-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} size={10} />
                  </button>
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-4 w-56 bg-white rounded-[1.5rem] shadow-2xl border border-slate-100 p-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="p-4 border-b border-slate-50 mb-1">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Account</p>
                        <p className="text-sm font-black text-slate-800 truncate">{user.firstName} {user.lastName}</p>
                      </div>
                      <Link to="/user" className="flex items-center gap-3 px-4 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
                        <FaChartLine className="text-primary" /> My Dashboard
                      </Link>
                      <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-rose-500 hover:bg-rose-50 rounded-xl transition-colors">
                        <FaSignOutAlt /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              )}

              {!isMinimal && (
                <Link to="/user/cart" className="relative group p-3 bg-slate-50 rounded-2xl hover:bg-primary transition-all">
                  <FaShoppingCart className="text-slate-600 group-hover:text-white transition-colors" />
                  {totalQuantity > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-[9px] font-black flex items-center justify-center rounded-lg shadow-lg group-hover:bg-slate-900 animate-bounce">
                      {totalQuantity}
                    </span>
                  )}
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <div className="lg:hidden flex items-center gap-4">
               {!isMinimal && (
                <Link to="/user/cart" className="relative p-2 bg-slate-50 rounded-xl">
                  <FaShoppingCart className="text-slate-600" />
                   {totalQuantity > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-white text-[8px] font-black flex items-center justify-center rounded-md shadow-lg">{totalQuantity}</span>
                   )}
                </Link>
               )}
              <button 
                onClick={() => setIsMobileOpen(!isMobileOpen)} 
                className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-lg active:scale-95 transition-all"
              >
                {isMobileOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 p-6 space-y-6 animate-in slide-in-from-top duration-300">
            <div className="relative">
               <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
               <input type="text" placeholder="Search tests..." className="w-full pl-12 pr-4 py-4 bg-slate-50 rounded-2xl outline-none text-sm font-bold" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Link to="/labs" className="p-4 bg-slate-50 rounded-2xl text-center">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Explore</p>
                <p className="text-sm font-black text-slate-800">Labs</p>
              </Link>
              <Link to="/all-tests-packages" className="p-4 bg-slate-50 rounded-2xl text-center">
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">List</p>
                <p className="text-sm font-black text-slate-800">Tests</p>
              </Link>
            </div>

            <Link to="/ai-recommendations-test" className="block p-5 bg-gradient-to-r from-primary to-secondary rounded-2xl text-center text-white font-black uppercase text-xs tracking-widest shadow-xl shadow-primary/20">
              Health AI Assistant
            </Link>

            {!user ? (
               <Link to="/login" className="block text-center py-5 border-2 border-slate-900 rounded-2xl font-black uppercase text-xs tracking-widest">Sign In / Register</Link>
            ) : (
               <div className="p-4 bg-slate-50 rounded-3xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center font-black text-primary">U</div>
                    <p className="text-sm font-black text-slate-800">{user.firstName}</p>
                  </div>
                  <button onClick={logout} className="text-rose-500 font-bold text-xs">Logout</button>
               </div>
            )}
          </div>
        )}
      </header>
    </>
  );
};

export default Header;