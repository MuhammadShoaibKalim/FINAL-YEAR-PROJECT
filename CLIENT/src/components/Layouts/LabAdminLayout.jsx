import Header from "../Headers/Header";
import Footer from "../Headers/Footer";
import { Outlet } from "react-router-dom";

const LabAdminLayout = () => {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default LabAdminLayout;
