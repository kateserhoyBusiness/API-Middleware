const mongoose = require('mongoose');

/**
 * Esquema do modelo de Produto com validações obrigatórias e virtuals para aliases.
 * @type {import('mongoose').Schema}
 * @param {string} nome - Nome do produto exibido (obrigatório).
 * @param {string} descricao - Descrição detalhada do produto (padrão: 'Sem descrição').
 * @param {number} preco - Preço do produto em reais (obrigatório).
 * @param {string} categoria - Categoria do produto para organização (padrão: 'Geral').
 * @param {number} estoque - Quantidade disponível em estoque (padrão: 0).
 * @param {Date} criadoEm - Data de criação do produto no banco (padrão: data atual).
 * @returns {import('mongoose').Document} Documento de produto com virtuals product_name e id.
 * @throws {Error} Lança erro se campos obrigatórios (nome, preco) não forem fornecidos.
 */
const produtoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'O nome do produto é obrigatório']
    },
    descricao: {
        type: String,
        default: 'Sem descrição'
    },
    preco: {
        type: Number,
        required: [true, 'O preço é obrigatório']
    },
    categoria: {
        type: String,
        default: 'Geral'
    },
    estoque: {
        type: Number,
        default: 0
    },
    criadoEm: {
        type: Date,
        default: Date.now
    }
});

produtoSchema.virtual('product_name').get(function () {
    return this.nome;
});

produtoSchema.virtual('id').get(function () {
    return this._id.toString();
});

produtoSchema.set('toJSON', { virtuals: true });
produtoSchema.set('toObject', { virtuals: true });

/**
 * Modelo de produto Mongoose.
 * @type {import('mongoose').Model<import('mongoose').Document>}
 */
module.exports = mongoose.model('Produto', produtoSchema);