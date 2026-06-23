const createCrudController = require('./crudControllerFactory');
const ProdutoPedido = require('../models/produtoPedidoModel');

module.exports = createCrudController({
    model: ProdutoPedido,
    entityName: 'Produto do pedido',
    getId: (req) => ({
        produtos_id_produto: req.params.produtoId,
        pedidos_id_pedido: req.params.pedidoId
    })
});
