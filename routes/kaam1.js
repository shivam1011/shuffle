var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res, next){
	fs.readFile('myFiles/data.json', function(err, data) {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(data);
	return res.end();
	});
});

module.exports = router;