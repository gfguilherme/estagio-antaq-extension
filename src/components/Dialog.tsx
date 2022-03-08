import React, { FC } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { unmountComponentAtNode } from 'react-dom';
import {
    FormControl,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    InputLabel,
    MenuItem,
} from '@mui/material';

interface AlertDialogProps {
    container: Element;
}

const AlertDialog: FC<AlertDialogProps> = ({ container }) => {
    const [open, setOpen] = React.useState(true);
    const [type, setType] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value as string);
    };

    const handleClose = () => {
        setOpen(false);
        unmountComponentAtNode(container);
    };

    const handleSelect = () => {
        switch (type) {
            case 'REIDI':
                chrome.runtime.sendMessage({
                    action: 'showREIDIDialog',
                    type: 'create',
                });
                break;
            case 'Leilões':
                chrome.runtime.sendMessage({
                    action: 'showAuctionDialog',
                });
                break;
            default:
                break;
        }
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Controle Finalístico</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Selecione abaixo qual tipo de controle deseja criar.
                </DialogContentText>
                <Box sx={{ margin: 5 }}>
                    <FormControl fullWidth>
                        <InputLabel id="select-label">Documento</InputLabel>
                        <Select
                            value={type}
                            label="Documento"
                            onChange={handleChange}
                            labelId="select-label"
                            fullWidth
                        >
                            <MenuItem value="REIDI">REIDI</MenuItem>
                            <MenuItem value="Leilões">Leilões</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>CANCELAR</Button>
                <Button onClick={handleSelect}>SELECIONAR</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AlertDialog;
