## Matriz de Autorização

| Rota | Método | Acesso Permitido |
| :--- | :--- | :--- |
| `/auth/login` | `POST` | Público |
| `/cardapios` | `GET` | Público |
| `/cardapios/:id` | `GET` | Público |
| `/cardapios` | `POST` | Nutricionista (Bearer Token) |
| `/cardapios/:id` | `PUT` | Dono do cardápio ou ADMIN |
| `/cardapios/:id` | `DELETE`| Dono do cardápio ou ADMIN |