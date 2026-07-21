const mysql = require('mysql2/promise');

let pool;

const parseDatabaseUrl = (url) => {
    if (!url) return null;

    try {
        const parsed = new URL(url);
        return {
            host: parsed.hostname,
            port: parsed.port ? Number(parsed.port) : 3306,
            user: decodeURIComponent(parsed.username),
            password: decodeURIComponent(parsed.password),
            database: parsed.pathname.replace(/^\/+/, '')
        };
    } catch (error) {
        return null;
    }
};

const buildPoolConfig = () => {
    const dbUrlConfig = parseDatabaseUrl(process.env.DATABASE_URL || process.env.DB_URL);

    const config = {
        host: dbUrlConfig?.host || process.env.DB_HOST || 'localhost',
        port: dbUrlConfig?.port || Number(process.env.DB_PORT || 3306),
        user: dbUrlConfig?.user || process.env.DB_USER || 'root',
        password: dbUrlConfig?.password || process.env.DB_PASSWORD || '',
        database: dbUrlConfig?.database || process.env.DB_NAME || 'loja',
        charset: 'utf8mb4',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    };

    const sslEnabled = process.env.DB_SSL === 'true' || process.env.DB_SSL === '1' || process.env.DB_SSL_CA || (process.env.DB_HOST || '').includes('aiven') || (process.env.DB_HOST || '').includes('aivencloud');

    if (sslEnabled) {
        config.ssl = process.env.DB_SSL_CA
            ? { rejectUnauthorized: true, ca: process.env.DB_SSL_CA }
            : { rejectUnauthorized: false };
    }

    return config;
};

const conectarDB = async () => {
    try {
        pool = mysql.createPool(buildPoolConfig());

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
