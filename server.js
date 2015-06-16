var express = require('express')
  , app = express()
  , config = require('./config')
  , server = require('http').createServer(app)
  , controllers = require('./controllers');

var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/tiles");

app.use(express.bodyParser());

app.get('/tiles/:id',  controllers.tiles.show);
app.post('/tiles', controllers.tiles.create);

server.listen(config.PORT);

console.log('tile server listening on port: ' + config.PORT);
