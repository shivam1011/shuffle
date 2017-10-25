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
    //popupS.alert({content: 'saved to database'});
    res.redirect('/')
  })
})

router.post('/login', (req, res) => {
  console.log("aye hye")
  var cursor = db.collection('profiles').find()
  var userid = req.body.userid
  console.log(userid)
  var datum = ""
  var login_status = false
  db.collection('profiles').findOne({"userid":userid},{"password": req.body.password}, (function(err, result) {
    if (err) throw err
    if(result!=null) {
      console.log('User logged in.')
      datum = userid + " logged in!"
      login_status = true
      req.session.user = JSON.stringify(result)
      console.log("session stored")
      console.log(req.session.userid)
    }
    else{
      console.log("User Not Found!")
      datum+="User Not Found!"
    }
    var response = {
      status  : 200,
      success : 'Updated Successfully',
      data : datum,
      login : login_status
    }
    res.end(JSON.stringify(response));
    //db.close()
  }));
  //res.write(userid)
  //console.log(cursor)
  //yahaan pe session variable mein saara randaap load karenge where randaap= json mein songs + user ki profile
})

router.get('/set_profile', (req, res) => {
  var datum = {
    userid : req.session.userid,
    name : req.session.name,
    address : req.session.address,
    Country : req.session.Country,
    Zipcode : req.session.Zipcode,
    email : req.session.email,
    english : req.session.english
  }
  var response = {
    status  : 200,
    success : 'Updated Successfully',
    data : datum
  }
  res.end(JSON.stringify(response));
  })

module.exports = router;