import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const ProtectedRoute = ({ children, roles }) => {
  // const { user, isAuthenticated } = useSelector((state) => state.auth);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return null;

  
  if (!isAuthenticated || !user){

    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
