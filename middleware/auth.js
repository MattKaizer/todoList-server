const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // read header token
    const token = req.header('x-auth-token');
    
    // compare token
    if(!token) {
        return res.status(401).json({msg: 'No hay token, permiso denegado.'})
    }
    // validate token
    try {
        const verifiedToken = jwt.verify(token, process.env.SECRETWORD);
        req.user = verifiedToken.user;
        next();
    } catch (error) {
        return res.status(401).json({msg: 'Token no válido, permiso denegado.'})
    }
}