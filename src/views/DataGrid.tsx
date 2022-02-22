import React, { useContext, useEffect, useState, FC } from "react";
import Button from "@mui/material/Button";
import MaterialTable, { Column, MTableToolbar } from "material-table";
import { Box } from "@mui/material";

import { api } from "../services/api";

import { createRowModel } from "../services/utils";

import Tabs from "../components/Tabs";
import { DialogContext } from "../contexts/dialogContext";
import AnaliseForm from "../components/Forms/AnaliseForm";
import BasicMenu from "../components/BasicMenu";

const initialState: Column<any>[] = [
  { title: "ID", field: "id", hidden: true },
  {
    title: "Número do Processo",
    field: "numeroProcesso",
  },
  { title: "Data de Protocolo do Pedido", field: "dataProtocoloPedido" },
  {
    title: "Porto Organizado",
    field: "portoOrganizado",
  },
  { title: "Contrato de Arrendamento", field: "contratoArrendamento" },
  { title: "Arrendatário", field: "arrendatario" },
  {
    title: "Valor do Investimento Proposto",
    field: "valorInvestimentoProposto",
  },
  { title: "Perfil de Carga", field: "perfilCarga" },
  { title: "Tipo de Carga", field: "tipoCarga" },
  { title: "Análise da GPO", field: "analiseGPO" },
  { title: "Objeto", field: "objeto" },
  { title: "Observações", field: "observacoes" },
  { title: "Técnico", field: "tecnico" },
  { title: "Andamento GPO", field: "andamentoGPO" },
  {
    title: "Início da Análise - GPO",
    field: "inicioAnaliseGPO",
    type: "date",
  },
  { title: "Término da Análise - GPO", field: "terminoAnaliseGPO" },
  { title: "Prazo de Análise", field: "prazoAnalise" },
  { title: "Situação", field: "situacao" },
  {
    title: "Manifestação da ANTAQ (Diretoria/SOG)",
    field: "manifestacaoANTAQ",
  },
  {
    title: "Deliberação da diretoria (e/ou declaração técnica SOG)",
    field: "deliberacaoDiretoria",
  },
];

const App: FC = () => {
  const [data, setData] = useState([]);
  const { process, setProcess, getProcess } = useContext(DialogContext);
  const [columns, setColumns] = useState<Column<any>[]>(initialState);

  // Requisição GET para obter todos os dados cadastrados
  const getProcesses = async () => {
    try {
      const response = await api.get(`/spreadsheet`);
      setData(response.data);
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    getProcesses();
  }, []);

  const handleRowAdd = async (newData) => {
    const value = createRowModel(newData);
    try {
      await api.post("/spreadsheet", { value });
    } catch (error) {
      console.error(error);
    }
  };

  // Requisita a atualização do processo
  const handleRowUpdate = async (newData, oldData) => {
    try {
      const value = createRowModel(newData);
      await api.put(`/spreadsheet/${newData.id}`, { value });
    } catch (error) {
      console.error(error);
    }
  };

  const handleRowDelete = async (oldData) => {
    const encodedProcessNumber = encodeURIComponent(oldData.numeroProcesso);
    try {
      const response = await api.delete(`/row/${encodedProcessNumber}`);
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const handleVision = () => {
    setColumns([
      {
        title: "Número do Processo",
        field: "numeroProcesso",
      },
      { title: "Data de Protocolo do Pedido", field: "dataProtocoloPedido" },
      {
        title: "Porto Organizado",
        field: "portoOrganizado",
      },
      { title: "Contrato de Arrendamento", field: "contratoArrendamento" },
    ]);
  };

  const handleVision2 = () => {
    setColumns(initialState);
  };

  return (
    <>
      <div style={{ margin: 15, padding: 15, width: 1400 }}>
        <MaterialTable
          actions={[
            // {
            //   icon: "build",
            //   tooltip: "Visualizar processo",
            //   onClick: (event, rowData) => console.log(event, rowData),
            // },
            {
              icon: "visibility",
              tooltip: "Visualizar processo",
              onClick: (event, rowData) => console.log(event, rowData),
            },
          ]}
          style={{ whiteSpace: "nowrap" }}
          title="Tabela REIDI"
          data={data}
          columns={columns}
          editable={{
            onRowAdd: (newData) =>
              handleRowAdd(newData).then(() => getProcesses()),
            onRowUpdate: (newData, oldData) =>
              handleRowUpdate(newData, oldData).then(() => getProcesses()),
            onRowDelete: (oldData) =>
              handleRowDelete(oldData).then(() => getProcesses()),
          }}
          options={{
            search: true,
            paging: true,
            filtering: true,
            grouping: true,
            exportButton: true,
            sorting: true,
            pageSize: 5,
            pageSizeOptions: [5, 10, 15, 20, 25],
            maxBodyHeight: 700,
            minBodyHeight: 700,
            overflowY: "scroll",
          }}
          localization={{
            body: {
              editRow: {
                deleteText: "Tem certeza que deseja deletar esse registro?",
              },
            },
            grouping: {
              placeholder: "Arraste os cabeçalhos aqui para agrupar",
            },
            header: {
              actions: "Ações",
            },
            toolbar: {
              searchPlaceholder: "Procurar",
            },
          }}
          onRowClick={(event, rowData) =>
            chrome.runtime.sendMessage({
              action: "showREIDIDialog",
              type: "edit",
              numeroProcesso: rowData.numeroProcesso,
            })
          }
          cellEditable={{
            cellStyle: {},
            onCellEditApproved: (newValue, oldValue, rowData, columnDef) =>
              new Promise((resolve, reject) => {
                console.log(newValue, columnDef);
                setTimeout(resolve, 4000);
              }),
          }}
          components={{
            Toolbar: (props) => (
              <>
                <BasicMenu
                  title="Mostrar colunas"
                  menuItems={[{ title: "teste", onClick: () => {} }]}
                />
                <MTableToolbar {...props} />
              </>
            ),
          }}
        />
      </div>
      <Button variant="contained" onClick={handleVision}>
        Visão compacta
      </Button>
      <Button variant="contained" onClick={handleVision2}>
        Visão completa
      </Button>
    </>
  );
};

export default App;
