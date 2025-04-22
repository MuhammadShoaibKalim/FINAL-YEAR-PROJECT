import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const PublicRoute = () => {
  const { isAuthenticated, user } = useSelector((state) => state.Auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return null;
  }

  // If user is authenticated, immediately redirect to their dashboard
  if (isAuthenticated && user) {
    const role = user.role?.toLowerCase()?.replace(/\s+/g, '');
    
    if (role === 'superadmin') {
      return <Navigate to="/admin/super/overview" replace />;
    } else if (role === 'labadmin') {
      return <Navigate to="/labadmin/lab/overview" replace />;
    } else {
      return <Navigate to="/userprofile" replace />;
    }
  }

  // If not authenticated, render the public route content
  return <Outlet />;
};

export default PublicRoute;