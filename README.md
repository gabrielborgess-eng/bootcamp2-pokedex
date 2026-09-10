# PokeBusca

## Autor

**Nome completo:** substitua pelo seu nome — **Matrícula:** substitua pela sua matrícula

## Descrição

O PokeBusca é uma Pokédex online que permite pesquisar um Pokémon pelo nome ou número. A aplicação consulta a PokéAPI e apresenta informações úteis como imagem, número, tipos, altura, peso e habilidade principal.

Este projeto foi desenvolvido para a Etapa 01 do Bootcamp, utilizando HTML, CSS e JavaScript puro.

## API utilizada

- **Nome:** PokéAPI
- **Documentação:** [https://pokeapi.co/docs/v2](https://pokeapi.co/docs/v2)
- **Endpoint consumido:** `https://pokeapi.co/api/v2/pokemon/{nome-ou-numero}`
- **Autenticação:** não é necessária

## Funcionalidades

- Busca de Pokémon por nome ou número;
- Consulta assíncrona usando `fetch`;
- Exibição da imagem oficial, nome, número, tipos, altura, peso e habilidade;
- Botões com exemplos de busca rápida;
- Mensagem de carregamento durante a consulta;
- Mensagem amigável quando o Pokémon não é encontrado;
- Layout responsivo para computador e celular.

## Como executar localmente

1. Baixe ou clone este repositório:

   ```bash
   git clone URL_DO_REPOSITORIO
   ```

2. Entre na pasta do projeto:

   ```bash
   cd bootcamp2-pokedex
   ```

3. Abra o arquivo `index.html` no navegador.

   Também é possível usar a extensão **Live Server** no Visual Studio Code. Clique com o botão direito no arquivo `index.html` e selecione **Open with Live Server**.

> É necessário estar conectado à internet para a aplicação conseguir consultar a PokéAPI.

## Links

- **Aplicação no ar (GitHub Pages):** substitua este texto pelo link do seu GitHub Pages
- **Repositório:** substitua este texto pelo link do seu repositório público

## Estrutura do projeto

```text
bootcamp2-pokedex/
├── index.html   # estrutura da página
├── style.css    # estilos e responsividade
├── script.js    # busca na API e interação
└── README.md    # documentação do projeto
```

## Créditos

Os dados são fornecidos gratuitamente pela [PokéAPI](https://pokeapi.co/). Este projeto não possui vínculo oficial com a The Pokémon Company ou a Nintendo.
