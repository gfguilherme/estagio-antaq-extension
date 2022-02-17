import axios from "axios";
import { Process } from "../contexts/dialogContext";

export const api = axios.create({
  baseURL: "http://localhost:3333/api",
});

const baseUrl = "http://localhost:3333/api";

// creat
export async function createRow(row: Process) {
  try {
    const response = await axios.post(`${baseUrl}/spreadsheet`, {
      value: {
        "Número do Processo": row.numeroProcesso,
        "Data de protocolo do pedido": row.dataProtocoloPedido,
        "Porto Organizado": row.portoOrganizado,
        "Contrato de Arrendamento": row.contratoArrendamento,
        Arrendatário: row.arrendatario,
        "Valor do investimento proposto": row.valorInvestimentoProposto,
        "Perfil de carga": row.perfilCarga,
        "Tipo de carga": row.tipoCarga,
        "Análise da GPO": row.analiseGPO,
        OBJETO: row.objeto,
        OBSERVAÇÕES: row.observacoes,
        TÉCNICO: row.tecnico,
        "Andamento GPO": row.andamentoGPO,
        "Início da Análise - GPO": row.inicioAnaliseGPO,
        "Término da Análise - GPO": row.terminoAnaliseGPO,
        "Prazo de Análise": row.prazoAnalise,
        SITUAÇÃO: row.situacao,
        "Manifestação da ANTAQ (Diretoria/SOG)": row.manifestacaoANTAQ,
        "Deliberação da diretoria (e/ou declaração técnica SOG)":
          row.deliberacaoDiretoria,
      },
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

// read
export async function getSpreadsheet() {
  try {
    const response = await axios.get(`${baseUrl}/spreadsheet`);
    return response.data;
  } catch (error) {
    console.warn(error);
  }
}

// Obtêm a linha do processo
export async function getRow(processNumber: string) {
  const encodedProcessNumber = encodeURIComponent(processNumber);
  try {
    const response = await axios.get(`${baseUrl}/row/${encodedProcessNumber}`);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

// update
export async function updateRow(newData: Process, id: number) {
  try {
    const response = await axios.put(`${baseUrl}/spreadsheet/${id}`, {
      value: {
        "Número do Processo": newData.numeroProcesso,
        "Data de protocolo do pedido": newData.dataProtocoloPedido,
        "Porto Organizado": newData.portoOrganizado,
        "Contrato de Arrendamento": newData.contratoArrendamento,
        Arrendatário: newData.arrendatario,
        "Valor do investimento proposto": newData.valorInvestimentoProposto,
        "Perfil de carga": newData.perfilCarga,
        "Tipo de carga": newData.tipoCarga,
        "Análise da GPO": newData.analiseGPO,
        OBJETO: newData.objeto,
        OBSERVAÇÕES: newData.observacoes,
        TÉCNICO: newData.tecnico,
        "Andamento GPO": newData.andamentoGPO,
        "Início da Análise - GPO": newData.inicioAnaliseGPO,
        "Término da Análise - GPO": newData.terminoAnaliseGPO,
        "Prazo de Análise": newData.prazoAnalise,
        SITUAÇÃO: newData.situacao,
        "Manifestação da ANTAQ (Diretoria/SOG)": newData.manifestacaoANTAQ,
        "Deliberação da diretoria (e/ou declaração técnica SOG)":
          newData.deliberacaoDiretoria,
      },
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

// delete
export async function deleteRow(processNumber: string) {
  const encodedProcessNumber = encodeURIComponent(processNumber);
  try {
    const response = await axios.delete(
      `${baseUrl}/row/${encodedProcessNumber}`
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
}

export async function matchRows(rows: string[]): Promise<string[]> {
  try {
    const response = await axios.get(`${baseUrl}/teste`);

    const { rowsProcessNumbers } = response.data;

    const result = rows.filter((item) => rowsProcessNumbers.includes(item));

    return result;
  } catch (error) {
    throw new Error(error);
  }
}
