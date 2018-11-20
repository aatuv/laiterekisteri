var conn = require('./db');

module.exports = 
{
    registeration: (req, res) => {
        conn.query('INSERT INTO kayttaja (NIMI, OSOITE, TUNNUS, SALASANA, PUHNRO', (err, rows) => {
            if (err) {
                console.log("Virhe rekisteröitymisessä, syy: " + err);
                res.json(err);
            } else {
                console.log("Käyttäjä lisätty: " + JSON.stringify(rows));
                res.statusCode = 201;

            }
        });
    }
}