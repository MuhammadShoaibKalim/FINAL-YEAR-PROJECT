import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { SetUser, Logout } from '../../redux/AuthSlice.js';
import toast from 'react-hot-toast';

const HeaderSuperAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    dispatch(SetUser(null));
    dispatch(Logout());
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <Link to="/admin/super" className="text-xl font-bold">SuperAdmin</Link>
      <div className="flex gap-4">
        <Link to="/admin/super/overview">Dashboard</Link>
        <Link to="/admin/super/users">Users</Link>
        <Link to="/admin/super/labs">Labs</Link>
        <Link to="/admin/super/settings">Settings</Link>
        <button onClick={logout} className="text-red-400 flex items-center gap-1 hover:underline">
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </header>
  );
};

export default HeaderSuperAdmin;
