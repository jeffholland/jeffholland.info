const speed = 20;

window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return;
    }

    // Get snake and its rectangle
    const snake = document.getElementById("snake");
    const rect = snake.getBoundingClientRect();

    // Modify position with arrow keys
    switch (event.key) {
        case "ArrowDown":
            if (rect.bottom >= this.screen.height) {
                return;
            }
            snake.style.top = String(rect.top + speed) + "px";
            break;
        case "ArrowUp":
            if (rect.top <= 0) {
                return;
            }
            snake.style.top = String(rect.top - speed) + "px";
            break;
        case "ArrowLeft":
            if (rect.left <= 0) {
                return;
            }
            snake.style.left = String(rect.left - speed) + "px";
            break;
        case "ArrowRight":
            if (rect.right >= this.screen.width) {
                return;
            }
            snake.style.left = String(rect.left + speed) + "px";
            break;
    }
}, true);


// The following code is taken and modified from:
// https://www.sitepoint.com/quick-tip-game-loop-in-javascript/

function loop(timestamp) {

}