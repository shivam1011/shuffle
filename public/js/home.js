function loginErr()
{
	alert("Please create an account to access these features!");
}
/*
var data;

function loadData() 
{
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
	  data = this.responseText;
	  alert("Data Loaded");
    }
  };
  xhttp.open("GET", "http://localhost:8080", true);
  xhttp.withCredentials = false;
  xhttp.send();
}

function checkData()
{
	try{
	var arr = jQuery.parseJSON(data);
	alert(arr[0]["FIELD1"]);
	}
	catch(err)
	{
		alert(err);
	}
}


function printData()
{
	try{
	alert("printData() chalu...");
	var array = jQuery.parseJSON(data);
	var i,j;
	var tabla = document.getElementById("myTable");
	for(i=0;i<5101;i++)
	{
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
		for(j=0;j<4;j++)
		{
			var cell = row.insertCell(j);
			var id="FIELD"+(j+1);
			if(i==0)
			{
				cell.innerHTML="<h2>"+array[i][id]+"</h2>";
			}
			else
			{
				cell.innerHTML="<b>"+array[i][id]+"</b>";
			}
		}
	}
	alert("SUCCESS!");
	}
	catch(err)
	{
		alert(err);
	}
}
*/