import { Paper, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface IProps {
  title: string;
  children: ReactNode;
  actionMessage: string;
  linkText: string;
  linkTo: string;
}

const FormWrapper: FC<IProps> = ({ children, title, actionMessage, linkText, linkTo }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: { sm: '400px' },
        p: 3,
        m: { xs: '0 -16px', sm: '0 auto' },
      }}
    >
      <Typography variant='h5' component='h1' textAlign='center'>
        {title}
      </Typography>

      {children}

      <Typography textAlign='center'>
        {actionMessage}{' '}
        <Typography
          component={Link}
          to={linkTo}
          sx={{
            color: 'primary.main',
            '&:hover': { textDecoration: 'underline' },
          }}
        >
          {linkText}
        </Typography>
      </Typography>
    </Paper>
  );
};

export default FormWrapper;
