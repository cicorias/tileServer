var models = require('../models')
  , mongoose = require('mongoose')
  , JSONAPISerializer = require('jsonapi-serializer');

var create = function(tile, callback) {
    findByTileId(tile.tile_id, function(err, retTile) {
        if (err) return callback(err);
        if (retTile) return callback(null, retTile);

        if (tile.raw.status === "OVER_QUERY_LIMIT") return callback();

        tile._id = new mongoose.Types.ObjectId();
        tile.save(callback);
    });
};

var findByTileId = function(tileId, callback) {
    models.Tile.findOne({ tile_id: tileId }, callback);
};

var find = function(filter, options, callback) {
    models.Tile.find(filter, null, options, callback);
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
    find: find,
    findByTileId: findByTileId,
    fromJsonApi: fromJsonApi,
    toJsonApi: toJsonApi
}
