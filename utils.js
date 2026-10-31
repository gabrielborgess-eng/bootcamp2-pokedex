// Funções puras do PokeBusca (sem acesso ao DOM, fáceis de testar).
// No navegador viram funções globais; no Node/Jest são exportadas via module.exports.

function validarEntrada(termo) {
  return typeof termo === 'string' && termo.trim().length > 0;
}

function normalizarTermo(termo) {
  return String(termo).toLowerCase().trim();
}

function formatarNome(nome) {
  return String(nome).replace(/-/g, ' ');
}

function formatarNumero(id) {
  return `#${String(id).padStart(3, '0')}`;
}

function formatarAltura(decimetros) {
  return `${(decimetros / 10).toFixed(1)} m`;
}

function formatarPeso(hectogramas) {
  return `${(hectogramas / 10).toFixed(1)} kg`;
}

function jaFavoritado(favoritos, nome) {
  return favoritos.some((fav) => fav.nome_item === nome);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    validarEntrada,
    normalizarTermo,
    formatarNome,
    formatarNumero,
    formatarAltura,
    formatarPeso,
    jaFavoritado,
  };
}
