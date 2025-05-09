---
sidebar_position: 2
---

# Repositório

## Por que usamos um Monorepo

Este projeto adota uma estrutura de **monorepo** para centralizar o desenvolvimento de todas as aplicações e pacotes relacionados ao Gêmeo Digital.

## Motivação

A decisão de unificar os projetos em um único repositório foi baseada nos seguintes benefícios:

- 🔁 **Reutilização de código**: facilita o compartilhamento de bibliotecas e utilitários internos entre diferentes aplicações.
- 🛠️ **Manutenção centralizada**: atualizações em dependências ou mudanças estruturais afetam todas as partes do sistema de forma coordenada.
- 🔍 **Melhor visibilidade do ecossistema**: todos os pacotes e aplicações estão no mesmo lugar, facilitando o entendimento do projeto como um todo.
- 🚀 **Deploys e CI/CD mais organizados**: pipelines podem ser configuradas com mais controle sobre dependências e versões interdependentes.

## Estrutura do Monorepo

```plaintext
/
├── apps/           # Aplicações principais (ex: frontend, backend, documentação)
├── packages/       # Bibliotecas internas compartilhadas (ex: zod)
├── .gitignore
├── package.json
├── pnpm-lock.yaml
└── pnpm-workspace.yaml