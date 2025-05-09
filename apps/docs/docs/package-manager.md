---
sidebar_position: 3
---

# Package Manager

## Por que usamos PNPM

Para gerenciar as dependências do monorepo do projeto Gêmeo Digital, escolhemos o [PNPM](https://pnpm.io/) como gerenciador de pacotes. Ele oferece uma série de vantagens em relação a alternativas como npm ou yarn, especialmente em ambientes com múltiplos pacotes e bibliotecas de grande porte.

## Vantagens do PNPM

- ⚡ **Desempenho superior**: instalações de pacotes mais rápidas graças ao uso de cache e links simbólicos.
- 💾 **Eficiência no uso de espaço em disco**: os pacotes são armazenados de forma global e compartilhada entre projetos.
- 🧩 **Workspaces nativos**: ideal para monorepos, permitindo o gerenciamento centralizado de dependências entre múltiplos pacotes.
- ✅ **Consistência entre ambientes**: o arquivo `pnpm-lock.yaml` garante que todos os desenvolvedores utilizem as mesmas versões de dependências.
- 🧱 **Excelente suporte para bibliotecas pesadas**: o PNPM lida de forma eficiente com bibliotecas grandes e complexas, como o `@arcgis/core`, evitando instalações lentas e problemas com uso excessivo de disco.

---

## Como instalar o PNPM

### 1. Pré-requisitos

Antes de instalar o PNPM, verifique se você tem o **Node.js** instalado (recomenda-se a versão LTS mais recente).

Verifique a versão do Node.js:

```bash
node -v
```

### 2. Instalação do PNPM

Usando npm:
```bash
npm install -g pnpm
```

Usando corepack (Node.js 16.10+):
```bash
corepack enable
corepack prepare pnpm@latest --activate
```

### 3. Instalando as dependências do projeto

Após clonar este repositório, execute o seguinte comando na raiz do projeto para instalar todas as dependências:
```bash
pnpm install
```

Esse comando irá:
- Instalar todas as dependências listadas nos pacotes e aplicações.
- Criar links entre os pacotes internos definidos nos workspaces.
- Garantir que as versões utilizadas estejam sincronizadas com o arquivo de lock (pnpm-lock.yaml).

## Comandos Úteis

Este documento lista os principais comandos disponíveis na raiz do monorepo do projeto Gêmeo Digital. Eles foram definidos para facilitar o desenvolvimento, build e manutenção das diferentes partes do projeto.

### Scripts disponíveis

| Comando                    | Descrição                                                                 |
|----------------------------|---------------------------------------------------------------------------|
| `dev`                | Inicia simultaneamente o frontend e o backend em modo desenvolvimento.     |
| `packages:build`     | Compila o pacote compartilhado utilizado pelas aplicações.                |
| `docs:start`         | Inicia o servidor de desenvolvimento da aplicação de documentação.        |
| `docs:build`         | Gera a versão de produção da documentação.                                |

### Como executar

Todos os comandos abaixo devem ser executados a partir da raiz do repositório:

```bash
pnpm <nome-do-comando>
```

Com o uso do PNPM, conseguimos manter o ambiente de desenvolvimento leve, rápido e escalável, mesmo com bibliotecas exigentes como o @arcgis/core, tornando o fluxo de trabalho mais eficiente e confiável.