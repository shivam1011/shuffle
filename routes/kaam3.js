var express = require('express');
var router = express.Router();

router.post('/add_to_history', function(req, res){
	console.log("Reached here");
	console.log(req.body.song);
	console.log("User: "+req.session.user.userid);
	var historyData=[[],[]]
	
	var songID = ""
	var songIDFinder = function(){
		var query ={"FIELD3":req.body.song}
		db.collection("songs").findOne(query, function(err, result) {
			if (err) throw err
			if(result!=null) {
				//songID = require('mongodb').ObjectID(result["_id"]);
				songID = result["_id"]
			}
		})
	}

	var finder = function(){
		console.log("wowie")
		var query ={"userid":req.session.user.userid}
		db.collection("profiles").findOne(query, function(err, result) {
		if (err) throw err
		if(result!=null) {
			console.log('Found user.')
			if(result.history!=undefined)
			{
				historyData[0]=result.history
				historyData[1]=result.timeStamp
			}
			historyData[0].push(songID)
			historyData[1].push((new Date()).toString())
			console.log("Andar: "+historyData)
			
			var updater1 = function(){
				console.log("Bahar: "+historyData)
				var myquery = { userid : req.session.user.userid };
				var newvalues = { $set: { history: historyData[0] } };
				db.collection("profiles").updateOne(myquery, newvalues, function(err, res) {
					console.log("History Updated Successfully!")
				})
			}
			var updater2 = function(){
				console.log("Bahar: "+historyData)
				var myquery = { userid : req.session.user.userid };
				var newvalues = { $set: { timeStamp: historyData[1] } };
				db.collection("profiles").updateOne(myquery, newvalues, function(err, res) {
					console.log("Timestamp Updated Successfully!")
				})
				var response = {
					status  : 200,
					success : 'Updated Successfully'
				}
				res.end(JSON.stringify(response));
			}
			updater1()
			updater2()
		}
		else{
			console.log("Chutzpah: "+result)
		}
		})
	}
	//update history
	console.log("...")
	//while(historyData.length==0)
		console.log("...")
	songIDFinder()
	finder()
})


router.post('/load_history', function(req, res){
	var history=""
	var timeStamp=""
	console.log("WTF!!!!!")
	item = [[],[]]

	var parse_history = function(){
		console.log("Nahiiiiiiii")
		
		//get this item from database
		var song=""
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
				//console.log("Nahi hua randaap")
				song = result
				//console.log(result)
				item[0].push(song)
				item[1].push(timeStamp[i])

			}
			else{
				//console.log("Ho gaya randaap")
				//console.log("***ITEM-BA***\nafter song getter"+item)
				//return res.end(JSON.stringify(item))
			}
			if(i<history.length-1)
				song_getter(i+1, history[i+1])
			else{
				/*
				console.log("***ITEM-BA***after song getter[0]: "+item[0])
				console.log("***ITEM-BA***after song getter[1]: "+item[1])
				console.log("***ITEM-BA***after song getter: "+JSON.stringify(item))
				*/
				return res.end(JSON.stringify(item))
			}
		});
	};
	
	var executor = function(){
		var query ={"userid":req.session.user.userid}
		db.collection("profiles").findOne(query, function(err, result) {
			console.log("Chalo, chudne se to bache!")
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