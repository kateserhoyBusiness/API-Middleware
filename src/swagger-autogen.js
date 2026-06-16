const swaggerAutogen = require('swagger-autogen')();
const path = require('path');

const doc = {
  info: {
    title: 'API criada com autogen pelo Kaio:)',
    version: '1.6.9',
    description: 'API gerada por swagger-autogen'
  },
  host: 'localhost:3000',
  schemes: ['http']
};

const outputFile = path.join(__dirname, 'swagger_output.json');
const endpointsFiles = [
  path.join(__dirname, 'app.js'),
  path.join(__dirname, 'routes', '*.js'),
  path.join(__dirname, 'controllers', '*.js')
];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./app.js');
});
