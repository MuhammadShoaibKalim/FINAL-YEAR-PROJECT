import { Outlet } from "react-router-dom";
import SuperAdminSidebar from "./SuperAdminSidebar";

const SuperAdminLayout = () => {
  return (
    <div className="flex">
      <SuperAdminSidebar />
      <main className="flex-grow p-4">
      {/* className="flex-1 p-6 bg-white w-full" */}
        <Outlet /> 
      </main>
    </div>
  );
};

export default SuperAdminLayout;

