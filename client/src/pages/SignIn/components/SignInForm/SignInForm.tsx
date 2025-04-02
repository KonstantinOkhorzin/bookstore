import { Box, Button, FormHelperText } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useAppDispatch } from '../../../../hooks';
import { useSignInMutation } from '../../../../redux/apis/auth';
import { IAuthRequest } from '../../../../types/auth';
import signInSchema from '../../../../schemas/signInSchema';
import { setUserData } from '../../../../redux/slices/auth';
import { handleError } from '../../../../helpers';
import { FormField } from '../../../../components';

const SignInForm = () => {
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

  const onFormSubmit: SubmitHandler<IAuthRequest> = values =>
    signIn(values)
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
        {isLoading ? 'Submitting...' : 'Submit'}
      </Button>

      {errors.root && (
        <FormHelperText error sx={{ textAlign: 'center', mt: -1, fontSize: '1rem' }}>
          {errors.root.message}
        </FormHelperText>
      )}
    </Box>
  );
};

export default SignInForm;
