var config = require('../config')
  , request = require('request')
  , utils = require('../utils');

exports.create = function(req, res) {
        console.log(req.rawBody);
	var lines = req.rawBody.split('\n');
	var messages = [];

	lines.forEach(function(line) {
		var pidPairs = line.split(';');

		var message = {
			body: {}
		};

		pidPairs.forEach(function(pidPair) {
			var pair = pidPair.split(',');

                        if (pair.length !== 2) return;

                        console.log(pair);

			var key = pair[0];
                        var value;
 
                        if (pair[1].length > 0 && pair[1][0] === '"') {
                          value = pair[1].replace("\u0000","").replace('"','').replace('"','').toString();
                        } else {
			  value = parseFloat(pair[1]);
			  if (isNaN(value))
			    value = pair[1];
                        }

			if (key === 'type' || key === 'ts')
			  message[key] = value;
			else
			  message.body[key] = value;
		});

                if (message['ts']) console.log(message['ts']);
	        if (message['type']) messages.push(message);	
	});

       console.dir(messages);

        request.post('https://messaging-production.nitrogen.io/api/v1/messages', {
            json: messages,
            headers: {
                Authorization: 'Bearer ' + req.user.rawJwtToken
            }   
        }, function(err, resp, body) {
           if (err) return utils.handleError(res, err);

           res.send(200);
        }); 

};
