var conn = require('../db');
var localStrategy = require('passport-local').Strategy;

module.exports = (passport) =>
{
// talletetaan KAYTTAJA_ID sessioon
passport.serializeUser((user, done) => {
    done(null, user.KAYTTAJA_ID);
})
// otetaan passport.serializeUser:n done funktioon annettu avain ja kiinnitetään sen mukainen käyttäjä requestiin (req.user)
passport.deserializeUser((id, done) => {
    conn.query("SELECT * FROM kayttaja WHERE KAYTTAJA_ID = " + id, (err, rows) => {
        done(err, rows[0]);
    });
});

passport.use('local', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, (req, username, password, done) => {

    if (!username || !password) {
        return done(null, false);
    }

    conn.query("SELECT * FROM kayttaja WHERE TUNNUS = ?", [username], (err, rows) => {
        if (err) return done();

        if (!rows.length) {
            return done(null, false, { message: 'Virheellinen käyttäjätunnus.' });
        }

        var dbPassword = rows[0].SALASANA;

        if (!(dbPassword == password)) {
            return done(null, false, { message: 'Virheellinen salasana.' });
        }

        console.log(rows[0]);
        return done(null, rows[0]);
    })
})); // localStrategy
}