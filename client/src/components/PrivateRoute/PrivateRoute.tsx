import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../../hooks';
import { ROUTES } from '../../constants';

interface Props {
  component: FC;
  redirectTo?: string;
}

export const PrivateRoute: FC<Props> = ({ component: Component, redirectTo = ROUTES.HOME }) => {
  const location = useLocation();
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Component /> : <Navigate to={redirectTo} state={{ from: location }} />;
};

export default PrivateRoute;
