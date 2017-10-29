function dev_login()
{
    try{
    $.ajax({
        url: "/kaam5/login",
        type: "POST",
        data: $('#dev_login').serialize(),
        dataType: "json",
        success: function (result) {
         // Write something here
         //alert(result["data"])
         //alert(result["session"])
         if (result["login"]==true){
             window.location.replace("home");
         }
        else{
            alert("Invalid username||password. Please recheck or sign up!")
        }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            alert("Status: " + textStatus); alert("Error: " + errorThrown);
    }})
    }
    catch(e){alert(e)}
}

function set_profile()
{
    try{
    $.ajax({
        url: "/kaam5/set_profile",
        type: "GET",
        data: '',
        dataType: "json",
        success: function (result) {
         // Write something here
         var userid = result["data"]["userid"]
         var name = ""
         for (i=0; result["data"]["name"][i]!=null; i++)
            name += result["data"]["name"][i] + " "
         var address = result["data"]["address"]
         var Country = result["data"]["Country"]
         var Zipcode = result["data"]["Zipcode"]
         var email = result["data"]["email"]
         var english = result["data"]["english"]
         
        document.getElementById("dev_profile").innerHTML = name+" "+"("+userid+")";
        document.getElementById("profile_header").innerHTML = "WELCOME "+userid.toUpperCase();
        document.getElementById("userid").innerHTML = userid;
        document.getElementById("name").innerHTML = name;
        document.getElementById("address").innerHTML = address;
        document.getElementById("Country").innerHTML = Country;
        document.getElementById("Zipcode").innerHTML = Zipcode;
        document.getElementById("email").innerHTML = email;
        document.getElementById("english").innerHTML = english;
        
         //var dev_profile = document.getElementById("dev_profile").innerHTML = result["data"]
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            alert("Status: " + textStatus); alert("Error: " + errorThrown); 
    }})
    }
    catch(e){alert(e)}
}