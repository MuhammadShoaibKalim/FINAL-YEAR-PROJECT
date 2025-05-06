import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
// import Header from "../Layouts/Header";
import Footer from "../Headers/Footer";
import Header from  "../Headers/Header"

const UserLayout = () => {
  const { pathname } = useLocation(); 

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); 
  }, [pathname]);

  return (
    <>
      {/* Header */}
      <Header />
      
      {/* Main content */}
      <main>
        <Outlet />
      </main>
      
      {/* Footer */}
      <Footer />
    </>
  );
};

export default UserLayout;
