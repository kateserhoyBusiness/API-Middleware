const createCrudController = require('./crudControllerFactory');
const Categoria = require('../models/categoriaModel');

module.exports = createCrudController({
    model: Categoria,
    entityName: 'Categoria',
    getId: (req) => req.params.id
});
