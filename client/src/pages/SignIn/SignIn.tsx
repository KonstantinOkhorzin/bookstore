import { Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { ROUTES } from '../../constants';
import SignInForm from './components/SignInForm';

const SignIn = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: '400px',
        p: 3,
        m: '0 auto',
      }}
    >
      <Typography variant='h5' component='h1' textAlign='center'>
        Sign In
      </Typography>

      <SignInForm />

      <Typography textAlign='center'>
        Don`t have an account?{' '}
        <Typography
          component={Link}
          to={ROUTES.SIGN_UP}
          sx={{
            color: 'primary.main',
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          Sign up here
        </Typography>
      </Typography>
    </Paper>
  );
};

export default SignIn;
