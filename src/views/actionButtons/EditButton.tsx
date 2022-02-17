import React, { FC } from "react";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

interface CreateButtonProps {
  element: Element;
}

const EditButton: FC<CreateButtonProps> = ({ element }) => {
  const idProcedimento = element.id;
  const numeroProcesso = element.classList[1];

  const handleClick = () => {
    chrome.runtime.sendMessage({
      action: "showREIDIDialog",
      type: "edit",
      idProcedimento,
      numeroProcesso,
    });
  };

  return (
    <IconButton onClick={handleClick}>
      <EditOutlinedIcon />
    </IconButton>
  );
};

export default EditButton;
