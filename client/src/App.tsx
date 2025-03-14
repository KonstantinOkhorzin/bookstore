import { lazy, useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import SharedLayout from './components/SharedLayout';
import { ROUTES } from './constants';
import { useRefreshUserQuery } from './redux/apis/auth';
import { setUserData } from './redux/slices/auth';
import { useAppDispatch } from './hooks';
import { Spinner } from './components';

const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const Books = lazy(() => import('./pages/Books'));
const Cart = lazy(() => import('./pages/Cart'));
const Favorites = lazy(() => import('./pages/Favorites'));
const NotFound = lazy(() => import('./pages/NotFound'));
const SignIn = lazy(() => import('./pages/SignIn'));
const SignUp = lazy(() => import('./pages/SignUp'));
const SingleBook = lazy(() => import('./pages/SingleBook'));

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <SharedLayout />,
    children: [
      {
        index: true,
        element: <Books />,
      },
      {
        path: ROUTES.CART,
        element: <Cart />,
      },
      {
        path: ROUTES.FAVORITES,
        element: <Favorites />,
      },
      {
        path: ROUTES.SIGN_IN,
        element: <SignIn />,
      },
      {
        path: ROUTES.SIGN_UP,
        element: <SignUp />,
      },
      {
        path: ROUTES.SINGLE_BOOK,
        element: <SingleBook />,
      },
    ],
    errorElement: <NotFound />,
  },
  {
    path: ROUTES.ADMIN_DASHBOARD,
    element: <AdminDashboard />,
    children: [],
  },
]);

function App() {
  const dispatch = useAppDispatch();
  const hasToken = Boolean(window.localStorage.getItem('token'));

  const { data, isLoading } = useRefreshUserQuery(undefined, {
    skip: !hasToken,
  });

  useEffect(() => {
    if (data) {
      dispatch(setUserData(data));
    }
  }, [data, dispatch]);

  return isLoading ? <Spinner /> : <RouterProvider router={router} />;
}

export default App;
