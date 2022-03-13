import { Grid } from '@mui/material';
import React, { useContext } from 'react';
import { DialogContext } from '../../contexts/dialogContext';
import FormDatePicker from '../FormDatePicker';
import FormTextField from '../FormTextField';

export default function ProcessoForm() {
  const { process, setProcess } = useContext(DialogContext);

  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <FormTextField
          label="Número do Processo SEI"
          value={process.numeroProcesso || ''}
          onChange={(e) =>
            setProcess({
              ...process,
              numeroProcesso: e.target.value,
            })
          }
        />
      </Grid>
      <Grid item xs={4}>
        <FormTextField
          label="Protocolo MInfra"
          value={process.protocoloMInfra || ''}
          onChange={(e) =>
            setProcess({
              ...process,
              protocoloMInfra: e.target.value,
            })
          }
        />
      </Grid>
      <Grid item xs={4}>
        <FormTextField
          label="Código MInfra"
          value={process.codigoMInfra || ''}
          onChange={(e) =>
            setProcess({
              ...process,
              codigoMInfra: e.target.value,
            })
          }
        />
      </Grid>
      <Grid item xs={8}>
        <FormTextField
          label="Situação"
          multiline
          value={process.situacao || ''}
          onChange={(e) =>
            setProcess({
              ...process,
              situacao: e.target.value,
            })
          }
        />
      </Grid>
      <Grid item xs={4}>
        <FormDatePicker
          label="Data de Protocolo do Pedido"
          value={process.dataProtocoloPedido || null}
          onChange={(newValue) =>
            setProcess({
              ...process,
              dataProtocoloPedido: newValue,
            })
          }
        />
      </Grid>
    </Grid>
  );
}
