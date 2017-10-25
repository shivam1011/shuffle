function dev_login()
{
    try{
    $.ajax({
        url: "http://localhost:3000/kaam5/login",
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
        url: "http://localhost:3000/kaam5/set_profile",
        type: "GET",
        data: '',
        dataType: "json",
        success: function (result) {
         // Write something here
         alert(result["data"])

         //var dev_profile = document.getElementById("dev_profile").innerHTML = result["data"]
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
            alert("Status: " + textStatus); alert("Error: " + errorThrown); 
    }})
    }
    catch(e){alert(e)}
}