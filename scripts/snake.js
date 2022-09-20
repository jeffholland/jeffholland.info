// GAME LOOP / ANIMATION LOOP CODE

// The following code is based on:
// https://www.sitepoint.com/quick-tip-game-loop-in-javascript/

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width;
var height;

const speed = 20;
let direction = "up";

// yellow dots aka snake food
let yellow_dots = [];

var resize = function() {
  width = window.innerWidth * 2;
  height = window.innerHeight * 2;
  canvas.width = width;
  canvas.height = height;
}
window.onresize = resize;
resize();

var state = {
    x: (width / 2),
    y: (height / 2),
}

function update(progress) {

    // Movement

    switch (direction) {
        case "up":
            state.y -= progress;
            break;
        case "down":
            state.y += progress;
            break;
        case "left":
            state.x -= progress;
            break;
        case "right":
            state.x += progress;
            break;
    }

    // Set wall boundaries

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
    

    // Spawn yellow dots randomly
    spawn_chance = Math.floor(Math.random() * 100);
    if (spawn_chance == 0) {
        x_coord = Math.floor(Math.random() * width);
        y_coord = Math.floor(Math.random() * height);

        let yellow_dot = {
            x: x_coord,
            y: y_coord
        }
        console.log("yellow dot create: (" + yellow_dot.x + ", " + yellow_dot.y + ")");
        yellow_dots.push( yellow_dot );
    }
}

function draw() {
    ctx.clearRect(0, 0, width, height);

    // Draw the green dot (snake)
    ctx.fillStyle = "green";
    ctx.fillRect(state.x - 10, state.y - 10, 20, 20);

    // Draw the yellow dots (snake food)
    ctx.fillStyle = "yellow";
    yellow_dots.forEach(dot => {
        ctx.fillRect(dot.x, dot.y, 20, 20);
    })
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