//this will insert signup details in mongo

var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://localhost:27017/db2', (err, database) => {
  if (err) return console.log(err)
  db = database
})

router.post('/signup', (req, res) => {
  db.collection('profiles').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

router.post('/login', (req, res) => {
  var cursor = db.collection('profiles').find()
  var userid = req.body.userid
  db.collection('profiles').findOne({"userid":userid},{"password": req.body.password}, function(err, result) {
    if (err) throw err
    if(result!=null) console.log(result.userid+' logged in.')
    else console.log("User Not Found!")
    //db.close()
  });
  console.log('USER LOGGED IN MUTHAFUCKAH!!!')
  //console.log(cursor)
  res.redirect('/home')
})

module.exports = router;
