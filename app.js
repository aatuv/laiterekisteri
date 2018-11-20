// vaaditut moduulit

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var exhbs = require('express-handlebars');
var expressValidator = require('express-validator');
var expressSession = require('express-session');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');

require('./config/passport')(passport);

// reititykset
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// handlebarsin asettaminen view engineksi
app.engine('.handlebars', exhbs({extname: '.handlebars', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('view engine', '.handlebars');
app.set('views', path.join(__dirname, 'views'));

// staattiset filut
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// käyttäjäsyötteen oikeellisuuden varmistusta varten
app.use(expressValidator());
app.use(express.static(path.join(__dirname, 'public')));

// luodaan sessio
app.use(expressSession({
    secret: 'topSecretInformation',
    saveUninitialized: true,
    resave: true,
    maxAge: Date.now() + (30 * 86400 * 1000) 
}));

// käytetään käyttäjän
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/', users);

// 404
app.use(function(req, res, next) {
    return res.status(404).send({ message: 'Requested route '+req.url+' was not found' });
  });
  
  // 500
  app.use(function(err, req, res, next) {
    return res.status(500).send({ message: 'mitä vittua' });
  });

module.exports = app;