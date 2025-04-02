import { useState } from 'react';
import { Box, Button, Checkbox, FormHelperText, Typography } from '@mui/material';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import DeleteIcon from '@mui/icons-material/Delete';

import { FormField } from '../../../../components';
import signUpSchema from '../../../../schemas/signUpSchema';
import { useAppDispatch } from '../../../../hooks';
import { useSignUpMutation } from '../../../../redux/apis/auth';
import { setUserData } from '../../../../redux/slices/auth';
import { handleError } from '../../../../helpers';
import { FileUploader, FilePreview } from './components';

type FormValues = z.infer<typeof signUpSchema>;

const defaultValues: FormValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  avatar: undefined,
  licenseAccepted: false,
};

const SignUpForm = () => {
  const [previewFile, setPreviewFile] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const [signIn, { isLoading }] = useSignUpMutation();

  const {
    register,
    handleSubmit,
    reset,
    setError,
    control,
    watch,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    defaultValues,
    resolver: zodResolver(signUpSchema),
  });

  const onFormSubmit: SubmitHandler<FormValues> = values => {
    delete values.confirmPassword;

    signIn(values)
      .unwrap()
      .then(data => {
        dispatch(setUserData(data.user));
        window.localStorage.setItem('token', data.token);
        reset();
        setPreviewFile(null);
      })
      .catch(error => {
        setError('root', { message: handleError(error) });
      });
  };

  const onRemoveFile = () => {
    setValue('avatar', undefined);
    setPreviewFile(null);
  };

  return (
    <Box
      component='form'
      onSubmit={handleSubmit(onFormSubmit)}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <FilePreview url={previewFile} />

      <FormField label='Name' register={register('name')} errorMessage={errors.name?.message} />

      <FormField
        label='Email'
        type='email'
        register={register('email')}
        errorMessage={errors.email?.message}
      />

      <FormField
        label='Password'
        type='password'
        register={register('password')}
        errorMessage={errors.password?.message}
        passwordValue={watch('password')}
      />

      <FormField
        label='Confirm password'
        type='password'
        register={register('confirmPassword')}
        errorMessage={errors.confirmPassword?.message}
      />

      <Box>
        {previewFile ? (
          <Button
            variant='contained'
            startIcon={<DeleteIcon />}
            sx={{ alignSelf: 'flex-start' }}
            onClick={onRemoveFile}
          >
            Remove avatar
          </Button>
        ) : (
          <Controller
            control={control}
            name='avatar'
            render={({ field }) => (
              <FileUploader fileUpload={field.onChange} setPreviewFile={setPreviewFile} />
            )}
          />
        )}
        {errors.avatar && (
          <FormHelperText sx={{ pl: '14px' }} error>
            {errors.avatar.message}
          </FormHelperText>
        )}
      </Box>

      <Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Controller
            name='licenseAccepted'
            control={control}
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onChange={field.onChange}
                sx={{ color: errors.licenseAccepted ? 'error.main' : 'inherit' }}
              />
            )}
          />
          <Typography>I agree with all statements in the Terms of service</Typography>
        </Box>
        {errors.licenseAccepted && (
          <FormHelperText sx={{ pl: '14px' }} error>
            {errors.licenseAccepted.message}
          </FormHelperText>
        )}
      </Box>

      <Button disabled={isLoading} type='submit' variant='contained'>
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

export default SignUpForm;
