import React, { createContext, useState, useEffect, ReactNode } from "react";

import { getRow } from "../services/api";

export interface Process {
  analiseGPO: string;
  andamentoGPO: string;
  arrendatario: string;
  codigoMInfra: string;
  contratoArrendamento: string;
  dataProtocoloPedido: Date | String;
  deliberacaoDiretoria: string;
  id: number;
  inicioAnaliseGPO: Date | String;
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
  terminoAnaliseGPO: Date | String;
  tipoCarga: string;
  valorInvestimentoProposto: string;
}

const initialProcess: Process = {
  analiseGPO: "",
  andamentoGPO: "",
  arrendatario: "",
  codigoMInfra: "",
  contratoArrendamento: "",
  dataProtocoloPedido: "",
  deliberacaoDiretoria: "",
  id: 0,
  inicioAnaliseGPO: "",
  manifestacaoANTAQ: "",
  numeroProcesso: "",
  objeto: "",
  observacoes: "",
  perfilCarga: "",
  portoOrganizado: "",
  prazoAnalise: "",
  protocoloMInfra: "",
  rowNumber: "",
  situacao: "",
  tecnico: "",
  terminoAnaliseGPO: "",
  tipoCarga: "",
  valorInvestimentoProposto: "",
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

  const getProcess = async (numeroProcesso) => {
    try {
      const response = await getRow(numeroProcesso);
      setProcess(response);
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <DialogContext.Provider value={{ process, setProcess, getProcess }}>
      {children}
    </DialogContext.Provider>
  );
}
