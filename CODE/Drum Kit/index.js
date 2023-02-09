// function handelclick()
// {
//     alert("a");
// }


// var w = document.querySelectorAll("button")[0].addEventListener("click", handelclick);
// var a = document.querySelectorAll("button")[1].addEventListener("click", handelclick);
// var s = document.querySelectorAll("button")[2].addEventListener("click", handelclick);
// var d = document.querySelectorAll("button")[3].addEventListener("click", handelclick);
// var j = document.querySelectorAll("button")[4].addEventListener("click", handelclick);
// var k = document.querySelectorAll("button")[5].addEventListener("click", handelclick);
// var l = document.querySelectorAll("button")[6].addEventListener("click", handelclick);

for (var i = 0 ; i < (document.querySelectorAll(".drum").length) ; i++)
{
    document.querySelectorAll(".drum")[i].addEventListener("click", function () {
        soundOP(this.textContent);
        animOP(this.textContent);
    });
}

document.addEventListener("keydown", function (event)
{
    soundOP(event["key"]);
    animOP(event["key"]);
});


function soundOP(key)
{
    switch (key)
    {
        case "w":
            var tom1 = new Audio("sounds/tom-1.mp3");
            tom1.play();
            break;
        
        case "a":
            var tom2 = new Audio("sounds/tom-2.mp3");
            tom2.play();
            break;
        
        case "s":
            var tom3 = new Audio("sounds/tom-3.mp3");
            tom3.play();
            break;
        
        case "d":
            var tom4 = new Audio("sounds/tom-4.mp3");
            tom4.play();
            break;
        
        case "j":
            var crash = new Audio("sounds/crash.mp3");
            crash.play();
            break;
            
        case "k":
            var snare = new Audio("sounds/snare.mp3");
            snare.play();
            break;
                
        case "l":
            var kick = new Audio("sounds/kick-bass.mp3");
            kick.play();
            break;
        
        default:
            break;
    }
}

function animOP(key)
{
    var btn = document.querySelector("." + key);
    btn.classList.add("pressed");
    setTimeout( function ()
    {
        btn.classList.remove("pressed");
    }, 200);
}