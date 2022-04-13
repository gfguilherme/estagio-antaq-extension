import React, { createContext, useState, useEffect, ReactNode } from 'react';

import { api } from '../services/api';

export interface Process {
  analiseGPO: string;
  andamentoGPO: string;
  arrendatario: string;
  codigoMInfra: string;
  IDContratoArrendamento: number | null;
  contratoArrendamento: string;
  dataProtocoloPedido: Date | string;
  deliberacaoDiretoria: string;
  id: number;
  inicioAnaliseGPO: Date | string;
  manifestacaoANTAQ: string;
  numeroProcesso: string;
  objeto: string;
  observacoes: string;
  perfilCarga: string;
  portoOrganizado: string;
  prazoAnalise: string;
  protocoloMInfra: string;
  rowNumber: string;
  situacao: string;
  tecnico: string;
  terminoAnaliseGPO: Date | string;
  tipoCarga: string;
  valorInvestimentoProposto: number;
}

const initialProcess: Process = {
  analiseGPO: '',
  andamentoGPO: '',
  arrendatario: '',
  codigoMInfra: '',
  IDContratoArrendamento: null,
  contratoArrendamento: '',
  dataProtocoloPedido: '',
  deliberacaoDiretoria: '',
  id: 0,
  inicioAnaliseGPO: '',
  manifestacaoANTAQ: '',
  numeroProcesso: '',
  objeto: '',
  observacoes: '',
  perfilCarga: '',
  portoOrganizado: '',
  prazoAnalise: '',
  protocoloMInfra: '',
  rowNumber: '',
  situacao: '',
  tecnico: '',
  terminoAnaliseGPO: '',
  tipoCarga: '',
  valorInvestimentoProposto: 0,
};

type ProcessContextType = {
  process: Process;
  setProcess: React.Dispatch<React.SetStateAction<Process>>;
  getProcess: (numeroProcesso: any) => Promise<void>;
};

export const DialogContext = createContext({} as ProcessContextType);

type ProcessContextProviderProps = {
  children: ReactNode;
};

export function DialogProvider({ children }: ProcessContextProviderProps) {
  const [process, setProcess] = useState<Process>(initialProcess);

  // Requisita e define um processo
  const getProcess = async (processNumber: string) => {
    const encodedProcessNumber = encodeURIComponent(processNumber);
    try {
      const response = await api.get(`/row/${encodedProcessNumber}`);
      setProcess(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DialogContext.Provider value={{ process, setProcess, getProcess }}>
      {children}
    </DialogContext.Provider>
  );
}
