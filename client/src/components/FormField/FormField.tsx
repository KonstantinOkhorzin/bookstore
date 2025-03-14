import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { FC, HTMLInputTypeAttribute, MouseEvent, useId, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface IProps {
  label: string;
  type?: HTMLInputTypeAttribute;
  errorMessage?: string;
  register: UseFormRegisterReturn;
}

const FormField: FC<IProps> = ({ errorMessage, label, type = 'text', register }) => {
  const id = useId();
  const [showPassword, setShowPassword] = useState(false);

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
        type={type === 'password' && showPassword ? 'text' : type}
        endAdornment={
          type === 'password' ? (
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
      {errorMessage && <FormHelperText error>{errorMessage}</FormHelperText>}
    </FormControl>
  );
};

export default FormField;
