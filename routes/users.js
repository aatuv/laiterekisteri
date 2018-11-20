var express = require('express');
var passport = require('passport');
var router = express.Router();

router.post('/signin', (req, res, info) => {
    req.checkBody('username', 'Syötä käyttäjätunnus.').notEmpty();
    req.checkBody('password', 'Syötä salasana.').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        req.session.errors = errors;
        req.session.success = false;
        res.redirect('/login');
    } else {
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res);
    }
});
router.post('/signup', (req, res, info) => {
    req.checkBody('nimi').notEmpty();
    req.checkBody('osoite').notEmpty();
    req.checkBody('tunnus').notEmpty();
    req.checkBody('tunnus').isLength({min: 4, max: 10});
    req.checkBody('salasana').notEmpty();
    req.checkBody('salasana')
})
module.exports = router;