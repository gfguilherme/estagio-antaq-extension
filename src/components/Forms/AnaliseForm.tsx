import React, { useState, useContext } from "react";
import {
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Typography,
} from "@mui/material";

// Estilo global
import "../../styles/global.css";

// Componentes
import FormTextField from "../FormTextField";
import FormDatePicker from "../FormDatePicker";

import { DialogContext } from "../../contexts/dialogContext";

const AnaliseForm: React.FC = () => {
  const { process, setProcess } = useContext(DialogContext);

  const [andamentoGPO, setAndamentoGPO] = useState("female");

  const handleRadioButtonChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAndamentoGPO((event.target as HTMLInputElement).value);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="caption" sx={{ fontSize: 24, color: "#1976d2" }}>
          GPO
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <FormTextField
          label="Técnico"
          value={process.tecnico || ""}
          onChange={(e) =>
            setProcess({
              ...process,
              tecnico: e.target.value,
            })
          }
        />
      </Grid>
      <Grid item xs={8}>
        <FormTextField
          label="Análise da GPO"
          fullWidth
          value={process.analiseGPO || ""}
          onChange={(e) =>
            setProcess({
              ...process,
              analiseGPO: e.target.value,
            })
          }
        />
      </Grid>
      <Grid item xs={4}>
        <FormDatePicker
          label="Início da Análise - GPO"
          value={process.inicioAnaliseGPO || null}
          onChange={(newValue) =>
            setProcess({
              ...process,
              inicioAnaliseGPO: newValue,
            })
          }
        />
      </Grid>
      <Grid item xs={4}>
        <FormDatePicker
          label="Término da Análise - GPO"
          value={process.terminoAnaliseGPO || null}
          onChange={(newValue) =>
            setProcess({
              ...process,
              terminoAnaliseGPO: newValue,
            })
          }
        />
      </Grid>
      <Grid item xs={4}>
        <FormTextField
          label="Prazo de Análise"
          value={process.prazoAnalise || ""}
          disabled
          onChange={(e) =>
            setProcess({
              ...process,
              prazoAnalise: e.target.value,
            })
          }
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl component="fieldset">
          <FormLabel component="legend">Andamento GPO</FormLabel>
          <RadioGroup
            row
            aria-label="andamentoGPO"
            name="controlled-radio-buttons-group"
            value={andamentoGPO}
            onChange={handleRadioButtonChange}
          >
            <FormControlLabel
              value="Pendente"
              control={<Radio />}
              label="Pendente"
            />
            <FormControlLabel
              value="Em análise"
              control={<Radio />}
              label="Em análise"
            />
            <FormControlLabel
              value="Finalizado"
              control={<Radio />}
              label="Finalizado"
            />
            <FormControlLabel value="Outro" control={<Radio />} label="Outro" />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="caption" sx={{ fontSize: 24, color: "#1976d2" }}>
          Diretoria/SOG
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <FormTextField
          label="Manifestação da ANTAQ"
          value={process.manifestacaoANTAQ || ""}
          onChange={(e) =>
            setProcess({
              ...process,
              manifestacaoANTAQ: e.target.value,
            })
          }
          helperText="Diretoria/SOG"
        />
      </Grid>
      <Grid item xs={8}>
        <FormTextField
          label="Deliberação da Diretoria"
          fullWidth
          value={process.deliberacaoDiretoria || ""}
          onChange={(e) =>
            setProcess({
              ...process,
              deliberacaoDiretoria: e.target.value,
            })
          }
          helperText="e/ou declaração técnica SOG"
        />
      </Grid>
    </Grid>
  );
};

export default AnaliseForm;
