import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { FC } from 'react';

interface IProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: SelectChangeEvent) => void;
  options: ReadonlyArray<{ value: string; label: string }>;
}

const OptionSelect: FC<IProps> = ({ id, label, value, onChange, options }) => {
  return (
    <FormControl sx={{ minWidth: 200 }}>
      <InputLabel id={id}>{label}</InputLabel>
      <Select labelId={id} value={value} label={label} onChange={onChange}>
        {options.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default OptionSelect;
