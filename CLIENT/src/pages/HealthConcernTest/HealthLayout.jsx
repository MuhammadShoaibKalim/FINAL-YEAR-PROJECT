import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";


const HealthLayout = () => {
  const { pathname } = useLocation(); 

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" }); 
  }, [pathname]);

  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default HealthLayout;
