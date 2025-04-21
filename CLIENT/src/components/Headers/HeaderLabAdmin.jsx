import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { SetUser, Logout } from '../../redux/AuthSlice.js';
import toast from 'react-hot-toast';

const HeaderLabAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    console.log('Logout initiated');
    try {
      localStorage.removeItem('token');
      console.log('Token removed from localStorage');
      
      dispatch(SetUser(null));
      dispatch(Logout());
      console.log('Redux state cleared');
      toast.success('Logged out successfully');
      
      // Force navigation to login page
      navigate('/login', { replace: true });
      console.log('Navigation to login page initiated');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error during logout');
    }
  };

  return (
    <header className="bg-purple-700 text-white p-4 flex justify-between items-center">
      <Link to="/labadmin/lab" className="text-xl font-bold">Lab Admin</Link>
      <div className="flex gap-4">
        <Link to="/labadmin/lab/overview">Dashboard</Link>
        <Link to="/labadmin/lab/orders">Orders</Link>
        <Link to="/labadmin/lab/reports">Reports</Link>
        <Link to="/labadmin/lab/settings">Settings</Link>
        <button 
          onClick={logout} 
          className="text-red-300 flex items-center gap-1 hover:underline"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </header>
  );
};

export default HeaderLabAdmin;
