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

//global declarations for csv loading
var data;

//to read data from csv file
function loadData() 
{
	play_load_gif()
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
	//alert("ready state");
	//alert(this.readyState);
	//alert("status");
	//alert(this.status);
    if (this.readyState == 4 && this.status == 200) {
	  /*document.getElementById("demo").innerHTML =
      this.responseText;*/
	  data = this.responseText;
	  printData();
    }
  };
  xhttp.open("GET", "/kaam1", true);
  xhttp.withCredentials = false;
  xhttp.send();
}

//parse loaded dada
function printData()
{
	try{
	//alert("printData() chalu...");
	var array = jQuery.parseJSON(data);
	//alert("DATUM: "+array[0]["FIELD3"]);
	var i,j;
	var tabla = document.getElementById("myTable");
	for(i=0;i<5101;i++)
	{
		//create row
		var row, header;
		if(i==0)
		{
			header = tabla.createTHead();
			row=header.insertRow(i);
		}
		else
		{
			row = tabla.insertRow(i);
		}
		for(j=0;j<5;j++)
		{
			//give index where FIELD1 = i
			index=-1
			for(k=0;k<5101;k++){
				if(array[k]["FIELD1"]==(i.toString())){
					index=k
					break;
				}
			}
			
			var cell = row.insertCell(j);
			var id="FIELD"+(j+2);
			if(i==0)
			{
				if(j<4)
				{
					cell.innerHTML="<h3>"+array[index][id]+"</h3>";
				}
				else
				{
					cell.innerHTML="<h3>"+"Click To Play"+"</h3>";
				}
			}
			else
			{
				if(j<4)
				{
					cell.innerHTML="<h4>"+array[index][id]+"</h4>";
				}
				else
				{
				    cell.innerHTML = "<img class=\"play_img\" src=\"images/tray.png\"/>";
					playSong(cell);
				}
				
			}
		}
	}
	//alert("SUCCESS!");
	pause_load_gif()
	}
	catch(err)
{
		alert(err);
	}
}

