import React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { LocalizationProvider, DatePicker, DatePickerProps } from "@mui/lab/";
import ptLocale from "date-fns/locale/pt-BR";

const FormDatePicker: React.FC<TextFieldProps | DatePickerProps> = ({
  label,
  value,
  onChange,
}) => (
  <LocalizationProvider dateAdapter={AdapterDateFns} locale={ptLocale}>
    <DatePicker
      label={label}
      value={value || null}
      onChange={onChange}
      renderInput={(params) => (
        <TextField
          InputLabelProps={{
            shrink: true,
          }}
          {...params}
        />
      )}
    />
  </LocalizationProvider>
);

export default FormDatePicker;
