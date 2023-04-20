# Projeto Talker Manager

## Contexto

Este projeto é uma aplicação de cadastro de talkers (palestrantes) em que será possível cadastrar, visualizar, pesquisar, editar e excluir informações.
<br />

<details>
  <summary><strong>👨‍💻 O que foi desenvolvido</strong></summary><br />

Foi desenvolvido uma API de um CRUD (Create, Read, Update e Delete) de palestrantes (talkers) e

alguns endpoints que podem ler e escrever em um arquivo utilizando o módulo _fs_:

- endpoint GET /talker
- endpoint GET /talker/:id
- endpoint POST /login
- endpoint POST /talker
- endpoint PUT /talker/:id
- endpoint DELETE /talker/:id
- endpoint GET /talker/search?q=searchTerm

</details><br />

<details>
  <summary><strong>Habilidades</strong></summary><br />

O conjunto de operações conhecido como CRUD (Create, Read, Update e Delete) constituem a forma mais básica de manipular dados. Apesar disso, boa parte das aplicações de mercado giram em torno dessas quatro operações. Neste projeto, foi implementado essas operações utilizando Node.js, express e o módulo fs.
</details><br />

## Executando aplicação

<details>
  <summary><strong>:whale: Rodando no Docker vs Localmente</strong></summary><br />
  
  ## Com Docker
 
  > Rode o serviço `node` com o comando `docker-compose up -d`.
  - Esse serviço irá inicializar um container chamado `talker_manager`.
  - A partir daqui você pode rodar o container via CLI ou abri-lo no VS Code.

  > Use o comando `docker exec -it talker_manager bash`.
  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

  > Instale as dependências com `npm install`

  > Execute a aplicação com `npm start` ou `npm run dev`

  ---
  
  ## Sem Docker
  
  > Instale as dependências com `npm install`

  - Para rodar o projeto desta forma, **obrigatoriamente** você deve ter o `node` instalado em seu computador.

</details>