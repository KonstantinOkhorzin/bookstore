import { FC } from 'react';
import { LinearProgress } from '@mui/material';

import { validatePasswordStrength } from '../../../../helpers';

interface IProps {
  passwordValue: string;
}

const PasswordStrengthIndicator: FC<IProps> = ({ passwordValue }) => {
  const { score, color } = validatePasswordStrength(passwordValue);

  return (
    <LinearProgress
      variant='determinate'
      value={(score + 1) * 20}
      sx={{
        height: 8,
        borderRadius: 4,
        backgroundColor: '#e0e0e0',
        '& .MuiLinearProgress-bar': {
          backgroundColor: color,
        },
      }}
    />
  );
};

export default PasswordStrengthIndicator;
