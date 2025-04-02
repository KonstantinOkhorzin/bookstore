import { ChangeEvent, FC } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box } from '@mui/material';

interface IProps {
  fileUpload: (file: File | null) => void;
  setPreviewFile: (value: React.SetStateAction<string | null>) => void;
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

const FileUploader: FC<IProps> = ({ fileUpload, setPreviewFile }) => {
  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (file) {
      fileUpload(file);
      setPreviewFile(URL.createObjectURL(file));
    }
  };

  return (
    <Box>
      <Button component='label' variant='contained' tabIndex={-1} startIcon={<CloudUploadIcon />}>
        Upload avatar
        <VisuallyHiddenInput type='file' accept='image/*' onChange={onFileChange} />
      </Button>
    </Box>
  );
};

export default FileUploader;
