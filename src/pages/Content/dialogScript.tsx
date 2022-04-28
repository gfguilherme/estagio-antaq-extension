import React from 'react';
import ReactDOM from 'react-dom';
import DialogPlaceholder from '../../components/dialogPlaceholder';
import ProcessDialog from '../../containers/ProcessDialog';
import { DialogProvider } from '../../contexts/dialogContext';

// Renderiza o formulário na tela
const renderForm = () => {
  const root = document.createElement('div');
  document.body.appendChild(root);

  chrome.runtime.onMessage.addListener((request) => {
    const { numeroProcesso, idProcedimento, type } = request;
    if (request.action === 'showREIDIDialog') {
      ReactDOM.render(
        <DialogProvider>
          <ProcessDialog
            type={type}
            numeroProcesso={numeroProcesso}
            idProcedimento={idProcedimento}
            container={root}
          />
        </DialogProvider>,
        root
      );
    } else if (request.action === 'showAuctionDialog') {
      ReactDOM.render(
        <DialogPlaceholder numeroProcesso={numeroProcesso} />,
        root
      );
    }
  });
};

export default renderForm;
