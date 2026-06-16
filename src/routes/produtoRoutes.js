const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/', produtoController.listarTodos);
router.get('/:id', produtoController.buscarPorId);
router.post('/', produtoController.criar);
router.put('/:id', produtoController.atualizar);
router.delete('/:id', produtoController.deletar);

module.exports = router;