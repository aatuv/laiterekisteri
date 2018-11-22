var express = require('express');
var passport = require('passport');
var router = express.Router();
var kayttajaController = require('../controllers/kayttajaController');

// Käyttäjä painanut kirjaudu-nappia
router.post('/signin', (req, res, info) => {
    req.checkBody('username', 'Syötä käyttäjätunnus.').notEmpty();
    req.checkBody('password', 'Syötä salasana.').notEmpty();

    var errors = req.validationErrors();

    // jos jompi kumpi kirjautumiskentistä tyhjä (tai molemmat)
    if (errors) {
        req.session.errors = errors;
        req.session.success = false;
        res.redirect('/login');
    } else { // jos käyttäjä syötti kumpaankin kenttään arvon
        passport.authenticate('local', { // /config/passport.js
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res);
        console.log(req.user);
    }
});

// palauttaa nykyisen käyttäjän tiedot json-objektina, jos löytyy
router.get('/current_user', (req, res) => {

    if (req.user === undefined) { // käyttäjä ei ole kirjautunut
        res.json({});
    } else {
        res.json(
            {
                name: req.user.NIMI,
                address: req.user.OSOITE,
                telephone: req.user.PUHNRO
            }
        )
    }
});

router.get('/logout', (req, res) => {
    console.log("/logout kutsuttu ");
    req.logout();
    res.redirect('/login');
});

router.route('/signup').post(kayttajaController.registeration);
router.route('/checkuser').get(kayttajaController.checkIfUserExists);
router.route('/user').get(kayttajaController.fetchUser);

module.exports = router;