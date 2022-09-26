const gameBoard = document.getElementById("game-board");
let pauseBoard;
let pauseText;

export function pause() {
    pauseBoard = document.createElement("div");
    pauseText = document.createElement("h1");

    stylePauseboard();

    document.body.insertBefore(pauseBoard, gameBoard);
    gameBoard.remove();
}

export function unpause() {
    document.body.insertBefore(gameBoard, pauseBoard);
    pauseBoard.remove();
}

function stylePauseboard() {
    pauseBoard.style.background = "lightgreen";
    pauseBoard.style.width = "100vmin";
    pauseBoard.style.height = "100vmin";
    pauseBoard.style.textAlign = "center";
    pauseBoard.style.fontSize = "48px";

    const textNode = document.createTextNode("Paused");
    pauseText.appendChild(textNode);
    pauseBoard.appendChild(pauseText);

    pauseText.style.marginTop = "5%";
}