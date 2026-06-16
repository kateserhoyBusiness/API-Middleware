const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

/**
 * Esquema do modelo de Usuário com validações obrigatórias e hash automático de senha.
 * @type {import('mongoose').Schema}
 * @param {string} nome - Nome completo do usuário (obrigatório).
 * @param {string} email - Email único do usuário no sistema (obrigatório).
 * @param {string} senha - Senha em texto plano que será criptografada com bcrypt (obrigatória).
 * @returns {import('mongoose').Document} Documento de usuário com senha automaticamente hashada.
 * @throws {Error} Lança erro se campos obrigatórios não forem fornecidos ou email já existe.
 */
const usuarioSchema = new mongoose.Schema({
    nome: { type: String, required: [true, 'Nome é obrigatório'] },
    email: { type: String, required: [true, 'Email é obrigatório'], unique: true },
    senha: { type: String, required: [true, 'Senha é obrigatória'] }
});

usuarioSchema.pre('save', async function () {
    if (!this.isModified('senha')) return;
    this.senha = await bcrypt.hash(this.senha, 10);
});

/**
 * Modelo de usuário Mongoose.
 * @type {import('mongoose').Model<import('mongoose').Document>}
 */
module.exports = mongoose.model('Usuario', usuarioSchema);