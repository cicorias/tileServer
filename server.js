var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , BearerStrategy = require('passport-http-bearer').Strategy
  , config = require('./config')
  , controllers = require('./controllers')
  , jwt = require('jsonwebtoken')
  , log = require('winston')
  , middleware = require('./middleware')
  , passport = require('passport')
  , utils = require('./utils');

function rawBody(req, res, next) {
  req.setEncoding('utf8');
  req.rawBody = '';
  req.on('data', function(chunk) {
    req.rawBody += chunk;
  });
  req.on('end', function(){
    next();
  });
}

app.use(express.logger(config.request_log_format));
app.use(express.compress());

app.use(passport.initialize());
app.use(rawBody);

passport.use(new BearerStrategy({}, function(token, done) {
    console.log('token: ' + token);
    console.log('atsk: ' + config.access_token_signing_key);

    jwt.verify(token, config.access_token_signing_key, function(err, jwtToken) {
        console.log('jwt.verify: ' + err);
        if (err) return done(err);

        var principal = {
            id: jwtToken.iss,

            rawJwtToken: token,
            jwtToken: jwtToken
        };

        done(null, principal);
    });
}));

app.enable('trust proxy');
app.disable('x-powered-by');

server.listen(80);

app.get(config.ops_path + '/health', controllers.ops.health);
app.post(config.messages_path, middleware.accessTokenRelay, controllers.messages.create);

log.info("car gateway service has initialized on port 80.");
