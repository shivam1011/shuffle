var express = require('express');
var router = express.Router();
/*
var fs = require('fs');

router.get('/', function(req, res, next){
	fs.readFile('public/data.json', function(err, data) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(data.songs);
	console.log(data.songs);
	return res.end();
	});
});
*/
//read from songs collections and return json
router.get('/', function(req, res, next){
	console.log("okay")

	var cursor = db.collection('songs').find();
	
	// Execute the each command, triggers for each document
	var result=[]
	cursor.each(function(err, item) {
		result.push(item)
		if(item == null) {
			console.log("Before return: "+result[0]["FIELD2"])
			return res.end(JSON.stringify(result))
		}
		//console.log(item)
		//return res.end(JSON.stringify(result))
	})
})

module.exports = router;