var conn = require('../db');

module.exports = 
{
    fetchOwners: (req, res) => {
        conn.query('SELECT * FROM omistaja', (err, rows) => {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        })
    },
    fetchCategories: (req, res) => {
        conn.query('SELECT * FROM kategoria', (err, rows) => {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        })
    }
}