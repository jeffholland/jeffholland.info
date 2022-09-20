// GAME LOOP / ANIMATION LOOP CODE

// The following code is based on:
// https://www.sitepoint.com/quick-tip-game-loop-in-javascript/

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width;
var height;

const speed = 20;
let direction = "up";

var resize = function() {
  width = window.innerWidth * 2;
  height = window.innerHeight * 2;
  canvas.width = width;
  canvas.height = height;
}
window.onresize = resize;
resize();

ctx.fillStyle = "green";

var state = {
    x: (width / 2),
    y: (height / 2),
}

function update(progress) {
    switch (direction) {
        case "up":
            state.y = state.y - progress;
            break;
        case "down":
            state.y += progress;
            break;
        case "left":
            state.x = state.x - progress;
            break;
        case "right":
            state.x += progress;
            break;
    }

    if (state.x > width) {
        state.x -= width;
    }
    if (state.x < 0) {
        state.x += width;
    }
    if (state.y > height) {
        state.y -= height;
    }
    if (state.y < 0) {
        state.y += height;
    }
}

function draw() {
    ctx.clearRect(0, 0, width, height);

    ctx.fillRect(state.x - 10, state.y - 10, 20, 20);
}

function loop(timestamp) {
    var progress = timestamp - lastRender;

    update(progress);
    draw();

    lastRender = timestamp;
    window.requestAnimationFrame(loop);
}

var lastRender = 0;
window.requestAnimationFrame(loop);


// KEYBOARD INPUT CODE


window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return;
    }

    // Modify position with arrow keys
    switch (event.key) {
        case "ArrowDown":
            direction = "down";
            break;
        case "ArrowUp":
            direction = "up";
            break;
        case "ArrowLeft":
            direction = "left";
            break;
        case "ArrowRight":
            direction = "right";
            break;
    }
}, true);