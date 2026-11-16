# GameDex — Catálogo de Jogos

Aplicativo mobile para montar e gerenciar um catálogo pessoal de jogos. Ele foi desenvolvido com **Expo (React Native)** e usa o **PocketBase** como backend REST.

Com o app, o usuário faz login, lista os jogos cadastrados e pode adicionar, editar e excluir registros. Os dados ficam salvos no servidor remoto. A sessão continua ativa mesmo depois de fechar o app.

> A explicação completa de como cada requisito foi implementado está em **[DOCUMENTACAO.md](DOCUMENTACAO.md)**.

---

## Funcionalidades

- **Login** com e-mail e senha, feito pela API do PocketBase
- **Sessão persistente**: o token fica salvo no AsyncStorage, e o app volta direto para a área logada
- **Listagem de jogos** com `FlatList`, "puxar para atualizar" e um aviso amigável quando a lista está vazia
- **Cadastro** de jogos com formulário validado
- **Edição** de jogos existentes
- **Exclusão**, com pedido de confirmação antes
- **Indicador de carregamento** em todas as requisições
- **Mensagens de erro** em português para falhas de rede e da API (funcionam no celular e na web)
- **Identidade visual própria**, com interface em tons escuros e destaques em roxo

## Tecnologias

| Tecnologia | Uso |
| --- | --- |
| [Expo SDK 58](https://docs.expo.dev/) / React Native 0.88 | Base do app |
| [Expo Router](https://docs.expo.dev/router/introduction/) | Navegação por arquivos e rotas protegidas |
| Context API (React) | Estado global de autenticação |
| [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) | Persistência local da sessão |
| [Axios](https://axios-http.com/) | Requisições HTTP (GET, POST, PATCH, DELETE) |
| [PocketBase](https://pocketbase.io/) | Backend REST e banco de dados |
| [Jest](https://jestjs.io/) + [Testing Library](https://callstack.github.io/react-native-testing-library/) | Testes unitários |
| TypeScript | Tipagem estática |

---

## Como rodar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) 20 ou superior
- [Yarn](https://classic.yarnpkg.com/) (o projeto usa `yarn.lock`)
- [PocketBase](https://pocketbase.io/docs/) (baixe o executável para o seu sistema)
- App **Expo Go** no celular, um emulador ou um navegador

### 1. Clonar e instalar

```bash
git clone https://github.com/LucasXRosas/Pratica-de-Implementacao-2.git
cd Pratica-de-Implementacao-2
yarn install
```

### 2. Subir o PocketBase

Na pasta onde está o executável do PocketBase:

```bash
./pocketbase serve
# Para acessar pelo celular na mesma rede Wi-Fi:
./pocketbase serve --http=0.0.0.0:8090
```

Abra o painel administrativo em `http://127.0.0.1:8090/_/` e crie a conta de administrador.

### 3. Configurar o banco

**a) Criar um usuário:** na coleção **users**, que já vem pronta, cadastre um usuário com e-mail e senha. A senha precisa ter pelo menos 8 caracteres.

**b) Criar a coleção `jogos`:** use o tipo **Base** e adicione estes campos:

| Campo        | Tipo   | Obrigatório |
| ------------ | ------ | ----------- |
| `titulo`     | Text   | sim         |
| `genero`     | Text   | sim         |
| `plataforma` | Text   | sim         |
| `ano`        | Number | sim         |
| `nota`       | Number | não ¹       |
| `descricao`  | Text   | não         |

¹ No PocketBase, um campo Number obrigatório rejeita o valor `0`. Deixe `nota` como opcional; o próprio app já exige que ela seja preenchida.

**c) Liberar o acesso só para usuários logados:** na aba **API Rules** da coleção `jogos`, preencha as 5 regras (List, View, Create, Update e Delete) com:

```
@request.auth.id != ""
```

### 4. Configurar o endereço da API

Copie o arquivo de exemplo:

```bash
cp .env.example .env
```

Depois, ajuste `EXPO_PUBLIC_API_URL` conforme onde o app vai rodar:

| Onde o app roda | Valor |
| --- | --- |
| Navegador / Simulador iOS | `http://127.0.0.1:8090` (padrão) |
| Emulador Android | `http://10.0.2.2:8090` |
| Celular físico (Expo Go) | `http://<IP-do-seu-PC>:8090` |

### 5. Iniciar o app

```bash
npx expo start -c
```

Para abrir o app, escaneie o QR Code com o Expo Go, aperte `a` (Android), `i` (iOS) ou `w` (web).

---

## Scripts

| Comando | Descrição |
| --- | --- |
| `yarn start` | Inicia o servidor de desenvolvimento |
| `yarn test` | Roda os testes unitários (Jest) |
| `yarn lint` | Verifica o código com ESLint |
| `yarn typecheck` | Verifica os tipos com TypeScript |

## Estrutura de pastas

```
src/
├── app/                      # Rotas (Expo Router): cada arquivo é uma tela
│   ├── _layout.tsx           # Provider de autenticação + rotas protegidas
│   ├── (auth)/login.tsx      # Fluxo público: tela de login
│   └── (app)/                # Fluxo restrito (precisa estar logado)
│       ├── index.tsx         # Lista de jogos + exclusão
│       └── jogos/
│           ├── novo.tsx      # Cadastro
│           └── [id].tsx      # Edição
├── contexts/AuthContext.tsx  # Estado global de autenticação
├── services/                 # Axios e chamadas à API
├── components/               # Componentes reutilizáveis (cada um com seu styles.ts)
├── styles/                   # Estilos das telas
├── utils/                    # Validação, erros, alertas e formatação
├── theme/                    # Cores, espaçamentos e tamanhos de fonte
├── types/                    # Tipos TypeScript
└── __tests__/                # Testes unitários
```

## Licença

Distribuído sob a licença presente no arquivo [LICENSE](LICENSE).
