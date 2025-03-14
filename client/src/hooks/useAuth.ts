import { useSelector } from 'react-redux';
import { selectIsAdmin, selectIsLoggedIn, selectUser } from '../redux/slices/auth';
import { useMemo } from 'react';

const useAuth = () => {
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isAdmin = useSelector(selectIsAdmin);

  return useMemo(() => ({ user, isLoggedIn, isAdmin }), [user, isLoggedIn, isAdmin]);
};

export default useAuth;
