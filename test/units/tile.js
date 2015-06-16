var assert = require('assert')
  , app = require('../../server')
  , models = require('../../models')
  , services = require('../../services');

describe('tiles service', function() {
    it('can create tile', function(done) {

        var tile = models.Tile({
            tile_id: '16_25464_10645',
            locality: "Barcelona",
            administrative_area_level_2: "Barcelona",
            administrative_area_level_1: "Catalunya",
            country: "Spain",
            raw: '{"raw":"json"}'
        });

        services.tiles.create(tile, function(err, tile) {
            assert(!err);
            assert(tile._id);

            assert.equal(tile.locality, "Barcelona");

            done();
        });
    });

    it('can find by tile', function(done) {
        services.tiles.findByTileId('16_25464_10645', function(err, tile) {
            assert(!err);
            assert(tile);

            assert.equal(tile.locality, "Barcelona");

            done();
        });
    });
});