var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
//var popupS = require('popups');
var session = require('client-sessions');
var cookieParser = require('cookie-parser');
var session = require('express-session');

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

/*session init
app.use(session({
	cookieName: 'session',
	secret: 'bakchodi',
	duration: 30 * 60 * 1000,
	activeDuration: 5 * 60 * 1000,
  }));
*/
app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));

const MongoClient = require('mongodb').MongoClient

db=""

MongoClient.connect('mongodb://localhost:27017/db2', (err, database) => {
  if (err) return console.log(err)
  db = database
})

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