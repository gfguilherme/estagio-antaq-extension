import MuiAlert, { AlertColor, AlertProps } from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import * as React from 'react';
import { unmountComponentAtNode } from 'react-dom';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

interface StatusSnackbarProps {
  isOpen: boolean;
  message: string;
  severity: AlertColor;
  container: Element;
}

export default function StatusSnackbar({
  isOpen,
  message,
  severity,
  container,
}: StatusSnackbarProps) {
  const [open, setOpen] = React.useState(isOpen);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      unmountComponentAtNode(container);
    }
    setOpen(false);
    unmountComponentAtNode(container);
  };

  return (
    <div>
      {open ? (
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            {message}
          </Alert>
        </Snackbar>
      ) : (
        ''
      )}
    </div>
  );
}
