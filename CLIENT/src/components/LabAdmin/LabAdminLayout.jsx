import { Outlet } from "react-router-dom";
import Sidebar from "./LabSidebar";

const LabAdminLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-grow p-4">
      {/* className="flex-1 p-6 bg-white w-full" */}
        <Outlet /> 
      </main>
    </div>
  );
};

export default LabAdminLayout;
