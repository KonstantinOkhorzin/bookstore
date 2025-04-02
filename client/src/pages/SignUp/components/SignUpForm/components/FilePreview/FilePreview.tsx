import { Box } from '@mui/material';
import { FC } from 'react';
import { DEFAULTS } from '../../../../../../constants';

interface IProps {
  url: string | null;
}

const FilePreview: FC<IProps> = ({ url }) => {
  return (
    <Box
      sx={{
        width: '100px',
        height: '100px',
        margin: '0 auto',
        borderRadius: '50%',
        overflow: 'hidden',
        '& img': {
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        },
      }}
    >
      {<img src={url || DEFAULTS.AVATAR} alt={url ? 'User avatar preview' : 'Default avatar'} />}
    </Box>
  );
};

export default FilePreview;
