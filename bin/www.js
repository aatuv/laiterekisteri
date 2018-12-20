var app = require('../app');
var http = require('http');

// portti
const port = process.env.PORT || 3001;

// luodaan serveri
var server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server running AT http://localhost:${port}`)
});
// server.on('error', onError);
// server.on('listening', onListening);