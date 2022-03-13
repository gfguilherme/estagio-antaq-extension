import NoteAddOutlinedIcon from '@mui/icons-material/NoteAddOutlined';
import IconButton from '@mui/material/IconButton';
import React from 'react';

interface CreateButtonProps {
  element: Element;
}

export default function CreateButton({ element }: CreateButtonProps) {
  const handleClick = () => {
    chrome.runtime.sendMessage({
      action: 'showREIDIDialog',
      type: 'create',
      idProcedimento: element.id,
      numeroProcesso: element.classList[1],
    });
  };

  return (
    <IconButton onClick={handleClick}>
      <NoteAddOutlinedIcon />
    </IconButton>
  );
}
