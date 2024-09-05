const cartoes = document.getElementById("cartoes");
const tarefas = [];

function apagarTarefa(id) {
  const [, idCartao] = id.split("-");
  tarefas.splice(idCartao, 1);

  mostrarCartoes();
}

function editarTarefa(id) {
  const edicao = document.getElementById(`${id}`);

  console.log(edicao);
}

function salvarTarefa() {
  const titulo = document.getElementById("titulo").value;
  const descricao = document.getElementById("descricao").value;

  const tarefa = { titulo, descricao };
  tarefas.push(tarefa);
  mostrarCartoes();
}

function cartaoAdicionar() {
  return `
    <div>
      <input id="titulo" type="text"></input>
      <textarea id="descricao"></textarea>
      <a href="#" onClick="salvarTarefa()">Salvar</a>
    </div>
  `;
}

function cartaoTarefa(indice, tarefa) {
  id = `tarefa-${indice}`;

  return `
    <div id="${id}">
      <h2>${tarefa.titulo}</h2>
      <p>${tarefa.descricao}</p>
      <div>
        <a href="#" onClick="apagarTarefa('${id}')">Excluir</a>
        <a href="#" onClick="editarTarefa('${id}')">Editar</a>
      </div>
    </div>
  `;
}

function mostrarCartoes() {
  cartoes.innerHTML = "";
  cartoes.innerHTML = cartaoAdicionar();

  for (const [indice, tarefa] of Object.entries(tarefas)) {
    cartoes.innerHTML += cartaoTarefa(indice, tarefa);
  }
}

mostrarCartoes();
