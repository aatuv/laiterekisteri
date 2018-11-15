'use strict'

// Asenna ensin mysql driver 
// npm install mysql --save

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',  // HUOM! Älä käytä root:n tunnusta tuotantokoneella!!!!
  password : '',
  database : 'laiterekisteri'
});

module.exports = 
{
    fetchAll: function(req, res){
        console.log("query (GET): " + JSON.stringify(req.query));
        // HUOM! Hakuehtoja EI oteta tässä versiossa huomioon

        connection.query('SELECT Nimi, Osoite, Tunnus, Salasana, Puhnro, FROM Kayttaja', function(error, results, fields){
            // error will be an Error if one occurred during the query
            // results will contain the results of the query
            // fields will contain information about the returned results fields (if any)
            if ( error ){
                console.log("Virhe haettaessa dataa Asiakas-taulusta, syy: " + error);
                //res.send(error);
                res.send(JSON.stringify({"status": 500, "error": error, "response": null})); 
            }
            else
            {
                console.log("Data = " + JSON.stringify(results));
                //res.json(results);
                res.statusCode = 200;
                res.send(results);
            }
      });
    },
    create: function(req, res){

        console.log("body (CREATE): " + JSON.stringify(req.body));
        let c = req.body;

        connection.query('INSERT INTO Kayttaja (Nimi, Osoite, Tunnus, Salasana, Puhnro) VALUES (?, ?, ?, ?, ?)', [c.Nimi, c.Osoite, c.Tunnus, c.Salasana, c.Puhnro],
          function(error, results, fields){
          if ( error ){
            console.log("Virhe lisättäessä dataa Kayttaja-tauluun, syy: " + error);
            res.json(error);
          }
          else
          {
            console.log("Data = " + JSON.stringify(results));
            res.statusCode = 201;
            c.Avain = results.insertId;
            res.json(c);
          }
      });
    }






}