var async = require('async');
var request = require('request');
var fs = require('fs');

var results = {};
var arrayResults = [];

fs.readdir('tiles/', function(err, tileFiles) {
   async.eachLimit(tileFiles, 10, function(tileFile, fileCallback) {
       console.log(tileFile);

       var tileFileContent = fs.readFileSync('tiles/' + tileFile, 'utf8');
       if (tileFileContent.length === 0) return;

       var tileJson = JSON.parse(tileFileContent);

       var postJson = {
           data: {
               type: 'tile',
               attributes: {
                   tile_id: tileFile,
                   locality: tileJson.parsed.locality,
                   administrative_area_level_2: tileJson.parsed.administrative_area_level_2,
                   administrative_area_level_1: tileJson.parsed.administrative_area_level_1,
                   country: tileJson.parsed.country,
                   raw: tileFileContent
               }
           }
       };

       request.post('http://localhost:3000/tiles', {
            json: postJson 
       }, function(err, resp, body) {
           console.log(err);
	   return fileCallback();
       });
   });
});
