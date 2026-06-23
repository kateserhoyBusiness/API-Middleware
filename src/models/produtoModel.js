const { getPool } = require('../config/db');

const findAll = async (filtro = {}) => {
    const pool = getPool();
    let query = `
        SELECT
            p.*,
            c.nome AS categoria_nome
        FROM produtos p
        INNER JOIN categorias c ON c.id_categoria = p.categorias_id_categoria
        WHERE 1=1
    `;
    const params = [];

    if (filtro.nome) {
        query += ' AND p.nome LIKE ?';
        params.push(`%${filtro.nome}%`);
    }

    if (filtro.categoria) {
        query += ' AND p.categorias_id_categoria = ?';
        params.push(filtro.categoria);
    }

    query += ' ORDER BY p.id_produto';

    const [rows] = await pool.execute(query, params);
    return rows;
};

const findById = async (id) => {
    const pool = getPool();
    const [rows] = await pool.execute(
        `SELECT
            p.*,
            c.nome AS categoria_nome
        FROM produtos p
        INNER JOIN categorias c ON c.id_categoria = p.categorias_id_categoria
        WHERE p.id_produto = ?`,
        [id]
    );

    return rows.length > 0 ? rows[0] : null;
};

const resolveCategoriaId = async (data) => {
    const pool = getPool();
    const categoriaId = data.categorias_id_categoria || data.categoriaId || data.id_categoria;
    const categoriaNome = data.categoria || data.categoria_nome || data.nome_categoria;

    if (categoriaId) {
        const [rows] = await pool.execute(
            'SELECT id_categoria FROM categorias WHERE id_categoria = ?',
            [categoriaId]
        );

        if (rows.length === 0) {
            throw new Error('Categoria informada nao existe');
        }

        return categoriaId;
    }

    if (!categoriaNome || !String(categoriaNome).trim()) {
        return null;
    }

    const nome = String(categoriaNome).trim();
    const [categorias] = await pool.execute(
        'SELECT id_categoria FROM categorias WHERE nome = ? LIMIT 1',
        [nome]
    );

    if (categorias.length > 0) {
        return categorias[0].id_categoria;
    }

    const [result] = await pool.execute(
        'INSERT INTO categorias (nome) VALUES (?)',
        [nome]
    );

    return result.insertId;
};

const create = async (data = {}) => {
    const pool = getPool();
    const {
        nome,
        valor,
        estoque = 1
    } = data;
    const categorias_id_categoria = await resolveCategoriaId(data);

    if (!nome || valor === undefined || !categorias_id_categoria) {
        throw new Error('Nome, valor e categoria sao obrigatorios');
    }

    const [result] = await pool.execute(
        'INSERT INTO produtos (nome, valor, estoque, categorias_id_categoria) VALUES (?, ?, ?, ?)',
        [nome, valor, estoque, categorias_id_categoria]
    );

    return findById(result.insertId);
};

const findByIdAndUpdate = async (id, data) => {
    const pool = getPool();
    const produto = await findById(id);

    if (!produto) {
        return null;
    }

    const {
        nome,
        valor,
        estoque
    } = data;
    const categorias_id_categoria = await resolveCategoriaId(data);
    const updates = [];
    const params = [];

    if (nome !== undefined) {
        updates.push('nome = ?');
        params.push(nome);
    }
    if (valor !== undefined) {
        updates.push('valor = ?');
        params.push(valor);
    }
    if (estoque !== undefined) {
        updates.push('estoque = ?');
        params.push(estoque);
    }
    if (categorias_id_categoria !== undefined) {
        updates.push('categorias_id_categoria = ?');
        params.push(categorias_id_categoria);
    }

    if (updates.length === 0) {
        return produto;
    }

    params.push(id);
    await pool.execute(
        `UPDATE produtos SET ${updates.join(', ')} WHERE id_produto = ?`,
        params
    );

    return findById(id);
};

const findByIdAndDelete = async (id) => {
    const pool = getPool();
    const produto = await findById(id);

    if (!produto) {
        return null;
    }

    await pool.execute('DELETE FROM produtos WHERE id_produto = ?', [id]);
    return produto;
};

module.exports = {
    findAll,
    findById,
    create,
    findByIdAndUpdate,
    findByIdAndDelete
};
