import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

const FormTextField: React.FC<TextFieldProps> = ({
    label,
    value,
    onChange,
    helperText,
    InputProps,
    multiline,
}) => (
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

export default FormTextField;
