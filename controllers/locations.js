var request = require('request')
  , models = require('../models')
  , services = require('../services');

var currentLocation = {};

exports.create = function (req, res) {
    console.log(req.body);
    for (var key in req.body) {
        currentLocation = JSON.parse(key);
    }
    console.dir(currentLocation);
};

exports.index = function(req, res) {
    res.send(JSON.stringify(currentLocation));
};
