function myFunction() {
    const header = document.getElementById("header");
    const button = document.getElementById("myButton");

    header.innerHTML = "Did you seriously just click that button?";
    button.style.visibility = "hidden";

    console.log("Button clicked successfully");
}