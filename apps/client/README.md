# Protótipo para gêmeo digital da cidade de Niterói

Este projeto tem como intenção viabilizar o conceito de gêmeo digital utilizando ferramentas do ecossistema ArcGIS em uma aplicação React.js.

## Tecnologias

O projeto tem como foco a biblioteca '@arcgis/core' que representa o SDK para Javascript disponibilizado pela esri para o ArcGIS Maps.
Levando em consideração o tamanho da biblioteca da esri e a performance desejada em ambientes de desenvolvimento, Vite e PNPM foram escolhidos.
TypeScript foi uma escolha padrão para a tipagem do JavaScript e confiança do código, React.js para ter uma SPA responsiva e dinâmica além do ecossistema maduro.

- React
- TypeScript
- Vite
- ArcGIS Maps SDK for JavaScript
- PNPM (gerenciador de pacotes)

## Requisitos
- Node.js (versão 20 ou superior)
- pnpm (você pode instalar com `npm install -g pnpm`)
[Documentação do pnpm](https://pnpm.io/installation)

## Como Iniciar

1. Clone este repositório
2. Instale as dependências:
   ```
   pnpm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```
   pnpm dev
   ```
4. Abra seu navegador em `http://localhost:5173/`
