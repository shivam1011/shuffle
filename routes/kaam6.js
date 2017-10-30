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

router.get('/get_all_usernames', function(req, res){
	console.log("Getting all usernames...")
	var cursor = db.collection('profiles').find();
	var result=[]
	cursor.each(function(err, item) {
        if(item == null) {
			//console.log("Before return: "+result[0])
            return res.end(JSON.stringify(result))
        }
        result.push(item.userid)
	})
})    


router.post('/get_data_for_triplet', function(req, res){
	var history=""
	var timeStamp=""
	console.log("get_data_for_triplet initiated for: "+req.body.userid)
	item = [[],[]]

	var parse_history = function(){
		//console.log("Nahiiiiiiii")
		
		//get this item from database
        var song=""
        if(history==undefined)
        {
            console.log("Mil gaya randaap")
            return res.end(JSON.stringify("none"))
        }
        else
            console.log(history[0])
		song_getter(0, history[0]);
	}
	
	var song_getter = function(i, itemID){
		/*if(i==history.length)
		{
			console.log("***ITEM-BA***\nafter song getter"+item)
			return res.end(JSON.stringify(item))
		}
		*/
		if(itemID.length<5)
			itemID = "12345"
		var query ={"_id":itemID}
		db.collection("songs").findOne(query, function(err, result) {
			if (err) {
				throw err
			}
			if(result!=null) {
				console.log("Nahi hua randaap")
				song = result
				console.log(result)
				item[0].push(song)
				item[1].push(timeStamp[i])
			}
			if(i<history.length-1)
				song_getter(i+1, history[i+1])
			else{
                console.log("Success!")
				return res.end(JSON.stringify(item))
			}
		});
	};
	var executor = function(){
		var query ={"userid":req.body.userid}
		db.collection("profiles").findOne(query, function(err, result) {
			//console.log("Chalo, chudne se to bache!")
			if (err) throw err
			if(result!=null) {
				history = result.history
				timeStamp = result.timeStamp
				parse_history()
			}
		})
	}
	executor()
})


module.exports = router;