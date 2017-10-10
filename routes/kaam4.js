var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', function(req, res, next){
	res.render('player.html');
});

router.get('/gaana', function(req, res, next){
	fs.readFile('myFiles/songs/NaJa.mp4', function(err, data) {
	res.writeHead(200, {'Content-Type': 'video/mp4'});
	res.write(data);
	return res.end();
	});
});

module.exports = router;