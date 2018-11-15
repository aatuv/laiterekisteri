'use strict'

var mysql = require('mysql');
var s = require('./serveri.js');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',  // HUOM! Älä käytä root:n tunnusta tuotantokoneella!!!!
    password : '',
    database : 'laiterekisteri'
});

module.exports = 

{
    authenticate: (req, res) => {
        sess = req.session;
    
        connection.query('SELECT * FROM kayttaja WHERE TUNNUS = ? AND SALASANA = ?', [username, password], (error, results, fields) => {
            if (error) {
                
            }
        }
    }
}
