var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');

//route of files
var kaam0 = require('./routes/kaam0');
var kaam1 = require('./routes/kaam1');
var kaam2 = require('./routes/kaam2');
var kaam3 = require('./routes/kaam3');
var kaam4 = require('./routes/kaam4');
var kaam5 = require('./routes/kaam5');

var port = 3000;

var app = express();

//View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));
//Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Events
app.use('/', kaam0) //display shuffle.html
app.use('/kaam1', kaam1); //Open a file on the server and return it's content:
app.use('/kaam2', kaam2); //invoke python script and get data from it
app.use('/kaam3', kaam3); // login signup verify
app.use('/kaam4', kaam4); //play and download audio file in server
app.use('/kaam5', kaam5); //login signup verify

app.listen(port, function(){
	console.log('Server started on port '+port);
});
