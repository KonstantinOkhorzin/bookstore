import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '../../hooks';
import { ROUTES } from '../../constants';

interface Props {
  component: FC;
  redirectTo?: string;
}

const RestrictedRoute: FC<Props> = ({ component: Component, redirectTo = ROUTES.HOME }) => {
  const { state } = useLocation();
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Navigate to={state ? state.from : redirectTo} /> : <Component />;
};

export default RestrictedRoute;
