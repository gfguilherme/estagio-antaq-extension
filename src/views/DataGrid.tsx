import MaterialTable, { Column } from '@material-table/core';
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { createRowModel } from '../services/utils';

const initialState: Column<any>[] = [
    { title: 'ID', field: 'id', hidden: true },
    {
        title: 'Número do Processo',
        field: 'numeroProcesso',
    },
    { title: 'Data de Protocolo do Pedido', field: 'dataProtocoloPedido' },
    {
        title: 'Porto Organizado',
        field: 'portoOrganizado',
    },
    { title: 'Contrato de Arrendamento', field: 'contratoArrendamento' },
    { title: 'Arrendatário', field: 'arrendatario' },
    {
        title: 'Valor do Investimento Proposto',
        field: 'valorInvestimentoProposto',
    },
    { title: 'Perfil de Carga', field: 'perfilCarga' },
    { title: 'Tipo de Carga', field: 'tipoCarga' },
    { title: 'Análise da GPO', field: 'analiseGPO' },
    { title: 'Objeto', field: 'objeto' },
    { title: 'Observações', field: 'observacoes' },
    { title: 'Técnico', field: 'tecnico' },
    { title: 'Andamento GPO', field: 'andamentoGPO' },
    {
        title: 'Início da Análise - GPO',
        field: 'inicioAnaliseGPO',
        type: 'date',
    },
    { title: 'Término da Análise - GPO', field: 'terminoAnaliseGPO' },
    { title: 'Prazo de Análise', field: 'prazoAnalise' },
    { title: 'Situação', field: 'situacao' },
    {
        title: 'Manifestação da ANTAQ (Diretoria/SOG)',
        field: 'manifestacaoANTAQ',
    },
    {
        title: 'Deliberação da diretoria (e/ou declaração técnica SOG)',
        field: 'deliberacaoDiretoria',
    },
];

export default function DataGrid() {
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState<Column<any>[]>(initialState);

    // Requisita os processos cadastrados
    const getProcesses = async () => {
        try {
            const response = await api.get('/spreadsheet');
            setData(response.data);
        } catch (error) {
            console.warn(error);
        }
    };

    useEffect(() => {
        getProcesses();
    }, []);

    // Requisita a criação de um novo processo
    const handleRowAdd = async (newData) => {
        const value = createRowModel(newData);
        try {
            await api.post('/spreadsheet', { value });
        } catch (error) {
            console.error(error);
        }
    };

    // Requisita a atualização do processo
    const handleRowUpdate = async (newData, oldData) => {
        const value = createRowModel(newData);
        try {
            await api.put(`/spreadsheet/${newData.id}`, { value });
        } catch (error) {
            console.error(error);
        }
    };

    // Requisita a exclusão do processo
    const handleRowDelete = async (oldData) => {
        const encodedProcessNumber = encodeURIComponent(oldData.numeroProcesso);
        try {
            await api.delete(`/row/${encodedProcessNumber}`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ margin: 15, padding: 15, width: 1400 }}>
            <MaterialTable
                actions={[
                    {
                        icon: 'visibility',
                        tooltip: 'Visualizar processo',
                        onClick: (event, rowData) =>
                            chrome.runtime.sendMessage({
                                action: 'showREIDIDialog',
                                type: 'edit',
                                numeroProcesso: rowData.numeroProcesso,
                            }),
                    },
                ]}
                columns={columns}
                data={data}
                editable={{
                    onRowAdd: (newData) => handleRowAdd(newData).then(getProcesses),
                    onRowDelete: (oldData) => handleRowDelete(oldData).then(getProcesses),
                    onRowUpdate: (newData, oldData) =>
                        handleRowUpdate(newData, oldData).then(getProcesses),
                }}
                localization={{
                    body: {
                        editRow: {
                            deleteText: 'Tem certeza que deseja deletar esse registro?',
                        },
                    },
                    grouping: {
                        placeholder: 'Arraste os cabeçalhos aqui para agrupar',
                    },
                    header: {
                        actions: 'Ações',
                    },
                    toolbar: {
                        searchPlaceholder: 'Procurar',
                    },
                }}
                onRowClick={(event, rowData) =>
                    chrome.runtime.sendMessage({
                        action: 'showREIDIDialog',
                        type: 'edit',
                        numeroProcesso: rowData.numeroProcesso,
                    })
                }
                options={{
                    search: true,
                    paging: true,
                    filtering: true,
                    grouping: true,
                    sorting: true,
                    pageSize: 5,
                    pageSizeOptions: [5, 10, 15, 20, 25],
                    maxBodyHeight: 700,
                    minBodyHeight: 700,
                    overflowY: 'scroll',
                    exportMenu: [
                        {
                            label: 'Export PDF',
                            exportFunc: (cols, datas) => ExportPdf(cols, datas, ''),
                        },
                        {
                            label: 'Export CSV',
                            exportFunc: (cols, datas) => ExportCsv(cols, datas, ''),
                        },
                    ],
                }}
                style={{ whiteSpace: 'nowrap' }}
                title="Tabela REIDI"
            />
        </div>
    );
}
