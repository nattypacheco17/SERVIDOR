var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ejemplo'
});

var getConnection = function (callback) {
    pool.getConnection(function (err, connection) {
        if(err){
            return callback(err);
        }
        callback(null, connection);
    });
}

module.exports = getConnection;