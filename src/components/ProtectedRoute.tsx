import {Navigate, useLocation} from 'react-router';
import {useUserContext} from '../hooks/ContextHooks';
import type {ReactNode} from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
  anonymousRoute?: ReactNode;
}

const ProtectedRoute = ({children, anonymousRoute}: ProtectedRouteProps) => {
  const location = useLocation();
  const {user} = useUserContext();
  if (!user) {
    console.log('protected location', location.pathname);
    if (anonymousRoute) {
      return anonymousRoute;
    }
    return <Navigate to="/" state={{from: location.pathname}} />;
  }
  return children;
};

export default ProtectedRoute;
