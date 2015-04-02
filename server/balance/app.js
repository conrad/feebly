var app = require('./app-config.js');
var https = require('https');
var http = require('http');
var fs = require('fs');


var port = process.env.PORT || 8000;

// Options is the main difference between http & https create server calls
var options = {
  key: fs.readFileSync('./secrets/key.pem'),
  cert: fs.readFileSync('./secrets/cert.pem')
};

http.createServer(app).listen(port);
// Create an HTTPS service
// https.createServer(options, app).listen(port);


console.log('Server now listening on port ' + port);
