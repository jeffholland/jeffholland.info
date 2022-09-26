let inputDirection = { x: 0, y: 0 };
let lastInputDirection = inputDirection;
let paused = false;

window.addEventListener("keydown", e => {
    switch (e.key) {
        case "ArrowUp":
            if (lastInputDirection.y !== 0) break;
            inputDirection = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            if (lastInputDirection.y !== 0) break;
            inputDirection = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            if (lastInputDirection.x !== 0) break;
            inputDirection = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            if (lastInputDirection.x !== 0) break;
            inputDirection = { x: 1, y: 0 };
            break;

        // ESC TO PAUSE
        case "Escape":
            paused = !paused;
            break;
    }
})

export function getInputDirection() {
    lastInputDirection = inputDirection;
    return inputDirection;
}

export function getPaused() {
    console.log("getPaused returned " + paused);
    return paused;
}