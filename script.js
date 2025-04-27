// Variáveis de referência para a biblioteca e perfil
const jogosLista = document.getElementById('jogos-lista');
const nomePerfil = document.getElementById('nome-perfil');
const fotoPerfil = document.getElementById('foto-perfil');
const formJogo = document.getElementById('form-jogo');
const nomeJogoInput = document.getElementById('nome-jogo');
const arquivoJogoInput = document.getElementById('arquivo-jogo');
const editarPerfilButton = document.getElementById('editar-perfil');

// Carregar perfil do localStorage
function carregarPerfil() {
  const perfil = JSON.parse(localStorage.getItem('perfil'));
  if (perfil) {
    nomePerfil.innerText = perfil.nome;
    fotoPerfil.src = perfil.foto || 'perfil.jpg'; // Foto padrão caso não tenha
  }
}

// Salvar perfil no localStorage
function salvarPerfil(nome, foto) {
  const perfil = { nome, foto };
  localStorage.setItem('perfil', JSON.stringify(perfil));
  carregarPerfil(); // Atualizar o perfil na interface
}

// Função para carregar os jogos do localStorage
function carregarJogos() {
  const jogos = JSON.parse(localStorage.getItem('jogos')) || [];
  jogosLista.innerHTML = ''; // Limpar lista antes de adicionar
  jogos.forEach(jogo => {
    adicionarJogo(jogo.nome, jogo.arquivo);
  });
}

// Função para adicionar um jogo à biblioteca
function adicionarJogo(nome, arquivo) {
  // Criar um item de jogo na lista
  const jogoItem = document.createElement('div');
  jogoItem.classList.add('jogo-item');

  // Adicionar nome do jogo e botão para abrir
  jogoItem.innerHTML = `
    <h4>${nome}</h4>
    <button onclick="abrirJogo('${arquivo}')">Jogar</button>
  `;

  // Adicionar o item na lista de jogos
  jogosLista.appendChild(jogoItem);
}

// Função para abrir o jogo (simula abrir o exe)
function abrirJogo(arquivo) {
  alert(Abrindo ,o ,jogo, $,{arquivo}); // Aqui você pode configurar para rodar o exe
}

// Função para salvar jogo no localStorage
function salvarJogo(nome, arquivo) {
  const jogos = JSON.parse(localStorage.getItem('jogos')) || [];
  jogos.push({ nome, arquivo });
  localStorage.setItem('jogos', JSON.stringify(jogos));
}

// Evento para o formulário de adicionar jogo
formJogo.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevenir o envio do formulário
  const nomeJogo = nomeJogoInput.value;
  const arquivoJogo = arquivoJogoInput.files[0];

  // Verificar se o nome do jogo e o arquivo foram fornecidos
  if (nomeJogo && arquivoJogo) {
    adicionarJogo(nomeJogo, arquivoJogo.name); // Adicionar o jogo na lista
    salvarJogo(nomeJogo, arquivoJogo.name); // Salvar no localStorage
    nomeJogoInput.value = ''; // Limpar o campo do nome do jogo
    arquivoJogoInput.value = ''; // Limpar o campo do arquivo
  }
});

// Função para inicializar a página
function inicializar() {
  carregarPerfil();
  carregarJogos();
}

// Chama a função inicial ao carregar a página
inicializar();

// Evento para editar o perfil
editarPerfilButton.addEventListener('click', () => {
  const nome = prompt('Digite o novo nome:');
  const foto = prompt('Digite a URL da foto (ou deixe em branco para não alterar):');
  salvarPerfil(nome, foto);
});