import { TextField, TextFieldProps } from '@mui/material';
import React from 'react';

export default function FormTextField({
  label,
  value,
  onChange,
  helperText,
  InputProps,
  multiline,
}: TextFieldProps) {
  return (
    <TextField
      label={label}
      value={value || ''}
      onChange={onChange}
      variant="outlined"
      helperText={helperText}
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={InputProps}
      multiline={multiline}
      fullWidth
    />
  );
}
