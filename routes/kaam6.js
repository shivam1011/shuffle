var express = require('express');
var router = express.Router();

router.post('/search', function(req, res){
    console.log("Ab Dekhte Hain!")
    
    var cursor = db.collection('songs').find({"FIELD3": {$regex: req.body.inp}});
    
    // Execute the each command, triggers for each document
    var item=[[],[]]
    cursor.each(function(err, result) {

        if(result == null) {
            console.log("Before return: "+JSON.stringify(item))
            return res.end(JSON.stringify(item))
        }
        item[0].push(result)
        item[1].push("yo")
        
        //console.log(item)
        //return res.end(JSON.stringify(result))
    })
})

module.exports = router;