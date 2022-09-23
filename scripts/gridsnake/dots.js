//==============================================
// yellow dots aka snake food
//==============================================

// factory
function createDot(x_coord, y_coord) {
    return {
        x: x_coord,
        y: y_coord
    }
}

// array
let dots = [];

// likelihood that they will spawn is one out of...
const yellow_dot_spawn_chance = 100;

// size
const yellow_dot_size = 20;

// max num dots
const max_num_dots = 5;

// spawn function
function spawnDots() {
    if (dots.length >= max_num_dots) {
        return;
    }

    spawn_chance = Math.floor(Math.random() * yellow_dot_spawn_chance);
    if (spawn_chance == 0) {
        const x_coord = Math.floor(Math.random() * width);
        const y_coord = Math.floor(Math.random() * height);

        dots.push( createDot(x_coord, y_coord) );
    }
}

// collision function
function collision(dot_count) {
    dots.splice(dot_count, 1);

    Player.growSnake();
}

// collision detection function
function detectCollisions() {

    for (let i = 0; i < dots.length; i++) {

        let current = Player.head;

        while (current != null) {
            if (current.x >= dots[i].x - gridSize
                && current.x <= dots[i].x + gridSize
                && current.y >= dots[i].y - gridSize
                && current.y <= dots[i].y + gridSize) {
                    collision(i);
                }
        }

    }
}