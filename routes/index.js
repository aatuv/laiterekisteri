var express = require('express');
var router = express.Router();

// kotisivu HUOM: username
router.get('/', loggedIn, (req, res, next) => {
    let admin = false;
    if (req.user.TUNNUS === "admin") {
        admin = true;
    }
    res.render('home', {title: 'Laiterekisteri', admin: admin, username: req.user.TUNNUS, errors: req.session.errors});
    req.session.errors = null;
    error = null;
    
})

// Jos käyttäjä ei ole kirjautunut, uudelleenohjataan kirjautumissivulle
function loggedIn (req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}
// jos käyttäjä on kirjautunut ja pyrkii palaamaan kirjautumissivulle => uudelleenohjataan etusivulle
function redirectIfLogged (req, res, next) {
    if (req.user) {
        res.redirect('/');
    } else {
        next();
    }
}

// tarkistetaan, onko käyttäjä kirjautunut, renderöidään handlebars-tiedosto "login": 
// viedään sessio-muuttujina success-status, express-validatorin virheilmoitukset "errors" (ovatko kirjautumiskentät tyhjiä)
// ja connect-flashin virheilmoitus "error" (onko käyttäjänimi varattu)
router.get('/login', redirectIfLogged, (req, res, next) => {
    res.render('login', {title: 'Laiterekisteri', success: req.session.success, errors: req.session.errors, error: req.flash('error')});
    req.session.errors = null;
    error = null;
});
module.exports = router;