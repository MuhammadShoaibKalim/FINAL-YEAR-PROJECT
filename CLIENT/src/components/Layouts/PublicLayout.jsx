import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';

const PublicLayout = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && user) {
      const role = user.role?.toLowerCase()?.replace(/\s+/g, '');
      console.log('User is authenticated, redirecting based on role:', role);

      if (role === 'superadmin') {
        navigate('/admin/super/overview', { replace: true });
      } else if (role === 'labadmin') {
        navigate('/labadmin/lab/overview', { replace: true });
      } else {
        navigate('/user', { replace: true });
      }
    }
  }, [user, isAuthenticated, navigate]);

  if (isAuthenticated && user) {
    return null;
  }

  return <Outlet />;
};

export default PublicLayout;
