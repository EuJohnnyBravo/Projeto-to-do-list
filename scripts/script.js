const cartoes = document.getElementById("cartoes");
const hidden = document.getElementById("id");
const chave = "chave";
const listaDeTarefas = getLocalStorage() ? getLocalStorage() : [];

function getLocalStorage() {
  return JSON.parse(localStorage.getItem(chave));
}

function setLocalStorage(tarefas) {
  localStorage.setItem(chave, JSON.stringify(tarefas));
}

function pegarParametros() {
  return {
    titulo: document.getElementById("titulo"),
    descricao: document.getElementById("descricao"),
  };
}

function buscaIndex(id) {
  return listaDeTarefas.findIndex((tarefa) => tarefa.id === id);
}

function buscaTarefa(id) {
  return listaDeTarefas.find((tarefa) => tarefa.id === id);
}

function apagarTarefa(id) {
  listaDeTarefas.splice(buscaIndex(id), 1);
  setLocalStorage(listaDeTarefas);
  mostrarCartoes(listaDeTarefas);
}

function editarTarefa(id) {
  hidden.value = id;
  const editar = buscaTarefa(id);
  const { titulo, descricao } = pegarParametros();
  titulo.value = editar.titulo;
  descricao.value = editar.descricao;
}

function novaTarefa(titulo, descricao) {
  const tarefa = {
    id: Date.now(),
    titulo: titulo.value,
    descricao: descricao.value,
  };
  listaDeTarefas.unshift(tarefa);
  setLocalStorage(listaDeTarefas);
}

function rescreverTarefa() {
  const editarTarefa = buscaTarefa(Number(hidden.value));
  editarTarefa.titulo = titulo.value;
  editarTarefa.descricao = descricao.value;
  setLocalStorage(listaDeTarefas);
}

function verificaValores(titulo) {
  if (titulo.value === "") {
    return false;
  }
  return true;
}

function salvar() {
  const { titulo, descricao } = pegarParametros();

  if (verificaValores(titulo)) {
    if (hidden.value === "") {
      novaTarefa(titulo, descricao);
    } else {
      rescreverTarefa();
    }
  } else {
    alert("Titulo invalido");
  }

  hidden.value = "";
  mostrarCartoes(listaDeTarefas);
}

function cartaoAdicionar() {
  return `
    <div class="addCard">
      <input id="titulo" placeholder="Tarefa..."  type="text"></input>
      <textarea id="descricao" placeholder="Descrição da tarefa"></textarea>
      <a href="#" class="botao salvar" onClick="salvar()">Salvar</a>
    </div>
  `;
}

function cartaoTarefa(tarefa) {
  return `
    <div id="${tarefa.id}" class="card">
      <h1>${tarefa.titulo}</h1>
      <p class="descricao">${tarefa.descricao}</p>
      <div class="botoes">
        <a href="#" class="botao" onClick="editarTarefa(${tarefa.id})">Editar</a>
        <a href="#" class="excluir botao" onClick="apagarTarefa(${tarefa.id})">Excluir</a>
      </div>
    </div>
  `;
}

function mostrarCartoes(tarefas) {
  cartoes.innerHTML = "";
  cartoes.innerHTML = cartaoAdicionar();

  for (const tarefa of tarefas) {
    cartoes.innerHTML += cartaoTarefa(tarefa);
  }
}

const filtrar = document.getElementById("filtrar");
filtrar.addEventListener("input", (e) => {
  const novaLista = listaDeTarefas.filter((tarefa) =>
    tarefa.titulo.toLowerCase().includes(e.target.value.toLowerCase())
  );
  mostrarCartoes(novaLista);
});

mostrarCartoes(listaDeTarefas);
