import React from "react";
import ReactDOM, { render } from "react-dom";

import { Skeleton } from "@mui/material";

// Componentes
import CreateButton from "../views/actionButtons/CreateButton";
import { matchRows } from "../services/api";
import renderForm from "./dialogScript";
import DeleteButton from "../views/actionButtons/DeleteButton";
import AlertDialog from "../components/Dialog";
import EditButton from "../views/actionButtons/EditButton";

// Array contendo linhas da tabela
const processRowsCollection = [
  ...document.getElementsByClassName("infraTrClara"),
];
// Array contendo números e IDs de processos
const processNumberCollection = [
  ...document.getElementsByClassName("infraCheckbox"),
];

let REIDIButtons: Element[] = [];

// Incorpora a família de fontes Roboto
const addStylesheet = () => {
  const robotoFont: HTMLLinkElement = document.createElement("link");
  robotoFont.rel = "stylesheet";
  robotoFont.href =
    "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap";
  document.head.appendChild(robotoFont);
};

// Adiciona REIDI como um cabeçalho da tabela
const addTableHeader = () => {
  const tblProcessosRecebidos = document.getElementById(
    "tblProcessosRecebidos"
  );
  const tblProcessosGerados = document.getElementById("tblProcessosGerados");
  const tblProcessosGeradosIsNull = tblProcessosGerados === null;

  const trProcessosRecebidos = tblProcessosRecebidos.children
    .item(1)
    .children.item(0);

  const th = document.createElement("th");
  th.classList.add("tituloControle");
  th.textContent = "REIDI";

  th.id = "REIDITh";

  const th2 = document.createElement("th");
  th2.classList.add("tituloControle");
  th2.textContent = "REIDI";

  trProcessosRecebidos.append(th);

  // Inclui header apenas se a tabela de processos gerados existir
  if (!tblProcessosGeradosIsNull) {
    const trProcessosGerados = tblProcessosGerados.children
      .item(1)
      .children.item(0);

    trProcessosGerados.append(th2);
  }
};

const addButtons = () => {
  const divComandos = document.getElementById("divComandos");
  const newDocButton = document.createElement("a");
  newDocButton.href = "#";
  newDocButton.tabIndex = 451;
  newDocButton.classList.add("botaoSEI");
  newDocButton.innerHTML = `<img src="imagens/sei_incluir_documento.gif" class="infraCorBarraSistema" title="Adicionar novo documento">`;

  const container = document.body.appendChild(document.createElement("div"));
  newDocButton.addEventListener("click", () =>
    render(<AlertDialog container={container} />, container)
  );

  divComandos.append(newDocButton);

  // Adiciona um novo campo de dados na linha da tabela
  processRowsCollection.forEach((element) => {
    const td = document.createElement("td");
    td.classList.add("REIDIButton");
    element.appendChild(td);
  });

  REIDIButtons = [...document.getElementsByClassName("REIDIButton")];
};

const addSkeleton = () => {
  REIDIButtons.forEach((element) => {
    ReactDOM.render(<Skeleton width={24} height={40} />, element);
  });
};

// Adiciona classes
const addClasses = () => {
  // Cada botão recebe o ID do procedimento como seu ID
  processNumberCollection.forEach((element, index) => {
    const idProcesso = element.getAttribute("value");
    REIDIButtons[index].id = idProcesso;
  });

  // Cada botão recebe o número do processo em sua classe
  processNumberCollection.forEach((element, index) => {
    const numeroProcesso = element.getAttribute("title");
    REIDIButtons[index].classList.add(numeroProcesso);
  });
};

const renderButtons = async () => {
  //  Coleção de número de processos do SEI
  const SEIProcessNumbers: string[] = processNumberCollection.map(
    (element) => element.textContent
  );

  // Processos correspondentes na planilha

  const response = await matchRows(SEIProcessNumbers);

  // Renderiza os botões de adicionar/editar um REIDI vinculado ao processo
  REIDIButtons.forEach((element) => {
    if (response.includes(element.classList[1])) {
      ReactDOM.render(
        <>
          <EditButton element={element} />
          <DeleteButton element={element} />
        </>,
        element
      );
      element.classList.add("editButton");
    } else {
      ReactDOM.render(<CreateButton element={element} />, element);
      element.classList.add("createButton");
    }
  });
};

const buttonsScript = async () => {
  addStylesheet();
  addTableHeader();
  addButtons();
  addSkeleton();
  addClasses();
  await renderButtons();
  renderForm();
};

buttonsScript();

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "showREIDI") {
    $("#REIDITh").fadeIn("slow");
    $(".REIDIButton").fadeIn("slow");
  }
});

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "hideREIDI") {
    $("#REIDITh").fadeOut("slow");
    $(".REIDIButton").fadeOut("slow");
  }
});

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "reloadREIDI") {
    renderButtons();
  }
});
