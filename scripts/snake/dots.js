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

// max num dots
const max_num_dots = 5;

// spawn function
function spawn_dots() {
    if (yellow_dots.length >= max_num_dots) {
        return;
    }

    spawn_chance = Math.floor(Math.random() * yellow_dot_spawn_chance);
    if (spawn_chance == 0) {
        const x_coord = Math.floor(Math.random() * width);
        const y_coord = Math.floor(Math.random() * height);

        yellow_dots.push( createYellowDot(x_coord, y_coord) );
    }
}

// collision function
function collision(dot_count) {
    yellow_dots.splice(dot_count, 1);
    console.log("Spliced at index " + dot_count);
}

// collision detection function
function detect_collisions() {

    for (let i = 0; i < yellow_dots.length; i++) {

        if (Player.state.x >= yellow_dots[i].x 
            && Player.state.x <= yellow_dots[i].x + (Player.size * 2)
            && Player.state.y >= yellow_dots[i].y 
            && Player.state.y < yellow_dots[i].y + (Player.size * 2)) {
                
                collision(i);
        }

    }
}