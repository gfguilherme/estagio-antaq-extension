import React, { FC } from "react";
import { IconButton, Backdrop, CircularProgress } from "@mui/material";
import { DeleteForeverOutlined } from "@mui/icons-material";

// API
import { deleteRow } from "../../services/api";

interface DeleteButtonProps {
  element: Element;
}

const DeleteButton: FC<DeleteButtonProps> = ({ element }) => {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = async () => {
    setOpen(true);
    try {
      await deleteRow(element.classList[1]);
      setOpen(false);
      chrome.runtime.sendMessage({
        action: "showSnackbar",
        message: `Processo n.º ${element.classList[1]} deletado com sucesso!`,
        severity: "success",
      });
      chrome.runtime.sendMessage({
        action: "reloadREIDI",
      });
    } catch (error) {
      setOpen(false);
      chrome.runtime.sendMessage({
        action: "showSnackbar",
        message: `Falha ao deletar o processo n.º ${element.classList[1]}`,
        severity: "error",
      });
    }
  };

  return (
    <>
      <IconButton onClick={handleClick}>
        <DeleteForeverOutlined />
      </IconButton>

      {open ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="primary" />
        </Backdrop>
      ) : (
        ""
      )}
    </>
  );
};

export default DeleteButton;
