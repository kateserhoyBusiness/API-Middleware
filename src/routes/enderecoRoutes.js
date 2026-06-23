const express = require('express');
const router = express.Router();
const enderecoController = require('../controllers/enderecoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/', enderecoController.listarTodos);
router.get('/:id', enderecoController.buscarPorId);
router.post('/', enderecoController.criar);
router.put('/:id', enderecoController.atualizar);
router.delete('/:id', enderecoController.deletar);

module.exports = router;
