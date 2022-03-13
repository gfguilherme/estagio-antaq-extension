import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Skeleton,
  TextField,
} from '@mui/material';
import React from 'react';

interface DialogPlaceholderProps {
  numeroProcesso: string;
}

export default function DialogPlaceholder({ numeroProcesso }: DialogPlaceholderProps) {
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md">
      <DialogTitle>Criando um controle de leilão</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Skeleton width={250}>
              <TextField fullWidth>Teste</TextField>
            </Skeleton>
          </Grid>
          <Grid item xs={4}>
            <Skeleton width={250}>
              <TextField fullWidth />
            </Skeleton>
          </Grid>
          <Grid item xs={4}>
            <Skeleton width={250}>
              <TextField fullWidth />
            </Skeleton>
          </Grid>
          <Grid item xs={8}>
            <Skeleton width={550}>
              <TextField fullWidth />
            </Skeleton>
          </Grid>
          <Grid item xs={4}>
            <Skeleton width={250}>
              <TextField fullWidth />
            </Skeleton>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>CANCELAR</Button>
        <Button onClick={handleClose}>CRIAR</Button>
      </DialogActions>
    </Dialog>
  );
}
