const jwt = require('../services/jwt');
const moment = require('moment');
const Sql = require('../database/connection');
const model = new Sql();

function willExpiredToken(token) {
    const { exp } = jwt.decodeToken(token);
    const currentDate = moment().unix();

    if (currentDate > exp) {
        return true;
    } else {
        return false;
    };
};

function refreshAccessToken(req, res) {
    const { refreshToken, usuario } = req.body;
    const isTokenExpired = willExpiredToken(refreshToken);
    if (isTokenExpired) {
        res.status(404).send({ success: 0, message: 'El refreshToken ha expirado' });
    } else {
        const params = [
            { name: 'usuario', value: usuario, type: model.types.INT }
        ];

        model.query('[dbo].[logea_usuario]', params, (error, result) => {
            if (error) {
                return res.status(400).send({ success: 0, message: error });
            } else {
                if (!result) {
                    return res.status(404).send({ success: 0, message: 'No se refresco el token' });
                } else {
                    const tokens = {
                        accessToken: jwt.createAccessToken(result[0]),
                        refreshToken: refreshToken
                    };
                    return res.status(200).send({ success: 1, message: 'Token refrescado con exito', data: tokens });
                };
            };
        });
    };
};

function DecodeToken(req, res) {
    const token = req.headers.authorization.replace(/['"]+/g, "");
    const obj = jwt.decodeToken(token);
    delete obj['createToken'];
    delete obj['exp'];
    return res.status(200).send({ success: 1, message: 'Datos del token', data: obj });
};

module.exports = {
    refreshAccessToken,
    DecodeToken
};