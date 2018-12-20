var db = require('./db')
module.exports.usernameExists = (username, callback) => {
db.query("SELECT * FROM kayttaja WHERE TUNNUS = ?", username, (err, results) => {
    if (err) throw err;

    if(results.length != 0) {
        return false;
    } else {
        return true;
    }
});


}