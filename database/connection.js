const sql = require('mssql');
const { dbConnection } = require('../config');

let connection = '';

let CreateConnection = function () {
    this.types = {
        INT: sql.Int,
        DECIMAL: sql.Decimal(18, 5),
        STRING: sql.VarChar(8000),
        DATE: sql.DateTime,
        BIT: sql.bit
    };
    connection = new sql.Connection(dbConnection);
};

CreateConnection.prototype.query = function (stored, params, callback) {
    connection.connect(function (err) {
        if (!err) {
            let request = new sql.Request(connection);
            // Add inputs
            if (params.length > 0) {
                params.forEach(function (param) {
                    request.input(param.name, param.type, param.value);
                });
            };

            request.execute(stored)
                .then(function (recordsets) {
                    connection.close();
                    callback(null, recordsets[0]);
                }).catch(function (error) {
                    connection.close();
                    callback(error);
                });
        } else {
            callback(err)
        };
    });
};

module.exports = CreateConnection;