import { useEffect } from 'react';

import useAppDispatch from './useAppDispatch';
import { useRefreshUserQuery } from '../redux/apis/auth';
import { setUserData } from '../redux/slices/auth';

const useAuthCheck = () => {
  const dispatch = useAppDispatch();
  const hasToken = Boolean(localStorage.getItem('token'));
  const { data, isLoading } = useRefreshUserQuery(undefined, {
    skip: !hasToken,
  });

  useEffect(() => {
    if (data) dispatch(setUserData(data));
  }, [data, dispatch]);

  return { isRefreshing: isLoading };
};

export default useAuthCheck;
