import { Suspense } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';

const SharedLayout = () => {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
        <ScrollRestoration getKey={location => location.pathname} />
      </Suspense>
    </main>
  );
};

export default SharedLayout;
