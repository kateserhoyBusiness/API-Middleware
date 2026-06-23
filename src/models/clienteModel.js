const createCrudModel = require('./crudModelFactory');

module.exports = createCrudModel({
    table: 'clientes',
    primaryKey: 'id_cliente',
    writableColumns: ['nome', 'telefone', 'status'],
    defaultOrderBy: 'id_cliente'
});
