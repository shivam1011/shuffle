$("#search").click(function () {
    $(".search_popup").fadeIn(1000);
    $("#search").fadeOut(1000);
});

$("#search_close").click(function () {
    $(".search_popup").fadeOut(1000);
    $("#search").fadeIn(1000);
});
