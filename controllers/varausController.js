var conn = require('../db');

module.exports =

    {
        fetchReservations: (req, res) => {
            var query = 'SELECT var.VARAUS_ID AS VARAUS_ID, lai.NIMI AS NIMI, lai.MERKKI AS MERKKI, lai.MALLI AS MALLI, lai.SARJANRO AS SARJANRO, lai.SIJAINTI AS SIJAINTI, omi.NIMI AS OMISTAJA, kat.SELITE AS KATEGORIA, var.ALKUPVM AS ALKUPVM, var.LOPPUPVM AS LOPPUPVM, sta.KUVAUS AS STATUS ' +
                'FROM varaus AS var ' +
                'INNER JOIN kayttaja AS kay ON var.KAYTTAJA_ID = kay.KAYTTAJA_ID ' +
                'INNER JOIN laite AS lai ON var.LAITE_ID = lai.LAITE_ID ' +
                'INNER JOIN omistaja AS omi ON lai.OMISTAJA_ID = omi.OMISTAJA_ID ' +
                'INNER JOIN kategoria AS kat ON lai.KATEGORIA_ID = kat.KATEGORIA_ID ' +
                'INNER JOIN status AS sta ON var.STATUS_ID = sta.STATUS_ID ' +
                'WHERE 1 = 1';

            if (req.query.TUNNUS != "") {
                query += ' AND kay.KAYTTAJA = ' + mysql.escape(req.query.TUNNUS);
            }
            if (req.query.ALKUPVM != "") {
                query += ' AND ALKUPVM >= ' + mysql.escape(req.query.ALKUPVM);
            }
            if (req.query.LOPPUPVM != "") {
                query += ' AND LOPPUPVM <= ' + mysql.escape(req.query.LOPPUPVM);
            }

            conn.query(query, (err, rows) => {
                if (err) {
                    console.log(err.sqlMessage);
                    res.json(err);
                } else {
                    console.log(req.query);
                    res.json(rows);
                }
            })
        },
        reserveAGadget: (req, res) => {
            conn.query("INSERT INTO varaus (LAITE_ID, KAYTTAJA_ID, ALKUPVM, LOPPUPVM, STATUS_ID) VALUES (?, ?, ?, ?, 2)", [req.body.LAITE_ID, req.body.KAYTTAJA_ID, req.body.ALKUPVM, req.body.LOPPUPVM], (err, rows) => {
                if (err) {
                    res.json(err);
                    console.log(err.sqlMessage);
                } else {
                    res.statusCode = 201;

                    res.json(
                        {
                            message : "Laitteen varaus onnistui."
                        }
                    )
                }
            })
        },
        deleteReservation: (req, res) => {
            console.log(req.params.id);
            conn.query('DELETE FROM varaus WHERE VARAUS_ID = ?', req.params.id, (err, rows) => {
                if (err) {
                    res.json(err);
                } else {
                    console.log(rows);
                }
            })
        }
    }