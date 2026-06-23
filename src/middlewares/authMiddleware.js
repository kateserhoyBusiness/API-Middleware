const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ mensagem: 'Token nao fornecido' });
    }

    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ mensagem: 'JWT_SECRET nao configurado' });
    }

    const token = authHeader.toLowerCase().startsWith('bearer ')
        ? authHeader.split(' ')[1]
        : authHeader;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuarioId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({ mensagem: 'Token invalido ou expirado' });
    }
};
