const createCrudController = require('./crudControllerFactory');
const Cliente = require('../models/clienteModel');

module.exports = createCrudController({
    model: Cliente,
    entityName: 'Cliente',
    getId: (req) => req.params.id
});
