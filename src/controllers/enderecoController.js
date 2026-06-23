const createCrudController = require('./crudControllerFactory');
const Endereco = require('../models/enderecoModel');

module.exports = createCrudController({
    model: Endereco,
    entityName: 'Endereco',
    getId: (req) => req.params.id
});
