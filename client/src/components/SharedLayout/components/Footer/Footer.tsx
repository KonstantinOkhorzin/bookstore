import { Box, Typography, IconButton } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

function Footer() {
  return (
    <Box
      component='footer'
      sx={{
        py: 2,
        px: 2,
        mt: 'auto',
        backgroundColor: 'primary.main',
        color: 'white',
        textAlign: 'center',
        boxShadow: 4,
      }}
    >
      <Typography
        variant='body1'
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 1,
          flexWrap: 'wrap-reverse',
        }}
      >
        <IconButton
          href='https://github.com/KonstantinOkhorzin/bookstore'
          target='_blank'
          rel='noopener noreferrer'
          color='inherit'
          sx={{ p: 0 }}
        >
          <GitHubIcon fontSize='medium' />
        </IconButton>
        {new Date().getFullYear()} BOOKSTORE. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
