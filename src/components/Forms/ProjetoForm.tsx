import { Grid, InputAdornment } from '@mui/material';
import React, { useContext, useState } from 'react';
import { DialogContext } from '../../contexts/dialogContext';
import { apiDB } from '../../services/api';
import { AsynchronousAutocomplete } from '../AsynchronousAutocomplete';
import FormTextField from '../FormTextField';

interface IPorto {
  CDBiGrama: string;
  CDTriGrama: string;
  NOPorto: string;
}

export default function ProjetoForm(): JSX.Element {
  const { process, setProcess } = useContext(DialogContext);
  const [portoValue, setPortoValue] = useState<IPorto | null>(null);
  const [contratoArrendamentoValue, setContratoArrendamentoValue] = useState<
    string | null
  >(null);
  const [isDisabled, setDisabled] = useState(true);

  const handleGetPortosOptions = async () => {
    try {
      const response = await apiDB.get('portos');
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetContratosOptions = async (CDTriGrama: string) => {
    try {
      const response = await apiDB.get(`contratoarrendamento/${CDTriGrama}`);
      setProcess({...process, IDContratoArrendamento: response.data.IDContratoArrendamento})

      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handlePortoChange = (
    event: React.SyntheticEvent<Element, Event>,
    newValue: IPorto | null
  ): void => {
    setPortoValue(newValue);
    setContratoArrendamentoValue(null);
    setDisabled(false);
  };

  const handleContratoArrendamentoChange = (
    event: any,
    newValue: string | null
  ) => {
    setContratoArrendamentoValue(newValue);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <AsynchronousAutocomplete
          value={portoValue}
          onChange={handlePortoChange}
          handleGetOptions={() => handleGetPortosOptions()}
          optionLabel="NOPorto"
          label="Portos"
        />
      </Grid>
      <Grid item xs={4}>
        <AsynchronousAutocomplete
          value={contratoArrendamentoValue}
          onChange={handleContratoArrendamentoChange}
          handleGetOptions={() =>
            handleGetContratosOptions(portoValue.CDTriGrama)
          }
          optionLabel="CDContrato"
          label="Contrato"
          disabled={isDisabled}
        />
      </Grid>
      <Grid item xs={4}>
        <FormTextField
          label="Valor do Investimento Proposto"
          value={process.VLInvestimentoProposto || ''}
          onChange={(e) =>
            setProcess({
              ...process,
              VLInvestimentoProposto: parseInt(e.target.value),
            })
          }
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">R$</InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <FormTextField
          disabled
          label="Empresa"
          value={process.arrendatario || ''}
          onChange={(e) =>
            setProcess({
              ...process,
              arrendatario: e.target.value,
            })
          }
        />
      </Grid>
      <Grid item xs={4}>
        <FormTextField
          disabled
          label="Perfil de carga"
          value={process.perfilCarga || ''}
          onChange={(e) =>
            setProcess({
              ...process,
              perfilCarga: e.target.value,
            })
          }
        />
      </Grid>
      <Grid item xs={8}>
        <FormTextField
          disabled
          label="Tipo de Carga"
          multiline
          value={process.tipoCarga || ''}
          onChange={(e) =>
            setProcess({
              ...process,
              tipoCarga: e.target.value,
            })
          }
        />
      </Grid>
      <Grid item xs={12}>
        <FormTextField
          disabled
          label="Objeto"
          multiline
          value={process.objeto || ''}
          onChange={(e) =>
            setProcess({
              ...process,
              objeto: e.target.value,
            })
          }
        />
      </Grid>
      <Grid item xs={12}>
        <FormTextField
          disabled
          label="Observações"
          multiline
          value={process.observacoes || ''}
          onChange={(e) =>
            setProcess({
              ...process,
              observacoes: e.target.value,
            })
          }
        />
      </Grid>
    </Grid>
  );
}
