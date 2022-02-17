import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Switch from "@mui/material/Switch";
import { render } from "react-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GavelIcon from "@mui/icons-material/Gavel";

export default function Popup() {
  const [checked, setChecked] = React.useState(["reidi"]);

  React.useEffect(() => {
    if (checked.includes("reidi")) {
      chrome.tabs.query({ active: true, currentWindow: true }, (activeTabs) => {
        chrome.tabs.sendMessage(activeTabs[0].id, { action: "showREIDI" });
      });
    } else {
      chrome.tabs.query({ active: true, currentWindow: true }, (activeTabs) => {
        chrome.tabs.sendMessage(activeTabs[0].id, { action: "hideREIDI" });
      });
    }
  }, [checked]);

  const handleToggle = (value: string) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      subheader={<ListSubheader>Controles Finalísticos</ListSubheader>}
    >
      <ListItem>
        <ListItemIcon>
          {checked.includes("reidi") ? (
            <VisibilityIcon />
          ) : (
            <VisibilityOffIcon />
          )}
        </ListItemIcon>
        <ListItemText primary={<b>REIDI</b>} />
        <Switch
          edge="end"
          onChange={handleToggle("reidi")}
          checked={checked.indexOf("reidi") !== -1}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <GavelIcon />
        </ListItemIcon>
        <ListItemText primary={<b>Leilões</b>} />
        <Switch
          edge="end"
          onChange={handleToggle("leiloes")}
          checked={checked.indexOf("leiloes") !== -1}
        />
      </ListItem>
    </List>
  );
}

const root = document.createElement("div");
document.body.appendChild(root);
render(<Popup />, root);
