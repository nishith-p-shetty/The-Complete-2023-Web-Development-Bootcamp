$("h1").css("color", "red");
$("h1").text("Bye");
$("h1").html("<em>Bye</em>");


$("img").attr("src", "/favicon.ico");


$("button").click(function () {
    $("button").css("background-color", "aqua");
});

$(document).keypress(function (event) {
    $("h1").text(event.key);
});