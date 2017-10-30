function set_profile_bar()
{
    try{
    $.ajax({
        url: "/kaam5/set_profile",
        type: "GET",
        data: '',
        dataType: "json",
        success: function (result) {
         // Write something here
		 //alert(result["data"])
		 var name = ""
         for (i=0; result["data"]["name"][i]!=null; i++)
            name += result["data"]["name"][i] + " "
		 var userid = result["data"]["userid"]
		 document.getElementById("dev_profile").innerHTML = name+" "+"("+userid+")";
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            alert("Status: " + textStatus); alert("Error: " + errorThrown); 
    }})
    }
    catch(e){alert(e)}
}

function play_load_gif()
{
	document.getElementById("article").style.display = "none"
	document.getElementById("load-gif").style.display = "block"
	var spinner = new Spinner().spin()
	document.getElementById("load-gif").appendChild(spinner.el)	
}

function pause_load_gif()
{
	document.getElementById("article").style.display = "inline"
	document.getElementById("load-gif").style.display = "none"
}

/*
//Same Old Story

var data;

function loadData() {

}

function printData(){

}

function playSong(cell){

}
*/

//modification of /kaam3/load_history as /kaam6/get_data_for_triplet
var history = [[],[[],[]]];

function get_all_usernames()
{
    play_load_gif()
    $.ajax({
        url: "/kaam6/get_all_usernames",
        type: "GET",
        data: "",
        dataType: "json",
        success: function (result) {
            //result = jQuery.parseJSON(result)
            history[0]=result
            alert("Jasmine: "+history[0])
            get_data_for_triplet()
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            alert("Status: " + textStatus); alert("Error: " + errorThrown);
        }
    })
}

function get_data_for_triplet(){
    /*
        initialize work in <back-end || front-end>
        <call python || wtf>
        get the resultant structured set of song id's
        find in database for item[0]
        *find other users who have listened these songs for item[1]
        return
    */
    alert("Creating Triplet File...")

    //history[0] = 
    alert(history[0].length)
    for(i=0;i < history[0].length; i++)
    {
        var uid = history[0][i]
        rep_req_res(uid, i)
    }
}

function rep_req_res(uid, i)
{
    alert("UID: "+uid+" and i: "+i)
    $.ajax({
        url: "/kaam6/get_data_for_triplet",
        type: "POST",
        data: {userid: uid},
        dataType: "json",
        success: function (result) {
            if(result=="none")
                return;
            history[1][i] = result;
            if(i==history[0].length-1)
            {
                alert("Mubarak ho! Triplet hone wale hain!")
                create_triplet(history);
            }     
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            alert("Status: " + textStatus); alert("Error: " + errorThrown); 
        }
    })
}

function create_triplet(history)
{
    alert("Reached in OT")
    for(i=0;i<history[0].length;i++)
    {
        alert("history of i where uid:"+history[i]+" is "+history[0].length+","+history[1][0].length+","+history[1][1].length)
        var line = history[0][i] + " "
        var data = history[1][i][0]
        var mySet = new Set(data)
        for (let item of mySet)
        {
            console.log(item)
            var count = 0
            line = line + item + " "
            for(j=0;j<data.length;j++)
            {
                if(data[j]==line)
                    count++;
            }
            line = line + count.toString()
        }
        document.write(line+"<br>")
    }
}