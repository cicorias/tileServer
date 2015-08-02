var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , controllers = require('./controllers');

var mongoose = require('mongoose');

//console.log('connecting to MongoDB: ' + process.env.MONGODB_CONNECTION_STRING);
//mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
        res.send(200);
    } else {
        next();
    }
});
app.use(express.logger());
app.use(express.bodyParser());

app.get('/location',  controllers.locations.index);
app.post('/location',  controllers.locations.create);

app.get('/tiles/:id',  controllers.tiles.show);
app.get('/tiles',  controllers.tiles.index);
app.post('/tiles', controllers.tiles.create);

server.listen(process.env.PORT);

console.log('tile server listening on port: ' + process.env.PORT);
