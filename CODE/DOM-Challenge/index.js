function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function btnclick() {
    document.querySelector("input").click();
}


var name1 = prompt("Enter your name");
alert("Hello " + name1);
document.querySelector("h1").innerHTML = ("Hello " + name1);
btnclick();
sleep(2000).then(() => { 
    btnclick();
    document.querySelector("ul").lastElementChild.innerHTML = "abc";
});

document.getElementsByTagName("li")[2].style.color = "purple"

document.querySelector("li a").style.color = "red";