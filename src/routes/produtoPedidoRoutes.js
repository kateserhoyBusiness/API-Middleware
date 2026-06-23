const express = require('express');
const router = express.Router();
const produtoPedidoController = require('../controllers/produtoPedidoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/', produtoPedidoController.listarTodos);
router.get('/:produtoId/:pedidoId', produtoPedidoController.buscarPorId);
router.post('/', produtoPedidoController.criar);
router.put('/:produtoId/:pedidoId', produtoPedidoController.atualizar);
router.delete('/:produtoId/:pedidoId', produtoPedidoController.deletar);

module.exports = router;
