import React, { useContext, FC } from "react";
import { TextField, Grid, Autocomplete, InputAdornment } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import FormTextField from "../FormTextField";
import { getPortos } from "../../services/apiV2";

import { DialogContext } from "../../contexts/dialogContext";

interface AsyncAutocompleteProps {
  inputValue: string;
  value: string;
  onChange: (event: any, newValue: string | null) => void;
  onInputChange: (event: any, newInputValue: any) => void;
}

interface Porto {
  CDBiGrama: string;
  CDTriGrama: string;
  NOPorto: string;
}

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const AsyncAutocomplete: FC<AsyncAutocompleteProps> = ({
  inputValue,
  value,
  onChange,
  onInputChange,
}) => {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly Porto[]>([]);
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3);

      if (active) {
        const portos = await getPortos();
        setOptions([...portos]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <Autocomplete
      value={value}
      onChange={onChange}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      inputValue={inputValue}
      onInputChange={onInputChange}
      isOptionEqualToValue={(option, valueTest) =>
        option.NOPorto === valueTest.NOPorto
      }
      getOptionLabel={(option) => option.NOPorto}
      options={options}
      loading={loading}
      loadingText="Carregando"
      renderInput={(params) => (
        <TextField
          {...params}
          label="Porto Organizado"
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

const ProjetoForm: React.FC = () => {
  const { process, setProcess } = useContext(DialogContext);
  const [value, setValue] = React.useState<string | null>();
  const [inputValue, setInputValue] = React.useState(process.portoOrganizado);

  return (
    <Grid container spacing={3}>
      <Grid item xs={4}>
        <AsyncAutocomplete
          value={value}
          onChange={(event: any, newValue: string | null) => {
            setProcess({
              ...process,
              portoOrganizado: newValue,
            });
          }}
          inputValue={inputValue || ""}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
        />
      </Grid>
      <Grid item xs={4}>
        <FormTextField
          label="Contrato de Arrendamento"
          value={process.contratoArrendamento || ""}
          onChange={(e) =>
            setProcess({
              ...process,
              contratoArrendamento: e.target.value,
            })
          }
        />
      </Grid>
      <Grid item xs={4}>
        <FormTextField
          label="Valor do Investimento Proposto"
          value={process.valorInvestimentoProposto || ""}
          onChange={(e) =>
            setProcess({
              ...process,
              valorInvestimentoProposto: e.target.value,
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
          label="Arrendatário"
          value={process.arrendatario || ""}
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
          label="Perfil de carga"
          value={process.perfilCarga || ""}
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
          label="Tipo de Carga"
          multiline
          value={process.tipoCarga || ""}
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
          label="Objeto"
          multiline
          value={process.objeto || ""}
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
          label="Observações"
          multiline
          value={process.observacoes || ""}
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
};

export default ProjetoForm;
