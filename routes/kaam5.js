//this will insert signup details in mongo

var express = require('express');
var router = express.Router();



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
  //console.log(stream.write())
  var cursor = db.collection('profiles').find()
  var userid = req.body.userid
  console.log(userid)
  var datum = ""
  var login_status = false
  var query ={"userid":userid ,"password": req.body.password}
  db.collection("profiles").findOne(query, function(err, result) {
    if (err) throw err
    if(result!=null) {
      console.log('User logged in.')
      datum = userid + " logged in!"
      login_status = true
      req.session.user = result//JSON.stringify(result)
      res.locals.user = JSON.stringify(result)
      console.log("session stored")
      console.log(result.userid)
      console.log("\n***\n")
      console.log(req.session.user)
      console.log(req.session.user.userid)
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
    //db.close()
    res.end(JSON.stringify(response));
  });
  //res.write(userid)
  //console.log(cursor)
  //yahaan pe session variable mein saara randaap load karenge where randaap= json mein songs + user ki profile
})

router.get('/set_profile', (req, res) => {
  var datum = {
    userid : req.session.user.userid,
    name : req.session.user.name,
    address : req.session.user.address,
    Country : req.session.user.Country,
    Zipcode : req.session.user.Zipcode,
    email : req.session.user.email,
    english : req.session.user.english
  }
  var response = {
    status  : 200,
    success : 'Updated Successfully',
    data : datum
}
  res.end(JSON.stringify(response));
  })
  module.exports = router;