# Aplicação Back-end para servir ao Gêmeo Digital da Cidade de Niterói

Esta aplicação tem como objetivo servir as informações necessárias ao client para a visualização de dados atualizados da cidade.

## Tecnologias

- Express.js
- TypeScript
- Axios
- PNPM (gerenciador de pacotes)
- Zod
- Jest
- Supertest
- Winston

Levando em consideração que uma arquitetura event-driven onde o backend atuaria como um publicador de eventos seria a ideal para a atualização constante de informações, REST foi escolhida inicialmente por adicionar menos complexidade ao projeto.

## Endpoints

- /api/bus: Retorna as informações sobre viagens de ônibus e sua geolocalização. 

## Requisitos

- Node.js (versão 22 ou superior)
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
4. Espere a mensagem de confirmação no console