var express = require('express');
var morgan = require('morgan');
// var authRouter = require('./auth/auth-router.js');
// var apiRouter = require('./api/api-router.js');
// var accountRouter = require('./account/account-router.js');
// var path = require('path');

var app = express();

app.use(morgan('combined'));

app.use(express.static(__dirname + '/../dist'));
// app.use(express.static(path.join(__dirname + '/../dist')));



// app.get('/api/pages', function (req,res) {
//   res.redirect('./account/login');
// });

// app.use('/account', accountRouter);

// //router for handling authentication
// app.use('/api', authRouter);

// //router for handling api calls to our server
// app.use('/api', apiRouter);


app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});


// export app for testing and flexibility
module.exports = app;
