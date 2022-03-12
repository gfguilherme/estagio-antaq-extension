import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import IconButton from '@mui/material/IconButton';
import React from 'react';

interface EditButtonProps {
  element: Element;
}

export default function EditButton({ element }: EditButtonProps) {
  const idProcedimento = element.id;
  const numeroProcesso = element.classList[1];

  const handleClick = () => {
    chrome.runtime.sendMessage({
      action: 'showREIDIDialog',
      type: 'edit',
      idProcedimento,
      numeroProcesso,
    });
  };

  return (
    <IconButton onClick={handleClick}>
      <EditOutlinedIcon />
    </IconButton>
  );
}
