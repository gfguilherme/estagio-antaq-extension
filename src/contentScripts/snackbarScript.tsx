import React from "react";
import ReactDOM from "react-dom";

// Componentes
import StatusSnackbar from "../components/StatusSnackbar";

const snackbarDiv = document.createElement("div");
snackbarDiv.id = "snackbar";
document.body.appendChild(snackbarDiv);

const renderSnackbar = (message, severity) => {
  ReactDOM.render(
    <StatusSnackbar
      isOpen
      message={message}
      severity={severity}
      container={snackbarDiv}
    />,
    snackbarDiv
  );
};

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "showSnackbar") {
    const { message, severity } = msg;
    renderSnackbar(message, severity);
  }
});
