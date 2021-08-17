const jwt = require('jwt-simple');
const moment = require('moment');
const { confJwt } = require('../config');

exports.ensureAuth = (req, res, next) => {

    if (!req.headers.authorization) {
        return res.status(403).send({ success: 0, messagge: 'La peticion no tiene cabecera de autenticacion' });
    };

    const token = req.headers.authorization.replace(/['"]+/g, "");

    try {
        var payload = jwt.decode(token, confJwt.SECRET_KEY);

        if (payload.exp <= moment.unix()) {
            return res.status(404).send({ success: 0, message: 'El token expiro' });
        };
    } catch (ex) {
        return res.status(404).send({ success: 0, message: 'Token invalido' });
    };

    req.user = payload;
    next();
};