const createCrudController = require('./crudControllerFactory');
const Pedido = require('../models/pedidoModel');

module.exports = createCrudController({
    model: Pedido,
    entityName: 'Pedido',
    getId: (req) => req.params.id
});
