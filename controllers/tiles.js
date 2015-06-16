var request = require('request')
  , models = require('../models')
  , services = require('../services');

exports.create = function (req, res) {
    var tile = services.tiles.fromJsonApi(req.body);

    services.tiles.create(tile, function(err, tile) {
        if (err) return res.send(400, err);

        services.tiles.toJsonApi(tile, function(tileJsonApi) {
            res.send(tileJsonApi);
        });
    });
};

exports.show = function(req, res) {
    services.tiles.findByTileId(req.params.id, function(err, tile) {
        if (err) return res.send(400, err);
        if (!tile) return res.send(404);

        services.tiles.toJsonApi(tile, function(tileJsonApi) {
            res.send(tileJsonApi);
        });
    });
};