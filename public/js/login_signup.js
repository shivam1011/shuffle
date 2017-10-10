var login_popup = document.getElementById("login_popup");
var login = document.getElementById("login");
var login_close = document.getElementById("login_close");
var creacc = document.getElementById("creacc");
login.onclick = function () {
    login_popup.style.display = "block";
}
login_close.onclick = function () {
    login_popup.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == login_popup) {
        login_popup.style.display = "none";
    }
}
creacc.onclick = function () {
    login_popup.style.display = "none";
    signup_popup.style.display = "block";
}

///////////////////////////////////////////////////////

var signup_popup = document.getElementById('signup_popup');
var signup_btn = document.getElementById("signup");
var signup_close = document.getElementById("signup_close");
signup_btn.onclick = function () {
    signup_popup.style.display = "block";
}
signup_close.onclick = function () {
    signup_popup.style.display = "none";
}
window.onclick = function (event) {
    if (event.target == signup_popup) {
        signup_popup.style.display = "none";
    }
}



