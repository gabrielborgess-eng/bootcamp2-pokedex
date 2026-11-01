const {
  validarEntrada,
  normalizarTermo,
  formatarNome,
  formatarNumero,
  formatarAltura,
  formatarPeso,
  jaFavoritado,
} = require('./utils');

describe('validarEntrada', () => {
  test('rejeita entrada vazia ou só com espaços', () => {
    expect(validarEntrada('')).toBe(false);
    expect(validarEntrada('   ')).toBe(false);
  });

  test('aceita nome ou número do Pokémon', () => {
    expect(validarEntrada('pikachu')).toBe(true);
    expect(validarEntrada('25')).toBe(true);
  });

  test('rejeita valores que não são texto', () => {
    expect(validarEntrada(undefined)).toBe(false);
    expect(validarEntrada(null)).toBe(false);
  });
});

describe('normalizarTermo', () => {
  test('converte para minúsculas e remove espaços nas pontas', () => {
    expect(normalizarTermo('  Pikachu ')).toBe('pikachu');
  });
});

describe('formatadores', () => {
  test('troca hífen por espaço no nome', () => {
    expect(formatarNome('mr-mime')).toBe('mr mime');
  });

  test('formata o número da Pokédex com 3 dígitos', () => {
    expect(formatarNumero(6)).toBe('#006');
    expect(formatarNumero(25)).toBe('#025');
    expect(formatarNumero(1025)).toBe('#1025');
  });

  test('converte altura de decímetros para metros', () => {
    expect(formatarAltura(4)).toBe('0.4 m');
    expect(formatarAltura(17)).toBe('1.7 m');
  });

  test('converte peso de hectogramas para quilos', () => {
    expect(formatarPeso(60)).toBe('6.0 kg');
    expect(formatarPeso(905)).toBe('90.5 kg');
  });
});

describe('jaFavoritado', () => {
  const lista = [{ nome_item: 'pikachu' }, { nome_item: 'charizard' }];

  test('encontra um Pokémon que já está na lista', () => {
    expect(jaFavoritado(lista, 'pikachu')).toBe(true);
  });

  test('não encontra um Pokémon que não está na lista', () => {
    expect(jaFavoritado(lista, 'bulbasaur')).toBe(false);
    expect(jaFavoritado([], 'pikachu')).toBe(false);
  });
});
