import {Navigate, useLocation} from 'react-router';
import {useUserContext} from '../hooks/ContextHooks';
import type {ReactNode} from 'react';

interface UserRouteProps {
  children: ReactNode;
  anonymousRoute?: ReactNode;
}

const UserRoute = ({children, anonymousRoute}: UserRouteProps) => {
  const location = useLocation();
  const {user} = useUserContext();
  if (!user) {
    console.log('this view requires login', location.pathname);
    if (anonymousRoute) {
      return anonymousRoute;
    }
    return <Navigate to="/login" state={{from: location.pathname}} />;
  }
  return children;
};

export default UserRoute;
