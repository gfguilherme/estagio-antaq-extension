import React, { FC, useState, useContext, useEffect } from "react";

// API

import { createRow, updateRow } from "../services/api";

// Componentes
import REIDIDialog from "../components/REIDIDialog";

// Contexto
import { DialogContext } from "../contexts/dialogContext";

interface ProcessDialogProps {
  container: Element;
  numeroProcesso: string;
  idProcedimento: string;
  type: string;
}

const ProcessDialog: FC<ProcessDialogProps> = ({
  container,
  numeroProcesso,
  idProcedimento,
  type,
}) => {
  const { process, setProcess, getProcess } = useContext(DialogContext);
  const [isLoading, setLoading] = useState<boolean>(false);

  const sendMessage = (message, severity) => {
    chrome.runtime.sendMessage({
      action: "showSnackbar",
      message,
      severity,
    });
  };

  useEffect(() => {
    if (type === "edit") {
      setLoading(true);
      const fetchMyAPI = async () => {
        await getProcess(numeroProcesso);
      };
      fetchMyAPI();
    }
    setLoading(false);
  }, []);

  // Cria um novo Processo
  const handleCreate = async (callback) => {
    try {
      setLoading(true);
      await createRow(process);

      chrome.runtime.sendMessage({
        action: "reloadREIDI",
      });

      const message = `Sucesso ao criar REIDI para o processo n.º ${numeroProcesso}`;
      const severity = "success";

      sendMessage(message, severity);
      callback();
    } catch (error) {
      const message = `Falha ao criar REIDI para o processo n.º ${numeroProcesso}`;
      const severity = "error";

      sendMessage(message, severity);
      callback();
    }
  };

  // Atualiza o processo
  const handleUpdate = async (callback) => {
    try {
      setLoading(true);
      await updateRow(process, process.id);
      const message = `Processo atualizado!`;
      const severity = "success";

      sendMessage(message, severity);
      callback();
    } catch (error) {
      const message = `Falha ao atualizar o processo n.º ${numeroProcesso} `;
      const severity = "error";

      sendMessage(message, severity);
      callback();
    }
  };

  // Define o número do processo
  useEffect(() => {
    setProcess({ ...process, numeroProcesso });
  }, []);

  return (
    <>
      {type === "create" ? (
        <REIDIDialog
          actionText="CRIAR"
          onClick={handleCreate}
          title="Criando REIDI para o processo n.º"
          isOpen
          isLoading={isLoading}
          container={container}
          idProcedimento={idProcedimento}
          numeroProcesso={numeroProcesso}
        />
      ) : (
        <REIDIDialog
          actionText="EDITAR"
          onClick={handleUpdate}
          title="Editando REIDI do processo n.º"
          isOpen
          isLoading={isLoading}
          container={container}
          idProcedimento={idProcedimento}
          numeroProcesso={numeroProcesso}
        />
      )}
    </>
  );
};

export default ProcessDialog;