var proxy_num = 0
function playSong(cell)
{
	cell.onclick=function() {
		//this.style.border = "2px solid white";
		//window.location.replace("/kaam4/gaana");
		
		//extract sibling ka sibling
		var songName = cell.previousSibling.previousSibling.previousSibling.innerHTML;
		songName=songName.slice(4,songName.length-5);
		//alert(songName);
		var audio = new Audio();
		if(document.getElementById("id_audio") == null)
		{
			audio = new Audio();
		}
		else
		{
			audio = document.getElementById("id_audio");
		}
		//audio.src = '/songs/'+songName+".mp3";
		var proxy_list = ['/songs/0.mp3','/songs/1.mp3','/songs/2.mp3']
		//audio.src = '/songs/i cant help myself sugar pie honey bunch.mp3'
		audio.src = proxy_list[proxy_num]
		alert(audio.src)
		proxy_num++;
		if(proxy_num==3){
			proxy_num = 0
		}
		audio.controls = true;
		audio.autoplay = true;
		audio.id = 'id_audio';
		document.getElementById("div_audio").appendChild(audio);
		//alert("loading audio...");
		audio.load();
		//alert("audio loaded");
		audio.play();
		//alert("audio played");
		document.getElementById("id_songName").innerHTML=songName;
		add_to_history(songName)
	};
	cell.onmouseover = function() {
		this.style.cursor = 'pointer';
		//this.style.border = "2px solid black";
	}
	cell.onmouseout = function() {
		this.style.cursor = 'default';
		//this.style.border = "2px solid white";
	}
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

//from here, the real bakchodi begins
function add_to_history(songName)
{
	/*
		just fucking send the encrypted song name
	*/
	//alert(songName)
	//songName=songName.replace(/\s/g,'_')
	$.ajax({
        url: "/kaam3/add_to_history",
        type: "POST",
        data: {"song" : songName},
        dataType: "json",
        success: function (result) {
		 // Write something here
		 //alert("Song added to history")
		 function tempAlert(msg,duration)
		 {
		  var el = document.createElement("div");
		  el.setAttribute("style","display: block;position: fixed;border: 2px solid black;border-radius:25px;margin: 5% 20%;width: 60%;background-color:silver;padding:10px;z-index:2");
		  el.innerHTML = "<h3 align='center'>"+msg+"<\h3>";
		  setTimeout(function(){
		   el.parentNode.removeChild(el);
		  },duration);
		  document.body.appendChild(el);
		 }
		 tempAlert(songName+": added to history",3500);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            alert("Status: " + textStatus); alert("Error: " + errorThrown); 
    }})
}

/*
	*****UPAR PLAYLIST WALA, NEECHE HISTORY WALA*****
*/


function load_history()
{
	play_load_gif()
	//alert("WOAHHHHHH!!!")
	var history = [[],[]];
	$.ajax({
        url: "/kaam3/load_history",
        type: "POST",
        data: "",
        dataType: "json",
        success: function (r1) {
		 // Write something here
		 //history = jQuery.parseJSON(result1)
		 history[0] = r1[0]
		 history[1] = r1[1]
		 //alert("History r1[0] Loaded: "+r1[0])
		 //alert("History r1[1] Loaded: "+r1[1])
		 display_history(history)
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            alert("Status: " + textStatus); alert("Error: " + errorThrown); 
    }})
}

function display_history(history)
{
	//alert("History di length: "+history[0].length)
	try{
		var i,j;
		var tabla = document.getElementById("myTable");
		var heading = ["Rank","Song","Artist","Year"]
		for(i=0,counter=-1;counter<history[1].length-1;)
		{
			//alert("i"+i)
			//alert("counter"+counter)
			//create row
			var row, header;
			if(i==0)
			{
				header = tabla.createTHead();
				row=header.insertRow(i);
			}
			else
			{
				row = tabla.insertRow(i);
				counter++;
			}

			for(j=0;j<5;j++)
			{
				//alert("j: "+j)
				var cell = row.insertCell(j);
				var id="FIELD"+(j+2);
				if(i==0)
				{
					if(j<4)
					{
						cell.innerHTML="<h3>"+heading[j]+"</h3>";
					}
					else
					{
						cell.innerHTML="<h3>"+"Click To Play"+"</h3>";
					}
				}
				else
				{
					if(j<4)
					{
						cell.innerHTML="<h4>"+history[0][history[1].length-(counter+1)][id]+"</h4>";
						//cell.style.borderBottom = "none";
					}
					else
					{
					    cell.innerHTML = "<img class=\"play_img\" src=\"images/tray.png\"/>" + "(Listened on: " + history[1][history[1].length - (counter + 1)] + ")";
						//cell.style.borderBottom = "none";
						//cell.colspan=1;
						playSong(cell);
						/*
						i++;
						row = tabla.insertRow(i);
						cell = row.insertCell(0);//with increased rowspan
						cell.colspan = 5;
						cell.innerHTML="Listened on: "+history[1][counter]+"</br></br></br>";
						*/
					}
				}
			}
			i++;
		}
		//alert("SUCCESS!");
		pause_load_gif()
		}
		catch(err)
	{
			alert(err);
		}
}

//yahaan search wali bakchodi hogi
function searcher(){
	play_load_gif()
	var search_item = document.getElementById("search_txt").value;
	var history = [[],[]];
	$.ajax({
        url: "/kaam6/search",
        type: "POST",
        data: {inp:search_item},
        dataType: "json",
        success: function (r1) {
		 // Write something here
		 //history = jQuery.parseJSON(result1)
		 history[0] = r1[0]
		 history[1] = r1[1]
		 //alert("History r1[0] Loaded: "+r1[0])
		 //alert("History r1[1] Loaded: "+r1[1])
		 var tabla = document.getElementById("myTable")
		 tabla.parentNode.removeChild(tabla);
		 alert(document.getElementById("myTable"))

		 var newTable=document.createElement('table')
		 newTable.id = 'myTable'
		 document.getElementById("article").appendChild(newTable)
		 display_history(history)
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            alert("Status: " + textStatus); alert("Error: " + errorThrown); 
    }})
}