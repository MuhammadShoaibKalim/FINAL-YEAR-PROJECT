import { NavLink } from 'react-router-dom';
import { FaUser, FaEdit, FaShoppingCart, FaBoxOpen, FaEnvelope, FaFileAlt, FaSignOutAlt, FaShieldAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/AuthSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const UserSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success('Session Terminated Successfully');
      navigate('/login');
    } catch (err) {
      toast.error('Logout failed');
    }
  };

  const linkStyle = ({ isActive }) =>
    `flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 font-black uppercase text-[10px] tracking-[0.2em] group ${
      isActive 
        ? 'bg-slate-900 text-white shadow-xl shadow-slate-200 translate-x-2' 
        : 'text-slate-500 hover:bg-slate-50 hover:text-primary hover:translate-x-1'
    }`;

  const navItems = [
    { to: "profile", icon: FaUser, label: "Patient Profile" },
    { to: "edit", icon: FaEdit, label: "Security & Edit" },
    { to: "cart", icon: FaShoppingCart, label: "Digital Cart" },
    { to: "orders", icon: FaBoxOpen, label: "Clinical Orders" },
    { to: "messages", icon: FaEnvelope, label: "Communication" },
    { to: "reports", icon: FaFileAlt, label: "Medical Reports" },
  ];

  return (
    <div className="w-full md:w-80 shrink-0 space-y-8">
      {/* Profile Summary Card */}
      <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-slate-200">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="relative z-10 space-y-4">
           <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 text-primary">
              <FaShieldAlt />
           </div>
           <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50">Account Status</p>
              <p className="text-xl font-black tracking-tighter italic">Verified Patient</p>
           </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 p-4 shadow-xl shadow-slate-100/50">
        <div className="px-6 py-4 mb-2">
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">Management Index</p>
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkStyle}>
              <item.icon className="text-sm group-hover:scale-110 transition-transform" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-8 pt-8 border-t border-slate-50">
           <button 
             onClick={handleLogout}
             className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-rose-500 font-black uppercase text-[10px] tracking-[0.2em] hover:bg-rose-50 transition-all group"
           >
              <FaSignOutAlt className="group-hover:-translate-x-1 transition-transform" />
              <span>Secure Logout</span>
           </button>
        </div>
      </div>

      {/* Support Card */}
      <div className="bg-slate-50 rounded-[2rem] p-6 border border-slate-100 hidden md:block">
         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Technical Assistance</p>
         <p className="text-[11px] font-bold text-slate-600 leading-relaxed mb-4">Facing issues with reports or orders? Contact our 24/7 help desk.</p>
         <button className="text-primary text-[10px] font-black uppercase tracking-widest hover:underline">Help Center</button>
      </div>
    </div>
  );
};

export default UserSidebar;
