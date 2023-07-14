const jwt = require('jsonwebtoken')

module.exports = function(req, res, next) {
    const token = req.headers['x-access-token']

    if (!token) {
        return res.status(401).send('No hay token');
    }

    try {
        const cifrado = jwt.verify(token, process.env.SECRET).usuario
        req.usuario = cifrado
        next();
    } catch (error) {
        return res.status(401).send('Token invalido')
    }


}