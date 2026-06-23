const Produto = require('../models/produtoModel');

exports.listarTodos = async (req, res) => {
    try {
        const { nome, categoria } = req.query;
        const filtro = {};

        if (nome) {
            filtro.nome = nome;
        }

        if (categoria) {
            filtro.categoria = categoria;
        }

        const produtos = await Produto.findAll(filtro);
        res.status(200).json(produtos);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao buscar produtos', erro: error.message });
    }
};

exports.buscarPorId = async (req, res) => {
    try {
        const produto = await Produto.findById(req.params.id);

        if (!produto) {
            return res.status(404).json({ mensagem: 'Produto nao encontrado' });
        }

        res.status(200).json(produto);
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao buscar produto', erro: error.message });
    }
};

exports.criar = async (req, res) => {
    try {
        const produto = await Produto.create(req.body);
        res.status(201).json(produto);
    } catch (error) {
        res.status(400).json({ mensagem: 'Erro ao criar produto', erro: error.message });
    }
};

exports.atualizar = async (req, res) => {
    try {
        const produto = await Produto.findByIdAndUpdate(req.params.id, req.body);

        if (!produto) {
            return res.status(404).json({ mensagem: 'Produto nao encontrado' });
        }

        res.status(200).json(produto);
    } catch (error) {
        res.status(400).json({ mensagem: 'Erro ao atualizar produto', erro: error.message });
    }
};

exports.deletar = async (req, res) => {
    try {
        const produto = await Produto.findByIdAndDelete(req.params.id);

        if (!produto) {
            return res.status(404).json({ mensagem: 'Produto nao encontrado' });
        }

        res.status(204).send();
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao deletar produto', erro: error.message });
    }
};
