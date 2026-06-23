const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/', produtoController.listarTodos);
router.get('/:id', produtoController.buscarPorId);
router.post('/', (req, res, next) => {
    /*
        #swagger.description = 'Cria um produto'
        #swagger.consumes = ['application/json']
        #swagger.parameters['authorization'] = {
            in: 'header',
            type: 'string',
            required: true,
            description: 'Token JWT. Pode ser apenas o token ou Bearer TOKEN.'
        }
        #swagger.parameters['body'] = {
            in: 'body',
            required: true,
            schema: {
                $nome: 'Camiseta',
                $valor: 59.9,
                estoque: 10,
                $categoria: 'Roupas'
            }
        }
    */
    produtoController.criar(req, res, next);
});
router.put('/:id', produtoController.atualizar);
router.delete('/:id', produtoController.deletar);

module.exports = router;
