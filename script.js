const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

const formBusca = document.getElementById('form-busca');
const campoBusca = document.getElementById('campo-busca');
const estadoInicial = document.getElementById('estado-inicial');
const carregando = document.getElementById('carregando');
const mensagemErro = document.getElementById('mensagem-erro');
const cartaoPokemon = document.getElementById('cartao-pokemon');
const botaoBuscar = document.getElementById('botao-buscar');

function esconderEstados() {
  estadoInicial.classList.add('escondido');
  carregando.classList.add('escondido');
  mensagemErro.classList.add('escondido');
  cartaoPokemon.classList.add('escondido');
}

function formatarNome(nome) {
  return nome.replace(/-/g, ' ');
}

function mostrarErro(texto = 'Confira a escrita e tente novamente.') {
  esconderEstados();
  document.getElementById('texto-erro').textContent = texto;
  mensagemErro.classList.remove('escondido');
}

function exibirPokemon(pokemon) {
  document.getElementById('numero-pokemon').textContent = `#${String(pokemon.id).padStart(3, '0')}`;
  const imagem = document.getElementById('imagem-pokemon');
  imagem.src = pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default;
  imagem.alt = `Imagem do Pokémon ${formatarNome(pokemon.name)}`;
  document.getElementById('nome-pokemon').textContent = formatarNome(pokemon.name);
  document.getElementById('altura-pokemon').textContent = `${(pokemon.height / 10).toFixed(1)} m`;
  document.getElementById('peso-pokemon').textContent = `${(pokemon.weight / 10).toFixed(1)} kg`;
  document.getElementById('habilidade-pokemon').textContent = formatarNome(pokemon.abilities[0].ability.name);

  const tipos = document.getElementById('tipos-pokemon');
  tipos.innerHTML = pokemon.types.map((item) => `<span class="tipo">${item.type.name}</span>`).join('');
  esconderEstados();
  cartaoPokemon.classList.remove('escondido');
}

async function buscarPokemon(termo) {
  esconderEstados();
  carregando.classList.remove('escondido');
  botaoBuscar.disabled = true;
  botaoBuscar.textContent = 'Buscando...';

  try {
    const resposta = await fetch(`${API_URL}${encodeURIComponent(termo.toLowerCase().trim())}`);
    if (!resposta.ok) throw new Error('not-found');
    const pokemon = await resposta.json();
    exibirPokemon(pokemon);
  } catch (erro) {
    mostrarErro('Não encontramos esse Pokémon. Tente usar um nome em inglês ou um número de 1 a 1025.');
  } finally {
    botaoBuscar.disabled = false;
    botaoBuscar.innerHTML = 'Buscar <span aria-hidden="true">→</span>';
  }
}

formBusca.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const termo = campoBusca.value.trim();
  if (termo) buscarPokemon(termo);
});

document.querySelectorAll('.link-exemplo').forEach((botao) => {
  botao.addEventListener('click', () => {
    campoBusca.value = botao.dataset.pokemon;
    buscarPokemon(botao.dataset.pokemon);
  });
});
