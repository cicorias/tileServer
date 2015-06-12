var fs = require('fs')
  , request = require('request')
  , Tile = require('../tile');

function fetchTile(id, callback) {
    var tile = Tile.tileFromTileId(id);

    var url = "http://maps.google.com/maps/api/geocode/json?latlng=" + tile.centerLatitude + "," + tile.centerLongitude + "&sensor=false";

    request.get(url, function(err, httpResponse, body) {
        if (err) return callback(err);

        var json = JSON.parse(body);

        if (json.status !== 'OK' && json.status !== 'ZERO_RESULTS') return callback(json.status);

        json.parsed = {};

        if (json.results.length > 0) {
        	json.results[0].address_components.forEach(function(component) {
        		component.types.forEach(function(type) {
        			if (type === 'locality' || type === 'administrative_area_level_2' ||
        				type === 'administrative_area_level_1' || type === 'country') {
        				json.parsed[type] = component.long_name;
        			}
        		});
        	});
        }

        fs.writeFile('tiles/' + id, JSON.stringify(json), callback);
    });
}

exports.show = function(req, res) {
    console.log(req.params.id);
    fs.exists('tiles/' + req.params.id, function(exists) {
 
        var fetchFunc = !exists ? fetchTile : function(id, callback) { callback() };

        fetchFunc(req.params.id, function(err) {
                
        	if (err) {
                    console.log('fetch failed: ' + err);
                    return res.send(500, err);
                }

        	fs.readFile('tiles/' + req.params.id, {encoding: 'utf8'}, function (err, file) {
        		if (err) return res.send(500, err);

                        var tile = JSON.parse(file);

        		if (exists) {
                             console.log('already exists');
        		     tile.exists = true;
                        } else {
                             console.dir(tile.parsed);
                        }
                                
        		return res.send(200, JSON.stringify(tile));
        	});
        });
    });
};
