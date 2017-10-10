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
