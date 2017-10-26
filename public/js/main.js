function set_profile_bar()
{
    try{
    $.ajax({
        url: "http://localhost:3000/kaam5/set_profile",
        type: "GET",
        data: '',
        dataType: "json",
        success: function (result) {
         // Write something here
         //alert(result["data"])
         var dev_profile = document.getElementById("dev_profile").innerHTML = result["data"]["userid"]
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
  xhttp.open("GET", "http://localhost:3000/kaam1", true);
  xhttp.withCredentials = false;
  xhttp.send();
}

//parse loaded dada
function printData()
{
	try{
	//alert("printData() chalu...");
	var array = jQuery.parseJSON(data);
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
			var cell = row.insertCell(j);
			var id="FIELD"+(j+1);
			if(i==0)
			{
				if(j<4)
				{
					cell.innerHTML="<h3>"+array[i][id]+"</h3>";
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
					cell.innerHTML="<h4>"+array[i][id]+"</h4>";
				}
				else
				{
					cell.innerHTML="<h4>"+"Play"+"</h4>";
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
		audio.src = '/songs/i cant help myself sugar pie honey bunch.mp3'
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