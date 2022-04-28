import React, { useContext, useEffect, useState } from 'react';
import REIDIDialog, { ConfirmDeleteDialog } from '../components/REIDIDialog';
import { DialogContext } from '../contexts/dialogContext';
import { api } from '../services/api';
import { createRowModel } from '../services/utils';

interface ProcessDialogProps {
  container: Element;
  numeroProcesso: string;
  idProcedimento: string;
  type: string;
}

export default function ProcessDialog({
  container,
  numeroProcesso,
  idProcedimento,
  type,
}: ProcessDialogProps): JSX.Element {
  const { process, setProcess, getProcess } = useContext(DialogContext);
  const [isLoading, setLoading] = useState<boolean>(false);

  const sendMessage = (message, severity) => {
    chrome.runtime.sendMessage({
      action: 'showSnackbar',
      message,
      severity,
    });
  };

  useEffect(() => {
    if (type === 'edit') {
      setLoading(true);
      const fetchMyAPI = async () => {
        await getProcess(numeroProcesso);
      };
      fetchMyAPI();
    }
    setLoading(false);
  }, []);

  // Cria um novo Processo
  const handleCreateProcess = async (callback) => {
    try {
      setLoading(true);
      const value = createRowModel(process);
      await api.post('/spreadsheet', { value });

      // Atualiza a lista de botões
      chrome.runtime.sendMessage({
        action: 'reloadREIDI',
      });

      const message = `Sucesso ao criar REIDI para o processo n.º ${numeroProcesso}`;
      const severity = 'success';

      sendMessage(message, severity);
      callback();
    } catch (error) {
      const message = `Falha ao criar REIDI para o processo n.º ${numeroProcesso}`;
      const severity = 'error';

      sendMessage(message, severity);
      callback();
    }
  };

  // Requisita a atualização do processo
  const handleProcessUpdate = async (callback) => {
    try {
      setLoading(true);

      const value = createRowModel(process);
      await api.put(`/spreadsheet/${process.id}`, { value });

      const message = 'Processo atualizado!';
      const severity = 'success';

      sendMessage(message, severity);
      callback();
    } catch (error) {
      const message = `Falha ao atualizar o processo n.º ${numeroProcesso} `;
      const severity = 'error';

      sendMessage(message, severity);
      callback();
    }
  };

  // Apaga um processo
  const handleDeleteProcess = async (callback) => {
    const encodedProcessNumber = encodeURIComponent(numeroProcesso);

    try {
      setLoading(true);
      await api.delete(`/row/${encodedProcessNumber}`);

      const message = `Sucesso ao deletar o processo n.º ${numeroProcesso} `;
      const severity = 'success';

      sendMessage(message, severity);

      chrome.runtime.sendMessage({
        action: 'reloadREIDI',
      });

      callback();
    } catch (error) {
      const message = `Falha ao deletar o processo n.º ${numeroProcesso} `;
      const severity = 'error';

      sendMessage(message, severity);
      callback();
    }
  };

  // Define o número do processo
  useEffect(() => {
    setProcess({ ...process, numeroProcesso });
  }, []);

  return (
    <div>
      {type === 'create' ? (
        <REIDIDialog
          type={type}
          actionText="CRIAR"
          onClick={handleCreateProcess}
          title="Criando REIDI para o processo n.º"
          isOpen
          isLoading={isLoading}
          container={container}
          idProcedimento={idProcedimento}
          numeroProcesso={numeroProcesso}
        />
      ) : (
        <REIDIDialog
          type={type}
          actionText="SALVAR"
          onClick={handleProcessUpdate}
          handleDeleteProcess={handleDeleteProcess}
          title="Editando REIDI do processo n.º"
          isOpen
          isLoading={isLoading}
          container={container}
          idProcedimento={idProcedimento}
          numeroProcesso={numeroProcesso}
        />
      )}
    </div>
  );
}
