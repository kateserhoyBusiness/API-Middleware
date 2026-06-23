const mysql = require('mysql2/promise');

let pool;

const conectarDB = async () => {
    try {
        pool = mysql.createPool({
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 3306,
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'loja',
            charset: 'utf8mb4',
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        await pool.query('SELECT 1');
        console.log('Conectado ao MySQL com sucesso!');
    } catch (error) {
        console.error('Erro ao conectar ao MySQL:', error.message);
        console.log('Tentando reconectar em 5 segundos...');
        setTimeout(conectarDB, 5000);
    }
};

const getPool = () => {
    if (!pool) {
        throw new Error('Pool de conexoes nao inicializado. Execute conectarDB() primeiro.');
    }

    return pool;
};

module.exports = conectarDB;
module.exports.getPool = getPool;
