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

// collision function
function collision(dot_count) {
    yellow_dots.pop(dot_count);
    console.log("Popped at index " + dot_count);
}

// collision detection function
function detect_collisions() {

    let dot_count = 0;

    yellow_dots.forEach(dot => {
        if (Player.state.x >= dot.x && Player.state.x < dot.x + yellow_dot_size 
            && Player.state.y >= dot.y && Player.state.y < dot.y + yellow_dot_size) {
                collision(dot_count);
        }
        dot_count += 1;
    }) 
}