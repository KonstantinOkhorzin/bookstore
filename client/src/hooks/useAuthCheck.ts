import { useEffect } from 'react';

import useAppDispatch from './useAppDispatch';
import { useRefreshUserQuery } from '../redux/apis/auth';
import { setUserData } from '../redux/slices/auth';
import useAuth from './useAuth';

const useAuthCheck = () => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const hasToken = Boolean(localStorage.getItem('token'));
  const { data, isLoading } = useRefreshUserQuery(undefined, {
    skip: !hasToken,
  });
  const isRefreshing = hasToken && (!user || isLoading);

  useEffect(() => {
    if (data) dispatch(setUserData(data));
  }, [data, dispatch]);

  return { isRefreshing };
};

export default useAuthCheck;
