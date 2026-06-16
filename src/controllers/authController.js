const Usuario = require('../models/usuarioModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Gerencia o registro de um novo usuário no banco de dados.
 * @async
 * @param {import('express').Request} req - Objeto de Requisição do Express. Expectativa de body: { nome, email, senha }.
 * @param {import('express').Response} res - Objeto de Resposta do Express.
 * @returns {Promise<void>} Envia uma resposta JSON 201 com o usuário criado ou status de erro 400/500.
 * @throws {Error} Lança erro ao falhar na criação do usuário ou email já existente.
 */
exports.registrar = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;

        const usuarioExiste = await Usuario.findOne({ email });
        if (usuarioExiste) {
            return res.status(400).json({ mensagem: 'Email já cadastrado' });
        }

        const usuario = await Usuario.create({ nome, email, senha });

        res.status(201).json({ mensagem: 'Usuário criado com sucesso', id: usuario._id });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao registrar', erro: error.message });
    }
};

/**
 * Gerencia a autenticação de um usuário e retorna um token JWT.
 * @async
 * @param {import('express').Request} req - Objeto de Requisição do Express. Expectativa de body: { email, senha }.
 * @param {import('express').Response} res - Objeto de Resposta do Express.
 * @returns {Promise<void>} Envia uma resposta JSON com token JWT ou status de erro 401/500.
 * @throws {Error} Lança erro ao falhar na autenticação ou validação de credenciais.
 */
exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(401).json({ mensagem: 'Email ou senha inválidos' });
        }

        const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
        if (!senhaCorreta) {
            return res.status(401).json({ mensagem: 'Email ou senha inválidos' });
        }

        const token = jwt.sign(
            { id: usuario._id },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({ mensagem: 'Login realizado com sucesso', token });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao fazer login', erro: error.message });
    }
};