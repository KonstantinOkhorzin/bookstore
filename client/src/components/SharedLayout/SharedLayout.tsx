import { Suspense } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

import { Header, Footer } from './components';

const SharedLayout = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'grid', gridTemplateRows: 'auto 1fr auto' }}>
      <Header />
      <Box component='main' px={2} m='0 auto' width='100%' maxWidth='1600px'>
        <Suspense fallback={<CircularProgress sx={{ margin: '0 auto' }} />}>
          <Outlet />
          <ScrollRestoration getKey={location => location.pathname} />
        </Suspense>
      </Box>
      <Footer />
    </Box>
  );
};

export default SharedLayout;
