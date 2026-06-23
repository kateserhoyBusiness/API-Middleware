const createCrudController = ({ model, entityName, getId }) => ({
    listarTodos: async (req, res) => {
        try {
            const items = await model.findAll();
            res.status(200).json(items);
        } catch (error) {
            res.status(500).json({ mensagem: `Erro ao buscar ${entityName}`, erro: error.message });
        }
    },

    buscarPorId: async (req, res) => {
        try {
            const item = await model.findById(getId(req));

            if (!item) {
                return res.status(404).json({ mensagem: `${entityName} nao encontrado` });
            }

            res.status(200).json(item);
        } catch (error) {
            res.status(500).json({ mensagem: `Erro ao buscar ${entityName}`, erro: error.message });
        }
    },

    criar: async (req, res) => {
        try {
            const item = await model.create(req.body);
            res.status(201).json(item);
        } catch (error) {
            res.status(400).json({ mensagem: `Erro ao criar ${entityName}`, erro: error.message });
        }
    },

    atualizar: async (req, res) => {
        try {
            const item = await model.update(getId(req), req.body);

            if (!item) {
                return res.status(404).json({ mensagem: `${entityName} nao encontrado` });
            }

            res.status(200).json(item);
        } catch (error) {
            res.status(400).json({ mensagem: `Erro ao atualizar ${entityName}`, erro: error.message });
        }
    },

    deletar: async (req, res) => {
        try {
            const item = await model.remove(getId(req));

            if (!item) {
                return res.status(404).json({ mensagem: `${entityName} nao encontrado` });
            }

            res.status(204).send();
        } catch (error) {
            res.status(500).json({ mensagem: `Erro ao deletar ${entityName}`, erro: error.message });
        }
    }
});

module.exports = createCrudController;
