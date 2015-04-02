var express = require('express');
var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
// var secrets = require('./secrets/drive.secret');
var authHelper = require('./auth-helper.js');
var oauth2Client = new OAuth2(secrets.CLIENT_ID, secrets.CLIENT_SECRET, secrets.REDIRECT_URL);

var scopes = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/userinfo.profile'
];

// var driveRouter = require('./drive-router.js');
// authRouter.use('/google', driveRouter);

var authRouter = express.Router();

// authRouter.use('/test', function(req,res) {
//   console.log('received');
//   res.end('working');
// });

authRouter.get('/logout', function(req, res) {
  // log the user out & destroy the token
});


var url = oauth2Client.generateAuthUrl({
  access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
  approval_prompt: 'force',
  scope: scopes
});

var driveRouter = express.Router();

driveRouter.get('/', function(req, res) {
  res.redirect(url);
});

driveRouter.get('/callback', function(req, res){
  var code = req.query.code;
  oauth2Client.getToken(code, function(error, tokens) {
    if (error) {res.send(error)};

    // var accessAndRefreshTokens = {
    //  accessToken: tokens.access_token,
    //  refreshToken: tokens.refresh_token
    // };


    res.send(authHelper.tokenSaverMaker('drive', tokens.access_token, '/auth/dropbox/'));
    // res.sendFile(__dirname +'/');
  });
});



driveRouter.get('/index', function(req, res){
  res.sendFile(__dirname +'/');
});


module.exports = authRouter;
