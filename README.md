# Let me Ask

Aplicação criada durante o evento Next Level Week da Rocketseat, na trilha React, ministrado por Diego Fernandes. Como fiz essa aula após aproximadamente um ano do seu lançamento, alguns pacotes estão em uma versão diferente do que foi ensinado em aula.

Layout realizado por Rebecca Gonzalez, [nesse link do Figma](https://www.figma.com/community/file/1009824839797878169).

## Para rodar o projeto

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

