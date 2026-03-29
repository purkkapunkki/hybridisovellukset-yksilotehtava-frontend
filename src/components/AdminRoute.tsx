import {Navigate, useLocation} from 'react-router';
import {useUserContext} from '../hooks/ContextHooks';
import type {ReactNode} from 'react';

interface AdminRouteProps {
  children: ReactNode;
}

const AdminRoute = ({children}: AdminRouteProps) => {
  const location = useLocation();
  const {user} = useUserContext();
  if (!user || user.level_name !== 'Admin') {
    console.log(
      'this view requires admin privileges, redirecting to /',
      location.pathname,
    );
    return <Navigate to="/" state={{from: location.pathname}} />;
  }
  return children;
};

export default AdminRoute;
