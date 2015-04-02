var http = require('http');
var app = require('./app-config.js');

var port = process.env.PORT || 8000;
http.createServer(app).listen(port);
console.log('Server now listening on port ' + port);



// // Initial simple router 
// var express = require('express');
// var morgan = require('morgan');

// var app = express();

// app.use(morgan('combined'));

// app.use(express.static(__dirname + '/../dist'));
// app.set('port', (process.env.PORT || 5000));

// app.listen(app.get('port'), function() {
//   console.log("Node app is running at localhost:" + app.get('port'));
// });

// // export app for testing and flexibility
// module.exports = app;
