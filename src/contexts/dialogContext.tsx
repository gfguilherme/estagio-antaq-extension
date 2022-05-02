import React, { createContext, useState, useEffect, ReactNode } from 'react';

import { apiDB } from '../services/api';

export interface Process {
  analiseGPO: string;
  andamentoGPO: string;
  arrendatario: string;
  NRCodigoMINFRA: string | null;
  IDContratoArrendamento: number | null;
  contratoArrendamento: string;
  DTProtocoloPedido: Date | string;
  deliberacaoDiretoria: string;
  inicioAnaliseGPO: Date | string;
  manifestacaoANTAQ: string;
  NRProcessoPrincipal: string;
  IDProtocoloSEI: string;
  objeto: string;
  observacoes: string;
  perfilCarga: string;
  portoOrganizado: string;
  prazoAnalise: string;
  NRProtocoloMINFRA: string;
  rowNumber: string;
  situacao: string;
  tecnico: string;
  terminoAnaliseGPO: Date | string;
  tipoCarga: string;
  VLInvestimentoProposto
  : number;
}

const initialProcess: Process = {
  analiseGPO: '',
  andamentoGPO: '',
  arrendatario: '',
  NRCodigoMINFRA: '',
  IDContratoArrendamento: null,
  contratoArrendamento: '',
  DTProtocoloPedido: '',
  deliberacaoDiretoria: '',
  inicioAnaliseGPO: '',
  manifestacaoANTAQ: '',
  NRProcessoPrincipal: '',
  IDProtocoloSEI: '',
  objeto: '',
  observacoes: '',
  perfilCarga: '',
  portoOrganizado: '',
  prazoAnalise: '',
  NRProtocoloMINFRA: '',
  rowNumber: '',
  situacao: '',
  tecnico: '',
  terminoAnaliseGPO: '',
  tipoCarga: '',
  VLInvestimentoProposto: 0,
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
      const response = await apiDB.get(`/controlereidi/${encodedProcessNumber}`);
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
