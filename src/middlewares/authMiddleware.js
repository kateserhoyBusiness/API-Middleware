const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;

    console.log('Headers:', req.headers);
    console.log('Auth Header:', authHeader);

    if (!authHeader || !authHeader.toLowerCase().startsWith('bearer ')) {
        return res.status(401).json({ mensagem: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.usuarioId = decoded.id;
        next();
    } catch (error) {
        console.log('Erro JWT:', error.message);
        return res.status(401).json({ mensagem: 'Token inválido ou expirado' });
    }
};