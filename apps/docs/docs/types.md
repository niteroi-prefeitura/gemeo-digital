---
sidebar_position: 4
---

# Validação e Tipagem

## Zod + TypeScript

Neste projeto, adotamos a biblioteca [Zod](https://zod.dev/) para realizar a validação de dados de forma segura, declarativa e totalmente integrada com o TypeScript.

Zod está sendo utilizado em um pacote compartilhado dentro do monorepo, permitindo que os **schemas sejam reutilizados tanto no frontend quanto no backend**, garantindo **consistência, segurança e confiabilidade** na troca de informações entre as aplicações.

---

## Motivações para a escolha do Zod

- ✅ **Validação fortemente tipada**: Zod gera os tipos TypeScript a partir dos próprios schemas, evitando inconsistências entre definição e validação.
- 🔁 **Reutilização de schemas**: Como os schemas estão centralizados em um pacote compartilhado, é possível utilizar os mesmos modelos de dados nas camadas cliente e servidor.
- 🚫 **Menos redundância**: Não é necessário duplicar regras de validação nem definir tipos separados — o schema serve como contrato único.
- 📦 **Sem dependências externas pesadas**: Zod é leve, moderno e escrito em TypeScript puro, com ótima performance.
- 🔐 **Validação robusta e segura**: Impede que dados inválidos ou malformados sejam processados pela aplicação.

---

## Estrutura no Monorepo

Os schemas Zod estão localizados em um pacote compartilhado (`packages/shared/src/schemas`) e são utilizados pelas aplicações de frontend e backend:

```plaintext
/
├── apps/
│   ├── client/       # Usa os schemas do pacote compartilhado para validação no cliente
│   └── bff/        # Utiliza os mesmos schemas para validação de requisições, DTOs, etc.
├── packages/
│   └── shared/        
│       └── src/
│           └── schemas/       # Define todos os schemas com Zod
```

## Benefícios no contexto do projeto

- Maior confiabilidade entre aplicações que trocam dados (ex: frontend e backend).
- Redução de bugs causados por divergência de formatos ou validações manuais.
- Facilidade na manutenção, pois mudanças nos schemas impactam todos os consumidores de forma centralizada.
- A escolha do Zod fortalece a base do projeto ao unir tipagem estática, validação de dados e reuso de contratos, ajudando a manter o monorepo mais robusto, escalável e seguro.