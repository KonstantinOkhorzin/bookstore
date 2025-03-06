import { Suspense } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Box } from '@mui/material';

import { Header, Footer } from './components';
import Spinner from '../Spinner';

const SharedLayout = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', gridTemplateRows: 'auto 1fr auto' }}>
      <Header />
      <Box component='main' px={2} py={4} m='0 auto' width='100%' maxWidth='1100px'>
        <Suspense fallback={<Spinner />}>
          <Outlet />
          <ScrollRestoration getKey={location => location.pathname} />
        </Suspense>
      </Box>
      <Footer />
    </Box>
  );
};

export default SharedLayout;
