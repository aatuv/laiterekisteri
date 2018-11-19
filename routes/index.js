var express = require('express');
var router = express.Router();

/*kotisivu*/
router.get('/', loggedIn, (req, res, next) => {
    res.render('home', {title: 'Laiterekisteri', username: req.user.TUNNUS, errors: req.session.errors});
    req.session.errors = null;
    error = null;
    
})

function loggedIn (req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}
function redirectIfLogged (req, res, next) {
    if (req.user) {
        res.redirect('/');
    } else {
        next();
    }
}

router.get('/login', redirectIfLogged, (req, res, next) => {
    res.render('login', {title: 'Laiterekisteri', success: req.session.success, errors: req.session.errors, error: req.flash('error')});
    req.session.errors = null;
    error = null;
});
module.exports = router;