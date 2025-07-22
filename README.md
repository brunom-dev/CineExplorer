# CineExplorer 🎬

![Capa do CineExplorer](URL_DA_SUA_IMAGEM_DE_CAPA_AQUI)

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite">
</p>

## Acesso ao Projeto

**O projeto está no ar! Você pode acessá-lo através do link abaixo:**

🔗 **[Clique aqui para ver o CineExplorer funcionando!](COLOQUE_O_LINK_DO_DEPLOY_AQUI)**

---

## Sobre o Projeto

**CineExplorer** é uma aplicação web moderna para a descoberta de filmes e séries de televisão. Utilizando a API do [The Movie Database (TMDb)](https://www.themoviedb.org/), o projeto oferece uma interface rica e interativa, similar às grandes plataformas de streaming.

Este projeto foi construído como um case completo de desenvolvimento front-end, demonstrando a criação de uma Single-Page Application (SPA) robusta, desde a configuração inicial até a otimização de performance e UX.

---

## Principais Funcionalidades

* **Página Inicial Dinâmica:** Exibe listas de filmes em alta e séries populares.
* **Página de Detalhes Genérica:** Uma única página que se adapta para mostrar informações detalhadas tanto de filmes quanto de séries.
* **Busca em Tempo Real:** Barra de busca no header com "debouncing" para performance, exibindo resultados em um dropdown.
* **Responsividade Completa:** Experiência de usuário otimizada para desktop e mobile, incluindo um menu lateral (sidebar) para navegação em telas menores.
* **Visualização de Trailers:** Modal interativo para assistir a trailers diretamente na aplicação.

---

## Telas da Aplicação

<p align="center">
  <strong>Desktop</strong><br>
  <img src="COLOQUE_A_URL_DO_SEU_PRINT_DA_HOME_AQUI" width="80%" alt="Tela da Home Page no Desktop">
</p>
<p align="center">
  <strong>Mobile (Menu e Busca)</strong><br>
  <img src="COLOQUE_A_URL_DO_SEU_PRINT_MOBILE_AQUI" width="40%" alt="Tela Mobile com Menu Aberto">
</p>

---

## Tecnologias Utilizadas

* **React:** Biblioteca principal para a construção da interface.
* **TypeScript:** Para tipagem estática e segurança do código.
* **Vite:** Ferramenta de build extremamente rápida para o desenvolvimento.
* **Tailwind CSS:** Framework de estilização "utility-first" para a criação do layout.
* **React Router DOM:** Para gerenciamento de rotas e navegação.
* **Lucide React:** Biblioteca de ícones SVG.
* **Axios:** Cliente HTTP para fazer as chamadas à API do TMDb.

---

## Como Rodar o Projeto Localmente

Siga os passos abaixo para executar o CineExplorer na sua máquina.

**Pré-requisitos:**
* [Node.js](https://nodejs.org/en/) (versão 18 ou superior)
* [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

```bash
# 1. Clone o repositório
git clone [https://github.com/brunom-dev/cine-explorer.git](https://github.com/brunom-dev/cine-explorer.git)

# 2. Navegue até a pasta do projeto
cd cine-explorer

# 3. Instale as dependências
npm install

# 4. Crie o arquivo de variáveis de ambiente
# Crie um arquivo chamado .env na raiz do projeto e adicione sua chave da API do TMDb
echo "VITE_TMDB_API_KEY=SUA_CHAVE_DA_API_AQUI" > .env

# 5. Rode o projeto em modo de desenvolvimento
npm run dev
```

Abra [http://localhost:5173](http://localhost:5173) (ou a porta que aparecer no seu terminal) para visualizar o projeto.

## Contato

Bruno Macedo

* [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/brunom-dev)
* [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/bruno-macedo-dev/)

---

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
