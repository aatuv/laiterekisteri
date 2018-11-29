var conn = require('../db');

module.exports =
    {
        // Tietokantakysely rekisteröitymistä varten
        registeration: (req, res) => {
            conn.query('INSERT INTO kayttaja (NIMI, OSOITE, TUNNUS, SALASANA, PUHNRO) VALUES (?, ?, ?, ?, ?)', [req.body.NIMI, req.body.OSOITE, req.body.TUNNUS, req.body.SALASANA, req.body.PUHNRO], (err, rows) => {
                if (err) {
                    console.log("Virhe rekisteröitymisessä, syy: " + err);
                    res.json(err);
                } else {
                    console.log("Käyttäjä lisätty: " + JSON.stringify(rows));
                    res.statusCode = 201;

                }
            });
        },
        // Palauttaa true, jos req.query.TUNNUS ei löydy tietokannasta. Käytetään tarkistamaan, voiko käyttäjän antamalla tunnuksella rekisteröityä
        checkIfUserExists: (req, res) => {
            conn.query('SELECT * FROM kayttaja WHERE TUNNUS = ? ', [req.query.TUNNUS], (err, rows) => {
                console.log(req.query.TUNNUS);
                console.log(rows);
                if (err) {
                    console.log("Virhe tarkistaessa käyttäjänimen olemassaoloa, syy: " + err);
                    res.json(err);
                }
                if (rows.length) {
                    console.log("Käyttäjänimi on varattu (" + req.query.TUNNUS + ")!");
                    res.send("false");
                } else {
                    console.log("Käyttäjänimi on vapaa (" + req.query.TUNNUS + ")");
                    res.send("true");
                }
            })
            // Palauttaa JSON oliona hakuehtona tulleen tunnuksen mukaisen käyttäjän tiedot
        },
        fetchUser: (req, res) => {
            conn.query('SELECT * FROM kayttaja WHERE TUNNUS = ? ', [req.query.TUNNUS], (err, rows) => {
                if (err) {
                    res.json(err);
                } else {
                    res.json(rows);
                }
            })
        },
        updateUserInformation: (req, res) => {
            conn.query('UPDATE kayttaja SET NIMI = ?, OSOITE = ?, SALASANA = ?, PUHNRO = ? WHERE TUNNUS = ?', [req.body.NIMI, req.body.OSOITE, req.body.SALASANA, req.body.PUHNRO, req.body.TUNNUS], (err, rows) => {
                if (err) {
                    res.json(err);
                } else {
                    console.log(JSON.stringify(rows));
                    res.statusCode = 201;
                }
            })
        }

    }
