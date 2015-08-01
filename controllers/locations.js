var request = require('request')
  , models = require('../models')
  , services = require('../services');

var currentLocation = {};

exports.create = function (req, res) {
    currentLocation = services.tiles.fromJsonApi(req.body);
    console.dir(currentLocation);
};

exports.index = function(req, res) {
    res.send(JSON.stringify(currentLocation));
};
