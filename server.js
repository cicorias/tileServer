var express = require('express')
  , app = express()
  , config = require('./config')
  , server = require('http').createServer(app)
  , controllers = require('./controllers');

var mongoose = require('mongoose');

console.log('connecting to MongoDB: ' + config.MONGODB_CONNECTION_STRING);
mongoose.connect(config.MONGODB_CONNECTION_STRING);

app.use(express.logger());
app.use(express.bodyParser());

app.get('/tiles/:id',  controllers.tiles.show);
app.post('/tiles', controllers.tiles.create);

server.listen(config.PORT);

console.log('tile server listening on port: ' + config.PORT);
