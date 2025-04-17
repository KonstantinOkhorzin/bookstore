import { lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import SharedLayout from './components/SharedLayout';
import { ROUTES } from './constants';
import { useAuthCheck } from './hooks';
import { AdminRoute, PrivateRoute, RestrictedRoute, Spinner } from './components';
import NotFound from './pages/NotFound';

const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const Books = lazy(() => import('./pages/Books'));
const Cart = lazy(() => import('./pages/Cart'));
const Favorites = lazy(() => import('./pages/Favorites'));
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
        element: <PrivateRoute component={Cart} redirectTo={ROUTES.SIGN_IN} />,
      },
      {
        path: ROUTES.FAVORITES,
        element: <PrivateRoute component={Favorites} redirectTo={ROUTES.SIGN_IN} />,
      },
      {
        path: ROUTES.SIGN_IN,
        element: <RestrictedRoute component={SignIn} />,
      },
      {
        path: ROUTES.SIGN_UP,
        element: <RestrictedRoute component={SignUp} />,
      },
      {
        path: ROUTES.SINGLE_BOOK,
        element: <SingleBook />,
      },
      {
        path: ROUTES.ADMIN_DASHBOARD,
        element: <AdminRoute component={AdminDashboard} />,
        children: [],
      },
      {
        path: ROUTES.NOT_FOUND,
        element: <NotFound />,
      },
    ],
    errorElement: <NotFound />,
  },
]);

function App() {
  const { isRefreshing } = useAuthCheck();

  return isRefreshing ? <Spinner /> : <RouterProvider router={router} />;
}

export default App;
