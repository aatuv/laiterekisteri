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
module.exports = router;