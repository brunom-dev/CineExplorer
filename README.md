# CineExplorer 🎬

![Capa do CineExplorer]("./docs/cover.png")

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite">
</p>

## 🚀 Acesso ao Projeto

**O projeto está no ar! Você pode acessá-lo através do link abaixo:**

🔗 <a href="https://cineexplorer.vercel.app/" target="_blank" rel="noopener noreferrer">**Clique aqui para ver o CineExplorer funcionando!**</a>

---

## 📖 Sobre o Projeto

**CineExplorer** é uma aplicação web moderna e responsiva para a descoberta e gestão de filmes e séries de televisão. Utilizando a API do [The Movie Database (TMDb)](https://www.themoviedb.org/) para dados de mídia e o **Firebase** para autenticação e banco de dados, o projeto oferece uma experiência rica e personalizada, similar às grandes plataformas de streaming.

Este projeto foi construído como um case completo de desenvolvimento front-end com funcionalidades de back-end (BaaS), demonstrando a criação de uma SPA (Single-Page Application) robusta, desde a configuração inicial até a otimização de performance e a implementação de um sistema de usuários completo.

---

## ✨ Principais Funcionalidades

* **Autenticação Completa:** Sistema de **Cadastro**, **Login**, **Redefinição de Senha** e **Verificação de E-mail** via Firebase.
* **Lista de Favoritos:** Utilizadores logados podem adicionar e remover filmes/séries da sua lista pessoal, com os dados salvos no Firestore.
* **Navegação e Rotas:**
    * **Roteamento Dinâmico:** Utiliza React Router para navegação fluida e URLs semânticas (ex: `/movie/:id`).
    * **Rotas Protegidas:** Páginas como "Meus Favoritos" só são acessíveis por utilizadores autenticados.
    * **Página 404 Personalizada.**
* **Interface Rica e Responsiva:**
    * **Página de Detalhes Genérica:** Um único componente que se adapta para mostrar informações detalhadas de filmes e séries.
    * **UI Polida:** Header "sticky", menu lateral (sidebar) para mobile, modal para trailer e design consistente em toda a aplicação.
* **Otimizações de UX e Performance:**
    * **Skeleton Loaders:** Animações de carregamento que imitam o layout final.
    * **Lazy Loading:** Carregamento "preguiçoso" de imagens para otimização da performance.
    * **Animações Sutis:** Efeitos de entrada nos cards e transições de página para uma experiência mais fluida.

---

## 📸 Telas da Aplicação

Aqui estão algumas telas que demonstram a aplicação em funcionamento.

<p align="center">
  <strong>Home Page e Página de Detalhes</strong><br>
  <img src="COLOQUE_A_URL_DO_SEU_PRINT_DA_HOME_AQUI" width="80%" alt="Tela da Home Page no Desktop">
  <img src="COLOQUE_A_URL_DO_SEU_PRINT_DOS_DETALHES_AQUI" width="80%" alt="Tela de Detalhes no Desktop">
</p>
<p align="center">
  <strong>Autenticação e Favoritos</strong><br>
  <img src="COLOQUE_A_URL_DO_SEU_PRINT_DA_PAGINA_DE_LOGIN_AQUI" width="45%" alt="Tela de Login">
  <img src="COLOQUE_A_URL_DO_SEU_PRINT_DA_LISTA_DE_FAVORITOS_AQUI" width="45%" alt="Tela de Favoritos">
</p>

---

## 💻 Tecnologias Utilizadas

* **Front-end:** React, TypeScript, Tailwind CSS, React Router DOM
* **Back-end (BaaS):** Firebase (Authentication & Firestore)
* **Animações:** AOS (Animate On Scroll)
* **Notificações:** Sonner (para toasts)
* **Ícones:** Lucide React
* **Build Tool:** Vite

---

## ⚙️ Como Rodar o Projeto Localmente

**Pré-requisitos:**
* [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
* Conta no [Firebase](https://firebase.google.com/) e no [TMDb](https://www.themoviedb.org/signup) para obter as chaves de API.

```bash
# 1. Clone o repositório
git clone [https://github.com/seu-usuario/cine-explorer.git](https://github.com/seu-usuario/cine-explorer.git)

# 2. Navegue até a pasta do projeto
cd cine-explorer

# 3. Instale as dependências
npm install

# 4. Crie e configure o arquivo de variáveis de ambiente
# Crie um arquivo chamado .env na raiz do projeto e adicione suas chaves
