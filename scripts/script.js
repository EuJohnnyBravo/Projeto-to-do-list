const cartoes = document.getElementById("cartoes");
const hidden = document.getElementById("id");
const listaDeTarefas = [
  {
    id: 1725552678126,
    titulo: "Fazer compras do mercado",
    descricao: "Leite, pão, frutas e verduras",
  },
  {
    id: 1725552692258,
    titulo: "Estudar para a prova de matemática",
    descricao: "Resolver exercícios do capítulo 5",
  },
  { id: 1725552705718, titulo: "Ligar para o médico", descricao: "Agendar consulta de rotina" },
  { id: 1725552794378, titulo: "Lavar o carro", descricao: "Interior e exterior" },
  {
    id: 1725552705651,
    titulo: "Finalizar o relatório do projeto",
    descricao: "Adicionar gráficos e conclusão",
  },
  { id: 1725552705375, titulo: "Caminhar no parque", descricao: "30 minutos pela manhã" },
  { id: 1725552705164, titulo: "Pagar as contas", descricao: "Luz, água e cartão de crédito" },
  {
    id: 1725552705736,
    titulo: "Arrumar o guarda-roupa",
    descricao: "Doar roupas que não uso mais",
  },
  { id: 1725552705798, titulo: "Ler o novo livro de ficção científica", descricao: "Capítulo 3" },
  {
    id: 1725552701220,
    titulo: "Assistir ao filme indicado pelo amigo",
    descricao: "No fim de semana",
  },
];

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
}

function rescreverTarefa() {
  const editarTarefa = buscaTarefa(Number(hidden.value));
  editarTarefa.titulo = titulo.value;
  editarTarefa.descricao = descricao.value;
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
      <input id="titulo" placeholder="Insira um titulo"  type="text"></input>
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

function filtrarTarefas(e) {}

mostrarCartoes(listaDeTarefas);
