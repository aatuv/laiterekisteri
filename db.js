var mysql = require('mysql');

// tietokantayhteys
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'laiterekisteri'
});

// luodaan yhteys
connection.connect((err) => {
    if (err) throw err;
});

module.exports = connection;