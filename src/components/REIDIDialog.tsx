import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import InboxIcon from '@mui/icons-material/Inbox';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { unmountComponentAtNode } from 'react-dom';
import Tabs from './Tabs';

interface DialogProps {
  title: string;
  onClick: (callback) => void;
  actionText: string;
  isLoading: boolean;
  container: Element;
  isOpen: boolean;
  idProcedimento: string;
  numeroProcesso: string;
  handleDeleteProcess?: (callback) => void;
  type: string;}

export function ConfirmDeleteDialog({ isOpen, container, handleDeleteProcess, handleClose, handleClose2 }) {


  return (
    <Dialog
      id="delete-dialog"
      open={isOpen}
      onClose={handleClose2}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Tem certeza que deseja deletar este processo?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Esse processo é irreversível.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose2}>Cancelar</Button>
        <Button onClick={() => handleDeleteProcess(handleClose)} color='error'>
          Confirmar 
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function REIDIDialog({
  title,
  onClick,
  actionText,
  isLoading,
  isOpen,
  container,
  idProcedimento,
  numeroProcesso,
  handleDeleteProcess,
  type,
}: DialogProps) {
  const [isConfirm, setIsConfirm] = useState<boolean>(false);

  const handleConfirmDelete = () => {
    setIsConfirm(true);
  };

  // Desmonta o componente ao fechar o modal
  const handleClose = () => {
    unmountComponentAtNode(container);
  };

  const handleClose2 = () => {
    setIsConfirm(false)
  };

  return (
    <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>
        {title}
        <Button
          href={`https://sei.antaq.gov.br/sei/controlador.php?acao=procedimento_trabalhar&id_procedimento=${idProcedimento}`}
          target="_blank"
        >
          <Typography variant="h6" color="#1976d2">
            {numeroProcesso}
          </Typography>
        </Button>
      </DialogTitle>
      <DialogContent>
        <Stack direction="row" spacing={2}>
          <Button
            href={`https://sei.antaq.gov.br/sei/controlador.php?acao=procedimento_trabalhar&id_procedimento=${idProcedimento}`}
            target="_blank"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <FolderOpenIcon />
            Processo SEI
          </Button>
          <Button
            // href={`${window.location.href.split('?')[0]}?acao=procedimento_trabalhar&id_procedimento=${idProcedimento}+'&id_documento=${param.id_documento}`}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <InboxIcon />
            Requisição
          </Button>
          <Button
            // href={`${window.location.href.split('?')[0]}?acao=procedimento_trabalhar&id_procedimento=${idProcedimento}+'&id_documento=${param.id_documento}`}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <InboxIcon />
            Entrega
          </Button>
        </Stack>
        <Divider />
        {isLoading ? <LinearProgress /> : null}
        <Tabs />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>CANCELAR</Button>
        <Button onClick={() => onClick(handleClose)}>{actionText}</Button>
        {type === 'edit' ? (
          <Button onClick={() => handleConfirmDelete()} color="error">
            EXCLUIR
          </Button>
        ) : null}
      </DialogActions>
      <ConfirmDeleteDialog isOpen={isConfirm} container={container} handleDeleteProcess={handleDeleteProcess} handleClose={handleClose} handleClose2={handleClose2}/>
    </Dialog>
  );
}
