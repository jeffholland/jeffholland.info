//==============================================
// game canvas aka the whole dang window
//==============================================

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width;
var height;

var resize = function() {
    width = window.innerWidth * 2;
    height = window.innerHeight * 2;
    canvas.width = width;
    canvas.height = height;
}
window.onresize = resize;
resize();





//==============================================
// green player aka snake
//==============================================

const Player = {
    direction: "up",
    size: 40,
    state: {
        x: (width / 2),
        y: (height / 2)
    },

    move: function(progress) {
            switch (this.direction) {
                case "up":
                    this.state.y -= progress;
                    break;
                case "down":
                    this.state.y += progress;
                    break;
                case "left":
                    this.state.x -= progress;
                    break;
                case "right":
                    this.state.x += progress;
                    break;
            }

            // Set wall boundaries

            if (this.state.x > width) {
                this.state.x -= width;
            }
            if (this.state.x < 0) {
                this.state.x += width;
            }
            if (this.state.y > height) {
                this.state.y -= height;
            }
            if (this.state.y < 0) {
                this.state.y += height;
            }
    }
}

// // direction variable 
// // (should probably be an enum but that seemed like a hassle)
// let direction = "up";

// // size of one "unit" of the green snake
// const snake_unit_size = 40;

// // current player state
// var state = {
//     x: (width / 2),
//     y: (height / 2),
// }





//==============================================
// yellow dots aka snake food
//==============================================

// factory
function createYellowDot(x_coord, y_coord) {
    return {
        x: x_coord,
        y: y_coord
    }
}

// array
let yellow_dots = [];

// likelihood that they will spawn is one out of...
const yellow_dot_spawn_chance = 100;

// size
const yellow_dot_size = 20;

// spawn function
function spawn_dots() {
    spawn_chance = Math.floor(Math.random() * yellow_dot_spawn_chance);
    if (spawn_chance == 0) {
        const x_coord = Math.floor(Math.random() * width);
        const y_coord = Math.floor(Math.random() * height);

        yellow_dots.push( createYellowDot(x_coord, y_coord) );
    }
}




//==============================================
// game loop
//==============================================

function update(progress) {

    // Move player according to direction
    Player.move(progress);
    
    // Spawn yellow dots randomly
    spawn_dots();
}

function draw() {
    ctx.clearRect(0, 0, width, height);

    // Draw the green dot (snake)
    ctx.fillStyle = "green";
    ctx.fillRect(Player.state.x - 10, Player.state.y - 10, Player.size, Player.size);

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




//==============================================
// keyboard input listener
//==============================================

window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
        return;
    }

    // Modify position with arrow keys
    switch (event.key) {
        case "ArrowDown":
            Player.direction = "down";
            break;
        case "ArrowUp":
            Player.direction = "up";
            break;
        case "ArrowLeft":
            Player.direction = "left";
            break;
        case "ArrowRight":
            Player.direction = "right";
            break;
    }
}, true);