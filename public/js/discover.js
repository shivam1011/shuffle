var flag = 0

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
var history = [[],[]];
history[1]= [];
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
    //alert("start")
    history[1]=[]
    for(delay=0;delay<50000000;delay++){}
    //alert("stop")
    $.ajax({
        url: "/kaam6/get_data_for_triplet",
        type: "POST",
        data: {userid: uid},
        dataType: "json",
        success: function (result) {
            //alert("Result: "+result)
            //alert(history[1][i])
            if(result=="none"){
                //history[1].push([[],[]]);
                history[1].push("none")
            }
            else{
                history[1]=[]
                var lol = all_IDs(result[0],0)
                console.log(flag)
                history[1].push(lol)
                for(delay=0;delay<50000000;delay++){}
                console.log(flag)
                console.log("new history[1][i]: "+history[1])
            }
            //alert("UID: "+uid+", l="+history[1].length)
            if(i==history[0].length-1 && history[0].length==history[1].length)
            {
                alert("Mubarak ho! Triplet hone wale hain!")
                console.log("history[1]: "+history[1])
                create_triplet(0);
            }
            else if(i == history[0].length-1){
                alert("Total Syapa!")
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            alert("Status: " + textStatus); alert("Error: " + errorThrown); 
        }
    })
}

var all_ID_values=[]
function all_IDs(result,i){
    //console.log(result[i])
    if(i==result.length){   
        //console.log(all_ID_values)
        return(get_IDs(all_ID_values))
    }
    all_ID_values.push(result[i]["_id"])
    all_IDs(result,i+1)
}

function get_IDs(result){
    var mySet = new Set(result)
    var ans = []
    for (let item of mySet) //gives uniqie song IDs one by one
        ans.push(item)
    console.log(ans)
    flag = 1
    return(ans)
}

function create_triplet(i) //for user i
{
    //console.log(history)
    //alert("Reached in OT")
    console.log(history[1][i])
    if(history[1][i]=="none"){ //if a user's history is empty, it will verify by (if first element is undefined)
        create_triplet(i+1)
    }
    //alert("history of i where uid:"+history[i]+" is "+history[0].length+","+history[1][0].length+","+history[1][1].length)
    var data = history[1][i]
    var mySet = new Set(data)
    alert(mySet.size)
    for (let item of mySet) //gives uniqie song IDs one by one
    {
        var line = history[0][i]
        console.log(item)
        var count = 0
        line = line  + " " + item + " "
        for(j=0;j<data.length;j++)
        {
            if(data[j].valueOf()==item)
                count++;
            if(j==data.length-1){
                line = line + count.toString()
                document.write(line+"<br>")
            }
        }
    }
    //document.write(line+"<br>")
    if(i==history[0].length-1){
        return " ";
    }
    else{
        create_triplet(i+1)
    }
}