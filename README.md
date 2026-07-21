# Catalogo Produtos API

API REST em Node.js/Express usando MySQL para o banco `loja`.

## Banco de dados

O projeto foi migrado de MongoDB/NoSQL para MySQL. A conexao usa `mysql2/promise` e le as variaveis do arquivo `src/.env`.

Crie o banco e as tabelas com:

```bash
mysql -u root -p < database/loja.sql
```

## Configuracao

Crie ou ajuste `src/.env`:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=loja
JWT_SECRET=sua_chave_secreta_aqui
```

## Instalacao e execucao

A partir da raiz do projeto, rode:

```bash
npm install
npm start
```

Se quiser desenvolvimento com reinicializacao automatica:

```bash
npm run dev
```

Documentacao Swagger:

```text
http://localhost:3000/api-docs
```

## Endpoints

Autenticacao:

- `POST /auth/registrar`
- `POST /auth/login`

Rotas protegidas por JWT:

- `GET|POST /produtos`
- `GET|PUT|DELETE /produtos/:id`
- `GET|POST /categorias`
- `GET|PUT|DELETE /categorias/:id`
- `GET|POST /clientes`
- `GET|PUT|DELETE /clientes/:id`
- `GET|POST /enderecos`
- `GET|PUT|DELETE /enderecos/:id`
- `GET|POST /pedidos`
- `GET|PUT|DELETE /pedidos/:id`
- `GET|POST /produtos-pedidos`
- `GET|PUT|DELETE /produtos-pedidos/:produtoId/:pedidoId`

Use o token retornado no login:

```http
Authorization: Bearer SEU_TOKEN
```

## Exemplos de JSON

Produto:
```json
{
  "nome": "Camiseta",
  "valor": 59.9,
  "estoque": 10,
  "categoria": "Roupas"
}
```

Cliente:

```json
{
  "nome": "Joao",
  "telefone": "11999999999",
  "status": "medio"
}
```

Pedido:

```json
{
  "data": "2026-06-23",
  "clientes_id_cliente": 1
}
```

Produto do pedido:

```json
{
  "produtos_id_produto": 1,
  "pedidos_id_pedido": 1,
  "quantidade": 2,
  "valor": 59.9
}
```
