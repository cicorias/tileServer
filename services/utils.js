var log = require('winston');

var configCheck = function() {
    if (!process.env.API_ENDPOINT) {
        log.warn("API_ENDPOINT not specified -> using http://localhost:3030");
        process.env.API_ENDPOINT = "http://localhost:3030";
    }

    if (!process.env.MONGODB_CONNECTION_STRING) {
        log.warn("MONGODB_CONNECTION_STRING not specified -> using mongodb://localhost/tiles");
        process.env.API_ENDPOINT = "mongodb://localhost/tiles";
    }

    if (!process.env.PORT) {
        log.warn("PORT not specified -> using 3000");
        process.env.PORT = 3000;
    }

    if (!process.env.ACCESS_TOKEN_SIGNING_KEY) {
        log.warn("ACCESS_TOKEN_SIGNING_KEY not specified -> using 'NOT_SECURE_SIGNING_KEY'");
        process.env.ACCESS_TOKEN_SIGNING_KEY = 'NOT_SECURE_SIGNING_KEY';
    }
}