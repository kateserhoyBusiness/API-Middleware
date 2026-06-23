const createCrudModel = require('./crudModelFactory');

module.exports = createCrudModel({
    table: 'endereco',
    primaryKey: 'id_endereco',
    writableColumns: ['logradouro', 'numero', 'tipo', 'bairro', 'cep', 'cidade', 'clientes_id_cliente'],
    defaultOrderBy: 'id_endereco'
});
