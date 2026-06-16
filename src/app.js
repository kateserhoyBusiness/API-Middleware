const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const conectarDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const produtoRoutes = require('./routes/produtoRoutes');

const app = express();

conectarDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/produtos', produtoRoutes);

/**
 * @swagger
 * /api/hello:
 *   get:
 *     summary: Retorna uma mensagem de saudação
 *     responses:
 *       200:
 *         description: Mensagem de boas-vindas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Olá, mundo!
 */
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Olá, mundo!' });
});

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SwaggerAutoOLK',
      version: '1.0.0',
      description: 'Exemplo de API básica com Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: [path.join(__dirname, 'app.js')],
};

let swaggerSpecs;
try {
  swaggerSpecs = require(path.join(__dirname, 'swagger_output.json'));
} catch (err) {
  swaggerSpecs = swaggerJsdoc(swaggerOptions);
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});