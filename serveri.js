var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session'); // npm install express-session

var app = express();

app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

const http = require('http');

const hostname = '127.0.0.1';
const port = process.env.PORT || 3001;

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(session({
    secret: 'secretinformation',
    resave: false,
    saveUninitialized: true
  }))

// Staattiset filut
//app.use(express.static('public'));

app.use(allowCrossDomain);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

global sess;
app.get('/', (req, res) => {
  sess = req.session;

  if (sess.username) {
    res.redirect('/client');
  } else {
    res.render('index.html');
  }
})
app.route('/login')
.post(loginController.authenticate);


app.listen(port, hostname, () => {
  console.log(`Server running AT http://${hostname}:${port}/`);
});

/*
app.listen(port, () => {
    console.log(`Server running AT http://${port}/`);
  });
*/  