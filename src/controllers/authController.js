const Usuario = require('../models/usuarioModel');
const jwt = require('jsonwebtoken');

exports.registrar = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        const usuario = await Usuario.create({ nome, email, senha });

        res.status(201).json({
            mensagem: 'Usuario criado com sucesso',
            id: usuario.id_usuario
        });
    } catch (error) {
        if (error.message === 'Email ja cadastrado') {
            return res.status(400).json({ mensagem: error.message });
        }

        res.status(500).json({ mensagem: 'Erro ao registrar', erro: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        const usuario = await Usuario.findByEmail(email);
        if (!usuario) {
            return res.status(401).json({ mensagem: 'Email ou senha invalidos' });
        }

        const senhaCorreta = await Usuario.verificarSenha(senha, usuario.senha);
        if (!senhaCorreta) {
            return res.status(401).json({ mensagem: 'Email ou senha invalidos' });
        }

        if (!process.env.JWT_SECRET) {
            return res.status(500).json({ mensagem: 'JWT_SECRET nao configurado' });
        }

        const token = jwt.sign(
            { id: usuario.id_usuario },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.status(200).json({ mensagem: 'Login realizado com sucesso', token });
    } catch (error) {
        res.status(500).json({ mensagem: 'Erro ao fazer login', erro: error.message });
    }
};
