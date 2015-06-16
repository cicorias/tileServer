var assert = require('assert')
  , app = require('../../server')
  , config = require('../../config')
  , models = require('../../models')
  , request = require('request')
  , services = require('../../services');

describe('tiles endpoint', function() {
    it('can create tile', function(done) {
        var tilesEndpoint = config.API_ENDPOINT + '/tiles';

        request.post(tilesEndpoint, {
            json: {
                data: {
                    type: 'tile',
                    attributes: {
                        tile_id: '16_25464_10645',
                        locality: "Barcelona",
                        administrative_area_level_2: "Barcelona",
                        administrative_area_level_1: "Catalunya",
                        country: "Spain",
                        raw: '{"raw":"json"}'
                    }
                }
            }
        }, function(err, resp, body) {
            assert(!err);
            assert.equal(resp.statusCode, 200);

            assert.equal(body.data.type, 'tiles');
            assert.equal(body.data.attributes.locality, 'Barcelona');

            done();
        });
    });

    it('can find by tile', function(done) {
        request.get(config.API_ENDPOINT + '/tiles/16_25464_10645', function(err, resp, body) {
            assert(!err);
            assert.equal(resp.statusCode, 200);

            done();
        });
    });
});