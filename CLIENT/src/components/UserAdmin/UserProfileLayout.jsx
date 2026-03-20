import { Outlet } from "react-router-dom";
import UserSidebar from './UserSidebar';
import Footer from '../Headers/Footer';
import Topbar from "../Layouts/Topbar";
import Header from "../Headers/Header"; // Using the standard Header which is now revamped

const UserProfileLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb / Page Header Area */}
        <div className="mb-12 space-y-2 px-2">
           <div className="inline-block px-4 py-1 bg-slate-900 rounded-full">
              <p className="text-[9px] font-black text-primary uppercase tracking-[0.3em] leading-none">Account Dashboard</p>
           </div>
           <h1 className="text-4xl font-black text-slate-800 tracking-tighter italic">Patient <span className="text-primary NOT-italic">Dashboard.</span></h1>
        </div>

        <div className="flex flex-col md:flex-row gap-10 items-start">
          <UserSidebar />
          <div className="flex-1 w-full animate-in fade-in slide-in-from-right-4 duration-700">
            <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/50 min-h-[600px] overflow-hidden">
               <Outlet />
            </div>
          </div>
        </div>
      </main>

      <Footer /> 
    </div>
  );
};

export default UserProfileLayout;
