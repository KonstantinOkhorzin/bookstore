import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { FC, MouseEvent, useId, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

import PasswordStrengthIndicator from './components/PasswordStrengthIndicator';

interface IProps {
  label: string;
  type?: 'text' | 'password' | 'email';
  errorMessage?: string;
  register: UseFormRegisterReturn;
  passwordValue?: string;
}

const FormField: FC<IProps> = ({ errorMessage, label, type = 'text', register, passwordValue }) => {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordType = type === 'password';

  const handleClickShowPassword = () => setShowPassword(show => !show);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <FormControl variant='outlined' error={Boolean(errorMessage)}>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        {...register}
        id={id}
        label={label}
        type={isPasswordType && showPassword ? 'text' : type}
        endAdornment={
          isPasswordType ? (
            <InputAdornment position='end'>
              <IconButton
                color={errorMessage ? 'error' : 'default'}
                aria-label={showPassword ? 'hide the password' : 'display the password'}
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                edge='end'
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : null
        }
      />
      {passwordValue && isPasswordType && (
        <PasswordStrengthIndicator passwordValue={passwordValue} />
      )}
      {errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
    </FormControl>
  );
};

export default FormField;
