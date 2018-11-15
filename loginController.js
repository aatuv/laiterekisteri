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
                return callback(new Error ('Virhe suorittaessa kyselyä'), null);
            }
            if (rows.length !== 1) {
                return callback(new Error ('Täsmälleen yhden käyttäjän löytäminen epäonnistui'), null);
            }
            if (rows[0].password === password) {
                return callback(new Error ('Täsmälleen yhden käyttäjän löytäminen epäonnistui'), null);
           }

           if (rows[0].password === password) {
            // you would probably want a more useful callback result than 
            // just returning the username, but again - an example
            return callback(null, rows[0].username);
        }
    }
}
