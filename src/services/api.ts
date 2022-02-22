import axios from "axios";
import { Process } from "../contexts/dialogContext";

export const api = axios.create({
  baseURL: "http://localhost:3333/api",
});

const baseUrl = "http://localhost:3333/api";

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
