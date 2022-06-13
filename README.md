<h1 align="center">

  ![Let me ask](src/assets/images/logo.svg)

</h1>

Aplicação criada durante o evento Next Level Week da Rocketseat, na trilha React, ministrado por Diego Fernandes. Como fiz essa aula após aproximadamente um ano do seu lançamento, alguns pacotes estão em uma versão diferente do que foi ensinado em aula.

Layout realizado por Rebecca Gonzalez, [nesse link do Figma](https://www.figma.com/community/file/1009824839797878169).

## ✨ Tecnologias

Esse projeto foi desenvolvido usando as seguintes tecnologias:

- [React](https://reactjs.org/)
- [Firebase](https://firebase.google.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Sass](https://sass-lang.com/)

## 💻 Como executar

Após baixar ou clonar este repositório, basta instalar todas as suas dependências usando `npm install` ou `yarn add`. Não é possível utilizar esse projeto sem as chaves do Firebase.

Para ter o seu próprio projeto, é necessário criar uma conta no Firebase e criar um novo projeto para realizar [autenticação via Google](https://firebase.google.com/docs/auth/web/start?authuser=0&hl=pt#web-version-8) e [gerar um Realtime Database](https://firebase.google.com/docs/database/web/start?authuser=0&hl=pt#web-version-8). Com isso, é necessário criar um arquivo `.env.local` com as seguintes variáveis:

```JavaScript
firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "PROJECT_ID.firebaseapp.com",
  databaseURL: "https://DATABASE_NAME.firebaseio.com",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
  measurementId: "G-MEASUREMENT_ID",
};
```

A criação dessas variáveis é explicada na [documentação de primeiros passos do Firebase](https://firebase.google.com/docs/database/web/start?authuser=0&hl=pt#initialize_the_javascript_sdk), e é possível obter todas essas informações para um aplicativo criado dentro do projeto, nas configurações > Geral > Seus aplicativos (quando há uma aplicação selecionada)

Com as bibliotecas instaladas e as chaves do Firebase devidamente configuradas, basta executar `yarn start` ou `npm run start` para rodar a aplicação localmente.

## 👀 Para acessar o projeto

Você pode usar este app no link: https://letmeask-danicaus.vercel.app/

Esse link contém a aplicação que eu estou controlando com a minha conta no Firebase.

## 🤓 Diferenciais em relação à aula ("O próximo nível")

- Utilizadas versões com major mais atualizados das bibliotecas:
  - react e react-dom 18
  - react-router-dom 6
  - firebase 9
- O admin consegue remover as marcações de "respondido" e "destaque" na pergunta
- 

## 📢 Possíveis implementações futuras

- Logar com conta do Github e Twitter
- Deslogar
- Excluir pergunta feita
- Editar pergunta feita
- Modal de confirmação de deletar pergunta e encerrar sala
- Separar melhor página Home e NewRoom, tirando repetições
- Separar melhor página Room e AdminRoom, tirando repetições
- Responsividade
- PWA
- Tema dark e light
- Margem no bottom das páginas Room e AdminRoom
- Header fixo no topo da página, independente do scroll
- Alterar ordenação das perguntas quando marcadas pelo admin:
  - "answered" colocaria a pergunta em último lugar
  - "highlighted" colocaria a pergunta acima das outras
- Impedir de colocar mais de uma pergunta como highlighted. Se o admin tentar, tirar a que está em highlighted e colocar a pergunta clicada
- Quando a pessoa cria a sala, direcioná-la para a visão de admin
- Página com as salas onde a pessoa é admin
- Página com as salas que a pessoa fez perguntas
- Deixar que o user admin consiga alterar entre as versões user e admin
- Reorganizar as perguntas por ordem de quantidade de likes

## 📄 Licença

Esse projeto está sob licença MIT.

---

Feito com ❤ por Daniela Caus na NLW Together da Rocketseat