import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import InboxIcon from '@mui/icons-material/Inbox';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
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
}: DialogProps) {
  // Desmonta o componente ao fechar o modal
  const handleClose = () => {
    unmountComponentAtNode(container);
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
        {isLoading ? <LinearProgress /> : ''}
        <Tabs />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>CANCELAR</Button>
        <Button onClick={() => onClick(handleClose)}>{actionText}</Button>
        <Button color="error">EXCLUIR</Button>
      </DialogActions>
    </Dialog>
  );
}
