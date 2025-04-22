import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

const PublicLayout = () => {
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  


  useEffect(() => {
    if (isAuthenticated && user) {
      const role = user.role?.toLowerCase()?.replace(/\s+/g, '');
      console.log('User is authenticated, redirecting based on role:', role);
      
      if (role === 'superadmin') {
        navigate('/admin/super/overview', { replace: true });
      } else if (role === 'labadmin') {
        navigate('/labadmin/lab/overview', { replace: true });
      } else {
        navigate('/userprofile', { replace: true });
      }
    }
  }, [user, isAuthenticated, navigate]);

  // If authenticated, don't render anything (will be redirected)
  if (isAuthenticated) {
    return null;
  }

  // If not authenticated, render the public route content
  return <Outlet />;
};

export default PublicLayout;