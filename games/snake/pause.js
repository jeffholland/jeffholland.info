import { changeSpeed } from "./snake.js";

const gameBoard = document.getElementById("game-board");
let pauseBoard;
let pauseText;
let speedSlider;
let speedNumber;

let currentSpeed = 10;

export function pause() {
    pauseBoard = document.createElement("div");
    pauseBoard.id = "pause-board";

    // "Paused" text
    pauseText = document.createElement("h1");
    pauseText.id = "pause-text";
    pauseBoard.appendChild(pauseText);
    const textNode = document.createTextNode("Paused");
    pauseText.appendChild(textNode);

    // Slider to control snake speed
    speedSlider = document.createElement("input");
    speedSlider.type = "range";
    speedSlider.min = 1;
    speedSlider.max = 20;
    speedSlider.value = currentSpeed;
    speedSlider.id = "speed-slider";
    speedSlider.oninput = sliderInput;
    pauseBoard.appendChild(speedSlider);

    // Number to display result of slider
    speedNumber = document.createElement("h2");
    speedNumber.id = "speed-number";
    speedNumber.innerHTML = currentSpeed.toString();
    pauseBoard.appendChild(speedNumber);

    document.body.insertBefore(pauseBoard, gameBoard);
    gameBoard.remove();
}

export function unpause() {
    document.body.insertBefore(gameBoard, pauseBoard);
    pauseBoard.remove();
}

function sliderInput() {
    currentSpeed = this.value;
    changeSpeed(currentSpeed);
    speedNumber.innerHTML = currentSpeed.toString();
}