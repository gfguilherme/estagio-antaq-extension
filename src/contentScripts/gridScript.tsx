import React from "react";
import ReactDOM from "react-dom";
import { DialogProvider } from "../contexts/dialogContext";

// Components
import ReactGrid from "../views/DataGrid";

// Elementos globais
const { head } = document;

// Adiciona a font-family Material Icons
const materialIcons: HTMLLinkElement = document.createElement("link");
materialIcons.rel = "stylesheet";
materialIcons.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
head.appendChild(materialIcons);

const mainMenu = document.getElementById("main-menu");
const screen = document.getElementById("divInfraAreaTelaD");

const li = document.createElement("li");
const a = document.createElement("a");

const modal = document.createElement("div");

document.body.appendChild(modal);

a.textContent = "Tabela REIDI";

li.appendChild(a);
mainMenu.appendChild(li);

// Renderiza o Grid na tela ao clicar no botão
a.addEventListener("click", () => {
  ReactDOM.render(
    <DialogProvider>
      <ReactGrid />
    </DialogProvider>,
    screen
  );

  document.getElementById("divInfraAreaTelaE").style.width = "19%";
  document.getElementById("divInfraAreaTelaD").style.width = "80%";
});
