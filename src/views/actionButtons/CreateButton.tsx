import React, { FC } from "react";
import IconButton from "@mui/material/IconButton";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";

interface CreateButtonProps {
  element: Element;
}

const CreateButton: FC<CreateButtonProps> = ({ element }) => {
  const handleClick = () => {
    chrome.runtime.sendMessage({
      action: "showREIDIDialog",
      type: "create",
      idProcedimento: element.id,
      numeroProcesso: element.classList[1],
    });
  };

  return (
    <IconButton onClick={handleClick}>
      <NoteAddOutlinedIcon />
    </IconButton>
  );
};

export default CreateButton;
