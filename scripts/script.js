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


// following is pasted from Stack Overflow:
// https://stackoverflow.com/questions/4416505/how-to-take-keyboard-input-in-javascript

window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }
  
    switch (event.key) {
      case "ArrowDown":
        this.alert("You pressed down");
        break;
      case "ArrowUp":
        this.alert("You pressed up");
        break;
      case "ArrowLeft":
        this.alert("You pressed left");
        break;
      case "ArrowRight":
        this.alert("You pressed right");
        break;
      default:
        return; // Quit when this doesn't handle the key event.
    }
  
    // Cancel the default action to avoid it being handled twice
    event.preventDefault();
  }, true);