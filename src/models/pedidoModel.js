const createCrudModel = require('./crudModelFactory');

module.exports = createCrudModel({
    table: 'pedidos',
    primaryKey: 'id_pedido',
    writableColumns: ['data', 'clientes_id_cliente'],
    defaultOrderBy: 'id_pedido'
});
