import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

interface AsynchronousAutocompleteProps<T> {
  disabled?: boolean;
  handleGetOptions: () => Promise<T[]>;
  label: string;
  onChange: (event: React.SyntheticEvent<Element, Event>, newValue: T | null) => void;
  optionLabel: string;
  value: T | null | undefined;
}

export function AsynchronousAutocomplete<T>({
  disabled,
  handleGetOptions,
  label,
  onChange,
  optionLabel,
  value,
}: AsynchronousAutocompleteProps<T>): JSX.Element {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<T[]>([]);
  const [inputValue, setInputValue] = useState('');

  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async (): Promise<void> => {
      await sleep(1e3);

      if (active) {
        const response = await handleGetOptions();
        setOptions(response);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      fullWidth
      value={value}
      onChange={(event, newValue): void => {
        onChange(event, newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue): void => {
        setInputValue(newInputValue);
      }}
      disabled={disabled}
      // sx={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) => option[optionLabel] === value[optionLabel]}
      getOptionLabel={(option) => option[optionLabel]}
      options={options}
      loading={loading}
      renderOption={(props, option) => (
        <li {...props} key={props.id}>
          {option[optionLabel]}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
}
