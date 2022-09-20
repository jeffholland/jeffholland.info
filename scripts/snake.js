
// game canvas is the whole dang window
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width;
var height;

// direction variable 
// (should probably be an enum but that seemed like a hassle)
let direction = "up";

// size of one "unit" of the green snake
const snake_unit_size = 40;

// yellow dots aka snake food
let yellow_dots = [];
// likelihood that they will spawn is one out of...
const yellow_dot_spawn_chance = 100;
// size
const yellow_dot_size = 20;

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
    spawn_chance = Math.floor(Math.random() * yellow_dot_spawn_chance);
    if (spawn_chance == 0) {
        x_coord = Math.floor(Math.random() * width);
        y_coord = Math.floor(Math.random() * height);

        let yellow_dot = {
            x: x_coord,
            y: y_coord
        }
        yellow_dots.push( yellow_dot );
    }
}

function draw() {
    ctx.clearRect(0, 0, width, height);

    // Draw the green dot (snake)
    ctx.fillStyle = "green";
    ctx.fillRect(state.x - 10, state.y - 10, snake_unit_size, snake_unit_size);

    // Draw the yellow dots (snake food)
    ctx.fillStyle = "yellow";
    yellow_dots.forEach(dot => {
        ctx.fillRect(dot.x, dot.y, yellow_dot_size, yellow_dot_size);
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