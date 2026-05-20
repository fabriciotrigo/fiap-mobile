# 📱 Blog Educacional Mobile
## Tech Challenge - Fase 4 - Pós Tech FIAP - 7FSDT

Aplicação "frontend mobile" desenvolvida em React Native com a utilização de Expo Router.

O sistema, por meio da utilização dos endpoints desenvolvidos na fase 2 (backend), permite aos Professores o gerenciamento de postagens e usuários. Enquanto, os Alunos, apenas podem se cadastrar no sistema e visualizar as postagens

| Nível | Tipo        | Postagens              | Usuários                      |
|-------|-------------|------------------------|-------------------------------|
|   1   | Professor   | Criar, editar, excluir | Criar, alterar nível, excluir |
|   2   | Aluno       | Visualizar             | Cadastrar-se                  |

---

# 🚀 Tecnologias utilizadas

- React Native → utilizado para desenvolver a interface mobile multiplataforma (Android/iOS).
- Expo → utilizado para facilitar a execução, build e desenvolvimento do app React Native.
- Expo Router → utilizado para gerenciar a navegação entre telas utilizando rotas baseadas em arquivos.
- Axios → utilizado para realizar requisições HTTP para a API backend.
- JWT → utilizado para autenticação e controle de acesso dos usuários.
- AsyncStorage → utilizado para armazenar localmente token JWT e dados do usuário.
- React Context → utilizado para compartilhar globalmente informações de autenticação e usuário logado.
- Ionicons → utilizado para exibir ícones na interface da aplicação.

---

# 📂 Estrutura do projeto

```
. 
├── mobile/ 
│   ├── .vscode/  
│   │   ├── extensions.json
│   │   └── settings.json
│   ├── app/  
│   │   ├── (tabs)/
│   │   │   ├── _layout.tsx
│   │   │   ├── criar.tsx
│   │   │   ├── postagens.tsx
│   │   │   └── usuarios.tsx
│   │   ├── editar/
│   │   │   └── [id].tsx
│   │   ├── _layout.tsx
│   │   ├── index.tsx
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── assets/
│   │   └── images/
│   ├── components/
│   │   └── shared/
│   │       └── Header.tsx
│   ├── src/  
│   │   ├── contexts/
│   │   │   └── AuthContext.tsx
│   │   └── services/
│   │       ├── api.ts
│   │       └── auth.ts
│   ├── .env.example
│   ├── .gitignore
│   ├── app.json
│   ├── eslint.config.js
│   ├── package-lock.json
│   ├── package.json
│   └── tsconfig.json
└── README.md 
```

---

# 🔐 Funcionalidades

## 👨‍🎓 Aluno

- Login
- Cadastro
- Visualização de postagens
- Pesquisa de postagens

## 👨‍🏫 Professor

- Todas as funcionalidades do aluno
- Criar postagens
- Editar postagens
- Excluir postagens
- Criar novos usuários
- Alterar nível de usuários
- Excluir usuários

---

# 🔑 Autenticação

A autenticação é realizada utilizando JWT.

O token é armazenado localmente utilizando AsyncStorage.

---

# 📱 Navegação

A aplicação utiliza:

- Stack Navigation
- Bottom Tabs Navigation

através do Expo Router.

---

# ▶️ Como executar o projeto

## Baixar o projeto no GitHub

```bash
git clone https://github.com/fabriciotrigo/fiap-mobile.git
cd fiap-mobile
cd mobile
```

## Instalar dependências

```bash
npm install
npx expo start
```

## ⚙️ Backend

O frontend consome uma API REST que estará rodando, por exemplo, na porta 3000 e será responsável por:

- autenticar usuários
- gerenciamento de usuários
- gerenciamento de postagens

Portanto, é necessário criar um arquivo ".env" na raíz do projeto conforme exemplificado no arquivo ".env.example":

```bash
EXPO_PUBLIC_API_URL=http://XXX.XX.XXX.X:3000
```

Esse deverá conter o endereço IP da máquina que está executando o backend.

# 👨‍💻 Autor

Fabrício Boschette Trigo - RM368000