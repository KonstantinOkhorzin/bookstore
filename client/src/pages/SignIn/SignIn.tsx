import { Box, Button, FormHelperText, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { ROUTES } from '../../constants';
import { IAuthRequest } from '../../types/auth';
import { useAppDispatch } from '../../hooks';
import { useSignInMutation } from '../../redux/apis/auth';
import { setUserData } from '../../redux/slices/auth';
import { handleError } from '../../helpers';
import signInSchema from '../../schemas/signInSchema';
import { FormField } from '../../components';

const SignIn = () => {
  const dispatch = useAppDispatch();
  const [signIn, { isLoading }] = useSignInMutation();
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<IAuthRequest>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(signInSchema),
  });

  const onFormSubmit: SubmitHandler<IAuthRequest> = data =>
    signIn(data)
      .unwrap()
      .then(data => {
        dispatch(setUserData(data.user));
        window.localStorage.setItem('token', data.token);
        reset();
      })
      .catch(error => {
        setError('root', { message: handleError(error) });
      });

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
      <Box
        component='form'
        onSubmit={handleSubmit(onFormSubmit)}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <FormField
          label='Email'
          register={register('email')}
          type='email'
          errorMessage={errors.email?.message}
        />

        <FormField
          label='Password'
          register={register('password')}
          type='password'
          errorMessage={errors.password?.message}
        />

        <Button type='submit' variant='contained' disabled={isLoading}>
          submit
        </Button>

        {errors.root && (
          <FormHelperText error sx={{ textAlign: 'center', mt: -1, fontSize: '1rem' }}>
            {errors.root.message}
          </FormHelperText>
        )}
      </Box>

      <Typography textAlign='center'>
        Don`t have an account?{' '}
        <Typography
          component={Link}
          to={`/${ROUTES.SIGN_UP}`}
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
