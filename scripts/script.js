function myFunction() {
    const header = document.getElementById("header");
    const button = document.getElementById("myButton");

    header.innerHTML = "Did you seriously just click that button?";
    header.style.color = "red";
    button.style.visibility = "hidden";

    console.log("Button clicked successfully");
}

function randomNumber() {
    const result = document.getElementById("rnd-result");
    num = Math.floor(Math.random() * 100);

    result.innerHTML = num.toString();
}

