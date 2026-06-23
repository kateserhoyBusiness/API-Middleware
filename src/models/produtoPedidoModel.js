const createCrudModel = require('./crudModelFactory');

module.exports = createCrudModel({
    table: 'produtos_pedidos',
    primaryKey: ['produtos_id_produto', 'pedidos_id_pedido'],
    writableColumns: ['produtos_id_produto', 'pedidos_id_pedido', 'quantidade', 'valor'],
    defaultOrderBy: 'pedidos_id_pedido, produtos_id_produto'
});
