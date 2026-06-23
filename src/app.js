const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const express = require('express');
const fs = require('fs');
const swaggerUi = require('swagger-ui-express');
const conectarDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const clienteRoutes = require('./routes/clienteRoutes');
const enderecoRoutes = require('./routes/enderecoRoutes');
const pedidoRoutes = require('./routes/pedidoRoutes');
const produtoPedidoRoutes = require('./routes/produtoPedidoRoutes');

const app = express();

conectarDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/produtos', produtoRoutes);
app.use('/categorias', categoriaRoutes);
app.use('/clientes', clienteRoutes);
app.use('/enderecos', enderecoRoutes);
app.use('/pedidos', pedidoRoutes);
app.use('/produtos-pedidos', produtoPedidoRoutes);

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Ola, mundo!' });
});

app.use('/api-docs', (req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

app.get('/api-docs/swagger.json', (req, res) => {
  res.json(JSON.parse(fs.readFileSync(path.join(__dirname, 'swagger_output.json'), 'utf8')));
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, {
  swaggerOptions: {
    url: '/api-docs/swagger.json?v=2'
  }
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
