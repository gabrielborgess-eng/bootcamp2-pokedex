const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

// Chave publishable/anon: feita para uso no frontend (nunca use a service_role/secret aqui).
const SUPABASE_URL = 'https://mapkaxqmfgutrrcsuuwx.supabase.co';
const SUPABASE_KEY = 'sb_publishable_rSj6KhRCmuaNr8Ww2b2dNw__b-YkYEH';
const TABELA_URL = `${SUPABASE_URL}/rest/v1/favoritos`;
const CABECALHOS = {
  apikey: SUPABASE_KEY,
  'Content-Type': 'application/json',
};

let pokemonAtual = null;
let favoritos = [];

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

  pokemonAtual = {
    nome: pokemon.name,
    extra: {
      id: pokemon.id,
      imagem: imagem.src,
      tipos: pokemon.types.map((item) => item.type.name),
    },
  };
  document.getElementById('msg-favorito').textContent = '';
  atualizarBotaoFavoritar();

  esconderEstados();
  cartaoPokemon.classList.remove('escondido');
}

/* ---------- Persistência (Supabase) ---------- */

const botaoFavoritar = document.getElementById('botao-favoritar');
const msgFavorito = document.getElementById('msg-favorito');
const listaFavoritos = document.getElementById('lista-favoritos');
const estadoFavoritos = document.getElementById('estado-favoritos');
const contadorFavoritos = document.getElementById('contador-favoritos');

function jaFavoritado() {
  return pokemonAtual && favoritos.some((f) => f.nome_item === pokemonAtual.nome);
}

function atualizarBotaoFavoritar() {
  const ja = jaFavoritado();
  botaoFavoritar.disabled = ja;
  botaoFavoritar.textContent = ja ? '★ Nos favoritos' : '☆ Favoritar';
}

// CREATE
async function salvarFavorito(nome, extra) {
  try {
    const resposta = await fetch(TABELA_URL, {
      method: 'POST',
      headers: { ...CABECALHOS, Prefer: 'return=minimal' },
      body: JSON.stringify({ nome_item: nome, dados_extra: extra }),
    });
    if (!resposta.ok) {
      console.error('Erro ao salvar:', resposta.status, await resposta.text());
      return false;
    }
    return true;
  } catch (erro) {
    console.error(erro);
    return false;
  }
}

// READ
async function listarFavoritos() {
  try {
    const resposta = await fetch(`${TABELA_URL}?select=*&order=criado_em.desc`, { headers: CABECALHOS });
    if (!resposta.ok) throw new Error(`${resposta.status} ${await resposta.text()}`);
    favoritos = await resposta.json();
  } catch (erro) {
    console.error('Erro ao listar:', erro);
    estadoFavoritos.textContent = 'Não foi possível carregar os favoritos.';
    estadoFavoritos.classList.remove('escondido');
    return;
  }
  renderizarFavoritos();
  atualizarBotaoFavoritar();
}

// DELETE
async function removerFavorito(id) {
  try {
    const resposta = await fetch(`${TABELA_URL}?id=eq.${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: CABECALHOS,
    });
    if (!resposta.ok) {
      console.error('Erro ao excluir:', resposta.status, await resposta.text());
      return;
    }
  } catch (erro) {
    console.error(erro);
    return;
  }
  await listarFavoritos();
}

function renderizarFavoritos() {
  listaFavoritos.replaceChildren();
  contadorFavoritos.textContent = favoritos.length;
  estadoFavoritos.classList.toggle('escondido', favoritos.length > 0);
  estadoFavoritos.textContent = 'Você ainda não favoritou nenhum Pokémon. Busque um e clique em "Favoritar".';

  favoritos.forEach((fav) => {
    const extra = fav.dados_extra || {};
    const item = document.createElement('li');
    item.className = 'favorito';

    const img = document.createElement('img');
    img.src = extra.imagem || '';
    img.alt = formatarNome(fav.nome_item);
    img.loading = 'lazy';

    const info = document.createElement('div');
    info.className = 'favorito-info';
    const nome = document.createElement('strong');
    nome.textContent = formatarNome(fav.nome_item);
    const detalhe = document.createElement('span');
    detalhe.textContent = `#${String(extra.id || 0).padStart(3, '0')} · ${(extra.tipos || []).join(', ')}`;
    info.append(nome, detalhe);

    const ver = document.createElement('button');
    ver.type = 'button';
    ver.className = 'favorito-ver';
    ver.textContent = 'Ver';
    ver.addEventListener('click', () => {
      campoBusca.value = fav.nome_item;
      buscarPokemon(fav.nome_item);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const excluir = document.createElement('button');
    excluir.type = 'button';
    excluir.className = 'favorito-excluir';
    excluir.setAttribute('aria-label', `Remover ${formatarNome(fav.nome_item)} dos favoritos`);
    excluir.textContent = '✕';
    excluir.addEventListener('click', () => removerFavorito(fav.id));

    item.append(img, info, ver, excluir);
    listaFavoritos.append(item);
  });
}

botaoFavoritar.addEventListener('click', async () => {
  if (!pokemonAtual || jaFavoritado()) return;
  botaoFavoritar.disabled = true;
  const ok = await salvarFavorito(pokemonAtual.nome, pokemonAtual.extra);
  msgFavorito.textContent = ok ? 'Salvo no banco de dados!' : 'Erro ao salvar. Veja o console (F12).';
  await listarFavoritos();
});

listarFavoritos();

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