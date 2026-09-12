PokeBusca

Autor

Nome completo: Gabriel Borges de Souza Santiago
Matrícula: 22607168

Descrição

O PokeBusca é uma aplicação web frontend que permite pesquisar informações sobre Pokémon pelo nome ou pelo número da Pokédex.

A aplicação consulta a PokéAPI e apresenta os dados de forma organizada, incluindo imagem, nome, número, tipos, altura, peso e habilidade principal. O projeto foi desenvolvido como atividade da Etapa 01 do Bootcamp de Frontend.

API utilizada

•
Nome: PokéAPI

•
Documentação: https://pokeapi.co/docs/v2

•
Endpoint utilizado: https://pokeapi.co/api/v2/pokemon/{nome-ou-numero}

•
Autenticação: não é necessária

•
Formato dos dados: JSON

Exemplo de consulta para o Pikachu:

Plain Text


https://pokeapi.co/api/v2/pokemon/pikachu



Exemplo de consulta usando o número da Pokédex:

Plain Text


https://pokeapi.co/api/v2/pokemon/25



Funcionalidades

•
Pesquisar um Pokémon pelo nome;

•
Pesquisar um Pokémon pelo número da Pokédex;

•
Aceitar alguns nomes comuns em português, como bulbassauro;

•
Exibir a imagem oficial do Pokémon;

•
Exibir o nome e o número do Pokémon;

•
Exibir os tipos do Pokémon;

•
Exibir a altura e o peso;

•
Exibir a habilidade principal;

•
Mostrar uma mensagem de carregamento durante a consulta;

•
Informar o usuário quando o Pokémon não for encontrado;

•
Possuir exemplos de busca rápida;

•
Funcionar em computadores e celulares.

Tecnologias utilizadas

•
HTML5;

•
CSS3;

•
JavaScript;

•
API REST;

•
PokéAPI;

•
Git e GitHub;

•
GitHub Pages.

Como executar localmente

1.
Faça o download ou clone este repositório:

Bash


git clone URL_DO_SEU_REPOSITORIO





2.
Abra a pasta do projeto no Visual Studio Code.

3.
Abra o arquivo index.html no navegador.

4.
Outra opção é instalar a extensão Live Server no VS Code. Depois da instalação, clique com o botão direito no arquivo index.html e escolha Open with Live Server.

5.
Digite no campo de busca um nome, como pikachu, ou um número, como 25.


É necessário estar conectado à internet, pois a aplicação busca os dados na PokéAPI.

Estrutura do projeto

Plain Text


pokedex/
├── index.html   # estrutura da página
├── style.css    # estilos, cores e responsividade
├── script.js    # busca na API e interações
└── README.md    # documentação do projeto



Histórico de desenvolvimento

O projeto foi desenvolvido em etapas utilizando Git, com commits que registram a evolução da aplicação:

1.
Criação da estrutura inicial da página;

2.
Adição dos estilos responsivos;

3.
Implementação da consulta à API com fetch;

4.
Criação da documentação do projeto;

5.
Completar as orientações de entrega e identificação do projeto.

Links

•
Aplicação publicada no GitHub Pages: COLE_AQUI_O_LINK_DO_GITHUB_PAGES

•
Repositório público no GitHub: COLE_AQUI_O_LINK_DO_REPOSITORIO

Créditos

Os dados utilizados nesta aplicação são fornecidos gratuitamente pela PokéAPI.

Este projeto é apenas educacional e não possui vínculo oficial com a Nintendo, a The Pokémon Company ou qualquer empresa relacionada à franquia Pokémon.

