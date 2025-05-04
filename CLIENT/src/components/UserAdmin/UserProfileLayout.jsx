import { Outlet } from "react-router-dom";
import UserSidebar from './UserSidebar';
import Footer from '../Common/Footer';
import Topbar from "../Layouts/Topbar";
import HeaderUser from "../Headers/HeaderUser";

const UserProfileLayout = () => {
  return (
    <>
      <Topbar/>
      <HeaderUser/>
      <div className="w-full min-h-screen bg-gray-100 pt-6">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-4 flex flex-col md:flex-row gap-6">
          <UserSidebar />
          <div className="flex-grow">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer /> 
    </>
  );
};

export default UserProfileLayout;
