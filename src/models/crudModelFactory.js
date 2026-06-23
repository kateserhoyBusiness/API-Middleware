const { getPool } = require('../config/db');

const buildWhereById = (primaryKey, id) => {
    if (Array.isArray(primaryKey)) {
        const where = primaryKey.map((column) => `${column} = ?`).join(' AND ');
        const values = primaryKey.map((column) => id[column]);
        return { where, values };
    }

    return { where: `${primaryKey} = ?`, values: [id] };
};

const createCrudModel = ({ table, primaryKey, writableColumns, defaultOrderBy }) => {
    const findAll = async () => {
        const pool = getPool();
        const orderBy = defaultOrderBy ? ` ORDER BY ${defaultOrderBy}` : '';
        const [rows] = await pool.execute(`SELECT * FROM ${table}${orderBy}`);
        return rows;
    };

    const findById = async (id) => {
        const pool = getPool();
        const { where, values } = buildWhereById(primaryKey, id);
        const [rows] = await pool.execute(`SELECT * FROM ${table} WHERE ${where}`, values);
        return rows.length > 0 ? rows[0] : null;
    };

    const create = async (data) => {
        const pool = getPool();
        const columns = writableColumns.filter((column) => data[column] !== undefined);

        if (columns.length === 0) {
            throw new Error('Nenhum campo valido enviado');
        }

        const placeholders = columns.map(() => '?').join(', ');
        const values = columns.map((column) => data[column]);
        const [result] = await pool.execute(
            `INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`,
            values
        );

        if (Array.isArray(primaryKey)) {
            return findById(primaryKey.reduce((id, column) => ({ ...id, [column]: data[column] }), {}));
        }

        return findById(result.insertId);
    };

    const update = async (id, data) => {
        const pool = getPool();
        const current = await findById(id);

        if (!current) {
            return null;
        }

        const primaryKeys = Array.isArray(primaryKey) ? primaryKey : [primaryKey];
        const columns = writableColumns.filter((column) => {
            return !primaryKeys.includes(column) && data[column] !== undefined;
        });

        if (columns.length === 0) {
            return current;
        }

        const assignments = columns.map((column) => `${column} = ?`).join(', ');
        const values = columns.map((column) => data[column]);
        const { where, values: idValues } = buildWhereById(primaryKey, id);

        await pool.execute(
            `UPDATE ${table} SET ${assignments} WHERE ${where}`,
            [...values, ...idValues]
        );

        return findById(id);
    };

    const remove = async (id) => {
        const pool = getPool();
        const current = await findById(id);

        if (!current) {
            return null;
        }

        const { where, values } = buildWhereById(primaryKey, id);
        await pool.execute(`DELETE FROM ${table} WHERE ${where}`, values);
        return current;
    };

    return {
        findAll,
        findById,
        create,
        update,
        remove
    };
};

module.exports = createCrudModel;
