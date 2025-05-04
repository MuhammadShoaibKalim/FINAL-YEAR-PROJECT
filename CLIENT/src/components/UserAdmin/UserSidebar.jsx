import { NavLink } from 'react-router-dom';
import { FaUser, FaEdit, FaShoppingCart, FaBoxOpen, FaEnvelope, FaFileAlt } from 'react-icons/fa';

const UserSidebar = () => {
  const linkStyle = ({ isActive }) =>
    `flex items-center gap-2 p-2 rounded hover:bg-gray-100 ${isActive ? 'bg-teal-500 text-white' : 'text-gray-700'}`;

  return (
    <div className="w-64 p-4 bg-white rounded shadow-lg">
      <h2 className="text-lg font-bold mb-4 text-teal-600">My Profile</h2>
      <ul className="space-y-2">
        <li><NavLink to="profile" className={linkStyle}><FaUser /> Profile</NavLink></li>
        <li><NavLink to="edit" className={linkStyle}><FaEdit /> Update Profile</NavLink></li>
        <li><NavLink to="cart" className={linkStyle}><FaShoppingCart /> My Cart</NavLink></li>
        <li><NavLink to="orders" className={linkStyle}><FaBoxOpen /> My Orders</NavLink></li>
        <li><NavLink to="messages" className={linkStyle}><FaEnvelope /> Inbox</NavLink></li>
        <li><NavLink to="reports" className={linkStyle}><FaFileAlt /> My Reports</NavLink></li>
      </ul>
    </div>
  );
};

export default UserSidebar;
