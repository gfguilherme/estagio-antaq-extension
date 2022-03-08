import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Switch from '@mui/material/Switch';
import { MenuList } from '@mui/material';

interface BasicMenuProps {
    title: string;
    menuItems: { title: string; onClick: () => void }[];
}

const BasicMenu: React.FC<BasicMenuProps> = ({ title, menuItems }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //   setState({
    //     ...state,
    //     [event.target.name]: event.target.checked,
    //   });
    // };

    return (
        <>
            <Button onClick={handleClick}>{title}</Button>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                {/* {menuItems.map((element) => (
          <MenuItem onClick={element.onClick}>{element.title}</MenuItem>
        ))} */}
                <MenuList dense>
                    <FormGroup>
                        <MenuItem>
                            <FormControlLabel
                                control={<Switch defaultChecked size="small" />}
                                label="Número do Processo"
                            />
                        </MenuItem>
                        <MenuItem>
                            <FormControlLabel
                                control={<Switch defaultChecked size="small" />}
                                label="Data de Protocolo do Pedido"
                            />
                        </MenuItem>
                        <MenuItem>
                            <FormControlLabel
                                control={<Switch defaultChecked size="small" />}
                                label="Porto Organizado"
                            />
                        </MenuItem>
                    </FormGroup>
                </MenuList>
            </Menu>
        </>
    );
};

export default BasicMenu;
