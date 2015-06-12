var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , controllers = require('./controllers');

server.listen(3030);

app.get('/tile/:id', controllers.tiles.show);

console.log("tile gateway service has initialized on port 3030.");
