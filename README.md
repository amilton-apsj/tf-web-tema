# Tralaleros Tun Tun Sahur - 3° Informática A

## 👥 Integrantes

- Amilton Pôrto dos Santos Júnior — [GitHub](https://github.com/amilton-apsj)
- Felipe Neres Silva — [GitHub](https://github.com/fns9-del)
- Marx Hugo Alves Rocha — [GitHub](https://github.com/mhar-Marx)
- Tharcísio Wilker Machado Fernandes — [GitHub](https://github.com/tharcisiowilker)
- Vitor Eduardo Batista Bagetti Ramalho — [GitHub](https://github.com/vebbr-lgtm)

---

# 🥗 Cardápio Escolar API

API REST para gerenciamento e divulgação das refeições escolares, permitindo a consulta transparente de cardápios e reduzindo o desperdício de alimentos.

## 🚀 Em produção

https://cardapio-escolar-backend.vercel.app

## 🛠️ Stack

- **Node.js + Express** (ES Modules)
- **Prisma ORM + PostgreSQL** (Neon Database)
- **Autenticação:** JWT (JSON Web Token) + `bcryptjs`
- **Ferramentas de Teste:** Bruno CLI

---

## 1. Descrição do Domínio

### Tema do sistema
O sistema tem como tema o **Cardápio Escolar**, uma aplicação voltada para a divulgação e o gerenciamento das refeições oferecidas pela escola aos alunos.

### Usuários
- **Nutricionistas / Gestores**: Responsáveis por cadastrar, atualizar e gerenciar os cardápios, categorias, restrições e itens alimentares.
- **Alunos**: Consultam o cardápio diariamente para saber as refeições disponíveis e detalhes de composição ou restrições alimentares.

### Problema que o sistema resolve
A falta de informação prévia sobre o cardápio leva ao desperdício de comida no refeitório escolar. O sistema disponibiliza o cardápio de forma antecipada para que os alunos tomem decisões conscientes sobre o consumo.

---

## 2. Modelo Conceitual e Lógico

### Diagrama Mermaid do Banco de Dados

```mermaid
erDiagram
    Nutricionista ||--o{ Cardapio : "cadastra"
    Categoria ||--o{ ItemCardapio : "agrupa"
    Cardapio }|--|{ ItemCardapio : "possui"
    Restricao }|--|{ ItemCardapio : "aplica-se"

    Nutricionista {
        Int id PK
        String nome
        String crn UK
        String email UK
        String senhaHash
        DateTime criadoEm
        DateTime atualizadoEm
    }

    Cardapio {
        Int id PK
        DateTime data
        String tipo_refeicao
        String horario_inicio
        String horario_fim
        Int nutricionistaId FK
        DateTime criadoEm
        DateTime atualizadoEm
    }

    Categoria {
        Int id PK
        String nome UK
        DateTime criadoEm
        DateTime atualizadoEm
    }

    Restricao {
        Int id PK
        String nome UK
        DateTime criadoEm
        DateTime atualizadoEm
    }

    ItemCardapio {
        Int id PK
        String nome_alimento
        Int categoriaId FK
        DateTime criadoEm
        DateTime atualizadoEm
    }
```

## 📑 Endpoints

Documentação completa das rotas em [`docs/API.md`](./docs/API.md).

| Método | Rota | Auth / Permissão | Descrição |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/login` | — | Autenticação do nutricionista |
| `GET` | `/cardapios` | — | Lista todos os cardápios (Público) |
| `GET` | `/cardapios/:id` | — | Busca cardápio por ID (Público) |
| `POST` | `/cardapios` | 🔒 Token | Cadastra novo cardápio |
| `PUT` | `/cardapios/:id` | 🔒 Token (Dono / ADMIN) | Atualiza cardápio existente |
| `DELETE` | `/cardapios/:id` | 🔒 Token (Dono / ADMIN) | Remove cardápio |

---

## 💻 Como rodar localmente

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/amilton-apsj/tf-web-tema.git](https://github.com/amilton-apsj/tf-web-tema.git)
   cd tf-web-tema

   DATABASE_URL="postgresql://usuario:senha@localhost:5432/cardapio_db"
   JWT_SECRET="sua_chave_secreta_aqui"

   npx prisma migrate dev
   npx prisma db seed
   npm run dev

## Credenciais do seed (Ambiente Local)

- `nutri@escola.br` / `senha123` (Nutricionista)