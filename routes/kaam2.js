var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next){
	//res.render('shuffle.html');
	var MC = '';
	var data='';
	const execFile = require('child_process').execFile;
	const child = execFile('python3', ['myFiles/pyScripts/py_recom.py'], (error, stdout, stderr) => {
    if (error) {
        console.error('stderr', stderr);
        throw error;
    }
    console.log('stdout: ', stdout);
	console.log(JSON.stringify(stdout));
	console.log('Done Child');
	data+=JSON.stringify(stdout);
	data+=MC;
	res.write(data);
	console.log(data);
	return res.end();
	});
    
	console.log('Done Parent');
	
});

module.exports = router;
