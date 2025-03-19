import { Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { ROUTES } from '../../constants';
import SignUpForm from './components/SignUpForm';

const SignUp = () => {
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
        Create account
      </Typography>

      <SignUpForm />

      <Typography textAlign='center'>
        Already have an account?{' '}
        <Typography
          component={Link}
          to={`/${ROUTES.SIGN_IN}`}
          sx={{
            color: 'primary.main',
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          Sign in here
        </Typography>
      </Typography>
    </Paper>
  );
};

export default SignUp;
