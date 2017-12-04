var mongo = require('mongodb');

var connMongoDB = function() {
    
    var db = new mongo.Db(
        'got', //nome do database
        new mongo.Server(
            'localhost', //endereco do server
            27017, // porta
            {} // configurações adicionais
        ),
        {}
    );

    return db;
};
module.exports = function() {
    return connMongoDB;
};
