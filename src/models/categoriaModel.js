const createCrudModel = require('./crudModelFactory');

module.exports = createCrudModel({
    table: 'categorias',
    primaryKey: 'id_categoria',
    writableColumns: ['nome'],
    defaultOrderBy: 'id_categoria'
});
