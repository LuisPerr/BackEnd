const jwt = require('jwt-simple');
const moment = require('moment');
const { confJwt } = require('../config');

exports.createAccessToken = function (data) {
    data.createToken = moment().unix();
    data.exp = moment().add(3, 'hours').unix();

    return jwt.encode(data, confJwt.SECRET_KEY);
};

exports.createRefreshToken = function (data) {
    data.exp = moment().add(30, 'days').unix();

    return jwt.encode(data, confJwt.SECRET_KEY);
};

exports.decodeToken = function (token) {
    return jwt.decode(token, confJwt.SECRET_KEY, true);
};