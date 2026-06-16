const Produto = require('../models/produtoModel');

/**
 * Gerencia a busca de todos os produtos com filtros opcionais.
 * @async
 * @param {import('express').Request} req - Objeto de Requisição do Express. Expectativa de query params: ?nome=texto, ?categoria=texto.
 * @param {import('express').Response} res - Objeto de Resposta do Express.
 * @returns {Promise<void>} Envia uma resposta JSON com a lista de produtos ou status de erro.
 * @throws {Error} Lança erro ao falhar na busca de produtos no banco de dados.
 */
exports.listarTodos = async (req, res) => {
    try {
        const { nome, categoria } = req.query;
        let filtro = {};

        if (nome) {
            filtro.nome = { $regex: nome, $options: 'i' };
        }
        if (categoria) {
            filtro.categoria = { $regex: categoria, $options: 'i' };
        }

        const produtos = await Produto.find(filtro);
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao buscar produtos', erro: error.message });
    }
};

/**
 * Gerencia a busca de um produto específico pelo seu ID.
 * @async
 * @param {import('express').Request} req - Objeto de Requisição do Express. Expectativa de params: { id }.
 * @param {import('express').Response} res - Objeto de Resposta do Express.
 * @returns {Promise<void>} Envia uma resposta JSON com o produto ou status de erro 404/500.
 * @throws {Error} Lança erro ao falhar na busca do produto pelo ID.
 */
exports.buscarPorId = async (req, res) => {
    try {
        const produto = await Produto.findById(req.params.id);
        if (!produto) {
            return res.status(404).json({ mensagem: 'Produto não encontrado' });
        }
        res.status(200).json(produto);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao buscar produto', erro: error.message });
    }
};

/**
 * Gerencia a criação de um novo produto no banco de dados.
 * @async
 * @param {import('express').Request} req - Objeto de Requisição do Express. Expectativa de body: { nome, descricao, preco, categoria, estoque }.
 * @param {import('express').Response} res - Objeto de Resposta do Express.
 * @returns {Promise<void>} Envia uma resposta JSON com o produto criado ou status de erro.
 * @throws {Error} Lança erro ao falhar na criação do produto ou validação.
 */
exports.criar = async (req, res) => {
    try {
        const produto = await Produto.create(req.body);
        res.status(201).json(produto);
    } catch (error) {
        res.status(400).json({ mensagem: 'Erro ao criar produto', erro: error.message });
    }
};

/**
 * Gerencia a atualização de um produto existente pelo ID.
 * @async
 * @param {import('express').Request} req - Objeto de Requisição do Express. Expectativa de params: { id } e body com campos a atualizar.
 * @param {import('express').Response} res - Objeto de Resposta do Express.
 * @returns {Promise<void>} Envia uma resposta JSON com o produto atualizado ou status de erro.
 * @throws {Error} Lança erro ao falhar na atualização do produto ou validação.
 */
exports.atualizar = async (req, res) => {
    try {
        const produto = await Produto.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!produto) {
            return res.status(404).json({ mensagem: 'Produto não encontrado' });
        }
        res.status(200).json(produto);
    } catch (error) {
        res.status(400).json({ mensagem: 'Erro ao atualizar produto', erro: error.message });
    }
};

/**
 * Gerencia a remoção de um produto pelo ID.
 * @async
 * @param {import('express').Request} req - Objeto de Requisição do Express. Expectativa de params: { id }.
 * @param {import('express').Response} res - Objeto de Resposta do Express.
 * @returns {Promise<void>} Envia uma resposta sem conteúdo (204) ou status de erro 404/500.
 * @throws {Error} Lança erro ao falhar na remoção do produto.
 */
exports.deletar = async (req, res) => {
    try {
        const produto = await Produto.findByIdAndDelete(req.params.id);
        if (!produto) {
            return res.status(404).json({ mensagem: 'Produto não encontrado' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao deletar produto', erro: error.message });
    }
};