var conn = require('../db');

module.exports =

    {
        fetchAllReservations: (req, res) => {
            var query = 'SELECT kay.TUNNUS AS KAYTTAJA, lai.NIMI AS NIMI, lai.MERKKI AS MERKKI, lai.MALLI AS MALLI, lai.SARJANRO as SARJANUMERO, lai.SIJAINTI AS SIJAINTI, omi.NIMI AS OMISTAJA, kat.SELITE AS KATEGORIA, DATE(var.ALKUPVM) AS ALKUPVM, DATE(var.LOPPUPVM) AS LOPPUPVM, sta.KUVAUS AS STATUS ' +
                'FROM varaus AS var ' +
                'INNER JOIN kayttaja AS kay ON var.KAYTTAJA_ID = kay.KAYTTAJA_ID ' +
                'INNER JOIN laite AS lai ON var.LAITE_ID = lai.LAITE_ID ' +
                'INNER JOIN omistaja AS omi ON lai.OMISTAJA_ID = omi.OMISTAJA_ID ' +
                'INNER JOIN kategoria AS kat ON lai.KATEGORIA_ID = kat.KATEGORIA_ID ' +
                'INNER JOIN status AS sta ON var.STATUS_ID = sta.STATUS_ID ' +
                'WHERE kay.TUNNUS = ?';

            conn.query(query, [req.query.TUNNUS], (err, rows) => {
                if (err) {
                    console.log(err);
                    res.json(err);
                } else {
                    console.log(req.query);
                    res.json(rows);
                }
            })
        },
        fetchFromToReservations: (req, res) => {
            var query = 'SELECT kay.TUNNUS AS KAYTTAJA, lai.NIMI AS NIMI, lai.MERKKI AS MERKKI, lai.MALLI AS MALLI, lai.SARJANRO as SARJANUMERO, lai.SIJAINTI AS SIJAINTI, omi.NIMI AS OMISTAJA, kat.SELITE AS KATEGORIA, DATE(var.ALKUPVM) AS ALKUPVM, DATE(var.LOPPUPVM) AS LOPPUPVM, sta.KUVAUS AS STATUS ' +
                'FROM varaus AS var ' +
                'INNER JOIN kayttaja AS kay ON var.KAYTTAJA_ID = kay.KAYTTAJA_ID ' +
                'INNER JOIN laite AS lai ON var.LAITE_ID = lai.LAITE_ID ' +
                'INNER JOIN omistaja AS omi ON lai.OMISTAJA_ID = omi.OMISTAJA_ID ' +
                'INNER JOIN kategoria AS kat ON lai.KATEGORIA_ID = kat.KATEGORIA_ID ' +
                'INNER JOIN status AS sta ON var.STATUS_ID = sta.STATUS_ID ' +
                'WHERE kay.TUNNUS = ? ' +
                'AND var.ALKUPVM >= ? ' +
                'AND var.LOPPUPVM <= ?';

            conn.query(query, [req.query.TUNNUS, req.query.ALKUPVM, req.query.LOPPUPVM], (err, rows) => {
                if (err) {
                    console.log(err);
                    res.json(err);
                } else {
                    console.log(req.query);
                    res.json(rows);
                }
            })
        }
    }