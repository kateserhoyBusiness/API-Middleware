const mongoose = require('mongoose');

const conectarDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log('Conectado ao MongoDB com sucesso!');
    } catch (error) {
        console.error('Erro ao conectar ao MongoDB:', error.message);
        console.log('Tentando reconectar em 5 segundos...');
        setTimeout(conectarDB, 5000);
    }
};

module.exports = conectarDB;