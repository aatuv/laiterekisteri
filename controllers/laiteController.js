var conn = require('../db');
var mysql = require('mysql');

module.exports =

    {
        adminFetchGadgets: (req, res) => {
            var query = 'SELECT lai.LAITE_ID AS LAITE_ID, lai.NIMI AS NIMI, lai.MERKKI AS MERKKI, lai.MALLI AS MALLI, lai.SARJANRO AS SARJANRO, lai.SIJAINTI, omi.NIMI AS OMISTAJA, kat.SELITE AS KATEGORIA ' + 
            'FROM laite AS lai ' + 
            'INNER JOIN omistaja AS omi ON lai.OMISTAJA_ID = omi.OMISTAJA_ID ' + 
            'INNER JOIN kategoria AS kat ON lai.KATEGORIA_ID = kat.KATEGORIA_ID ' + 
            'WHERE 1 = 1';
            
            if (req.query.hasOwnProperty('NIMI')) {
                if (req.query.NIMI != "") {
                    console.log(req.query.NIMI + " oli täällä");
                query += ' AND lai.NIMI = ' + mysql.escape(req.query.NIMI);
                }
            }
            if (req.query.hasOwnProperty('MERKKI')) {
                if (req.query.MERKKI != "") {
                query += ' AND MERKKI = ' + mysql.escape(req.query.MERKKI);
                }
            }
            if (req.query.hasOwnProperty('MALLI')) {
                if (req.query.MALLI != "") {
                query += ' AND MALLI = ' + mysql.escape(req.query.MALLI);
                }
            }
            if (req.query.hasOwnProperty('SARJANRO')) {
                if (req.query.SARJANRO != "") {
                query += ' AND SARJANRO = ' + mysql.escape(req.query.SARJANRO);
                }
            }
            if (req.query.hasOwnProperty('SIJAINTI')) {
                if (req.query.SIJAINTI != "") {
                query += ' AND SIJAINTI = ' + mysql.escape(req.query.SIJAINTI);
                }
            }
            if (req.query.hasOwnProperty('OMISTAJA_ID')) {
                if (req.query.OMISTAJA_ID != "") {
                query += ' AND lai.OMISTAJA_ID = ' + mysql.escape(req.query.OMISTAJA_ID);
                }
            }
            if (req.query.hasOwnProperty('KATEGORIA_ID')) {
                if (req.query.KATEGORIA_ID != "") {
                query += ' AND lai.KATEGORIA_ID = ' + mysql.escape(req.query.KATEGORIA_ID);
                }
            }

            conn.query(query, (err, rows) => {
                if (err) {
                    res.json(err);
                } else {
                    console.log(query);
                    res.json(rows);
                }
            })
        },
        fetchGadgets: (req, res) => {
            var query = 'SELECT lai.LAITE_ID AS LAITE_ID, lai.NIMI AS NIMI, lai.MERKKI AS MERKKI, lai.MALLI AS MALLI, lai.SARJANRO AS SARJANRO, lai.SIJAINTI, omi.NIMI AS OMISTAJA, kat.SELITE AS KATEGORIA ' + 
            'FROM laite AS lai ' + 
            'INNER JOIN omistaja AS omi ON lai.OMISTAJA_ID = omi.OMISTAJA_ID ' + 
            'INNER JOIN kategoria AS kat ON lai.KATEGORIA_ID = kat.KATEGORIA_ID ' + 
            'WHERE 1 = 1';
            
            if (req.query.hasOwnProperty('NIMI')) {
                if (req.query.NIMI != "") {
                    console.log(req.query.NIMI + " oli täällä");
                query += ' AND lai.NIMI = ' + mysql.escape(req.query.NIMI);
                }
            }
            if (req.query.hasOwnProperty('MERKKI')) {
                if (req.query.MERKKI != "") {
                query += ' AND MERKKI = ' + mysql.escape(req.query.MERKKI);
                }
            }
            if (req.query.hasOwnProperty('MALLI')) {
                if (req.query.MALLI != "") {
                query += ' AND MALLI = ' + mysql.escape(req.query.MALLI);
                }
            }
            if (req.query.hasOwnProperty('SARJANRO')) {
                if (req.query.SARJANRO != "") {
                query += ' AND SARJANRO = ' + mysql.escape(req.query.SARJANRO);
                }
            }
            if (req.query.hasOwnProperty('SIJAINTI')) {
                if (req.query.SIJAINTI != "") {
                query += ' AND SIJAINTI = ' + mysql.escape(req.query.SIJAINTI);
                }
            }
            if (req.query.hasOwnProperty('OMISTAJA_ID')) {
                if (req.query.OMISTAJA_ID != "") {
                query += ' AND lai.OMISTAJA_ID = ' + mysql.escape(req.query.OMISTAJA_ID);
                }
            }
            if (req.query.hasOwnProperty('KATEGORIA_ID')) {
                if (req.query.KATEGORIA_ID != "") {
                query += ' AND lai.KATEGORIA_ID = ' + mysql.escape(req.query.KATEGORIA_ID);
                }
            }

            query += ' AND NOT EXISTS (SELECT LAITE_ID FROM varaus WHERE varaus.LAITE_ID = lai.LAITE_ID)';

            conn.query(query, (err, rows) => {
                if (err) {
                    console.log(err.sqlMessage);
                    res.json(err);
                } else {
                    console.log(query);
                    res.json(rows);
                }
            })
        },
        insertAGadget: (req, res) => {
            conn.query('INSERT INTO laite (NIMI, MERKKI, MALLI, SARJANRO, SIJAINTI, OMISTAJA_ID, KATEGORIA_ID) VALUES(?, ?, ?, ?, ?, ?, ?)',[req.body.NIMI, req.body.MERKKI, req.body.MALLI, req.body.SARJANRO, req.body.SIJAINTI, req.body.OMISTAJA_ID, req.body.KATEGORIA_ID], (err, rows) => {
                if (err) {
                    res.json(err);
                } else {
                    res.statusCode = 201;
                    console.log("laitteen lisäys onnistui, " + JSON.stringify(rows));
                    res.json(
                        {
                            message: "Laitteen lisäys onnistui."
                        }
                    )
                }
            })
        },
        deleteAGadget: (req, res) => {
            console.log(req.params.id);
            conn.query('DELETE FROM laite WHERE LAITE_ID = ?', req.params.id, (err, rows) => {
                if (err) {
                    res.json(err);
                } else {
                    console.log(rows);
                }
            })
        },
        fetchThisGadget: (req, res) => {
            conn.query('SELECT * FROM laite WHERE LAITE_ID = ?', req.query.LAITE_ID, (err, rows) => {
                if (err) {
                    res.json(err);
                } else {
                    res.json(rows);
                }
            })
        },
        updateThisGadget: (req, res) => {
            console.log(req.body.LAITE_ID);
            conn.query('UPDATE laite SET NIMI = ?, MERKKI = ?, MALLI = ?, SARJANRO = ?, SIJAINTI = ?, OMISTAJA_ID = ?, KATEGORIA_ID = ? WHERE SARJANRO = ?', [req.body.NIMI, req.body.MERKKI, req.body.MALLI, req.body.SARJANRO, req.body.SIJAINTI, req.body.OMISTAJA_ID, req.body.KATEGORIA_ID, req.body.SARJANRO], (err, rows) => {
                if (err) {
                    res.json(err);
                } else {
                    console.log(rows);
                }
            })
        }
    }