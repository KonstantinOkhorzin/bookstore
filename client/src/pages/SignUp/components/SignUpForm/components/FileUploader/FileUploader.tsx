import { FC } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, FormHelperText } from '@mui/material';

interface IProps {
  onFileChange: (file: File | null) => void;
  errorMessage?: string;
}

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const FileUploader: FC<IProps> = ({ onFileChange, errorMessage }) => {
  return (
    <Box>
      <Button component='label' variant='contained' tabIndex={-1} startIcon={<CloudUploadIcon />}>
        Upload files
        <VisuallyHiddenInput
          type='file'
          accept='image/*'
          onChange={event => {
            const file = event.target.files?.[0] ?? null;
            onFileChange(file);
          }}
        />
      </Button>
      {errorMessage && (
        <FormHelperText sx={{ pl: '14px' }} error>
          {errorMessage}
        </FormHelperText>
      )}
    </Box>
  );
};

export default FileUploader;
