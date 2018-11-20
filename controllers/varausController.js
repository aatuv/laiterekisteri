var conn = require('../db');

module.exports = 
{
    fetchReservations: (req, res) => {
        conn.query('SELECT NIMI, TUNNUS ')
    }
}