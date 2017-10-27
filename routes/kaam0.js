var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next){
	req.session.destroy();
	res.render('index.html');
});

router.get('/aboutus', function(req, res, next){
	res.render('aboutus.html');
});

router.get('/dashboard', function(req, res, next){
	res.render('dashboard.html');
});

router.get('/discover', function(req, res, next){
	res.render('discover.html');
});

router.get('/home', function(req, res, next){
	res.render('home.html');
});

router.get('/playlists', function(req, res, next){
	res.render('playlists.html');
});

router.get('/history', function(req, res, next){
	res.render('history.html');
});

module.exports = router;
