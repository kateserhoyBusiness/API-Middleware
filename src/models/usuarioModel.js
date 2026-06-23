const { getPool } = require('../config/db');
const bcrypt = require('bcryptjs');

const findByEmail = async (email) => {
    const pool = getPool();
    const [rows] = await pool.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
    return rows.length > 0 ? rows[0] : null;
};

const findById = async (id) => {
    const pool = getPool();
    const [rows] = await pool.execute(
        'SELECT id_usuario, nome, email, criado_em FROM usuarios WHERE id_usuario = ?',
        [id]
    );
    return rows.length > 0 ? rows[0] : null;
};

const create = async (data) => {
    const pool = getPool();
    const { nome, email, senha } = data;

    if (!nome || !email || !senha) {
        throw new Error('Nome, email e senha sao obrigatorios');
    }

    const usuarioExistente = await findByEmail(email);

    if (usuarioExistente) {
        throw new Error('Email ja cadastrado');
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const [result] = await pool.execute(
        'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)',
        [nome, email, senhaHash]
    );

    return { id_usuario: result.insertId, nome, email };
};

const verificarSenha = async (senhaFornecida, senhaHash) => {
    return bcrypt.compare(senhaFornecida, senhaHash);
};

module.exports = {
    findByEmail,
    findById,
    create,
    verificarSenha
};
