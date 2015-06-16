var config = require('../config')
  , models = require('../models')
  , mongoose = require('mongoose')
  , JSONAPISerializer = require('jsonapi-serializer');

var create = function(tile, callback) {
    findByTileId(tile.tile_id, function(err, retTile) {
        if (err) return callback(err);
        if (retTile) return callback(null, retTile);

        tile._id = new mongoose.Types.ObjectId();
        tile.save(callback);
    });
};

var findByTileId = function(tileId, callback) {
    models.Tile.findOne({ tile_id: tileId }, callback);
};

var fromJsonApi = function(body) {
    if (body.data.type !== 'tile') return null;

    var tile = new models.Tile({
        _id: body.data.id
    });

    for (var key in body.data.attributes) {
        tile[key] = body.data.attributes[key];
    }

    return tile;
};

var toJsonApi = function(tile, callback) {
    var tileObj = tile.toObject();

    new JSONAPISerializer('tiles', tileObj, {
        apiEndpoint: config.API_ENDPOINT,
        attributes: [
            'tile_id',
            'country',
            'administrative_area_level_1',
            'administrative_area_level_2',
            'locality',
            'raw'
        ]
    }).then(callback);
};

module.exports = {
    create: create,
    findByTileId: findByTileId,
    fromJsonApi: fromJsonApi,
    toJsonApi: toJsonApi
}
