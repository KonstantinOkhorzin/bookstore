import { FC } from 'react';
import { Typography } from '@mui/material';

import { IError } from '../../types';
import { handleError } from '../../helpers';

interface IProps {
  error: IError;
}

const ErrorMessage: FC<IProps> = ({ error }) => {
  return (
    <Typography variant='h3' component='p' m='0 auto' textAlign='center' color='error'>
      {handleError(error)}
    </Typography>
  );
};

export default ErrorMessage;
