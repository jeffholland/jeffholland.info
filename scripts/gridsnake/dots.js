//==============================================
// yellow dots aka snake food
//==============================================

// array of dots
let dots = [];

// likelihood that they will spawn is one out of...
const dotSpawnChance = 20;

// max num dots
const maxDots = 50;

// spawn function
function spawnDots() {
    if (dots.length >= maxDots) {
        return;
    }

    dotSpawnValue = Math.floor(Math.random() * dotSpawnChance);
    if (dotSpawnValue == 0) {
        const x = Math.floor(Math.random() * numVerticalLines);
        const y = Math.floor(Math.random() * numHorizontalLines);

        dots.push( new Coord(x, y) );

        dots[dots.length - 1].convertToScreen();
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
            if (dots[i] == undefined) {
                    return;
                }
            if (current.coord.x == dots[i].x
                && current.coord.y == dots[i].y) {
                    collision(i);
                }
            current = current.next;
        }

    }
}

function drawDots(ctx) {
    ctx.fillStyle = "yellow";

    for (let i = 0; i < dots.length; ++i) {
        ctx.fillRect(dots[i].x, dots[i].y, gridSize, gridSize);
        // if (debug) {
        //     console.log("Drew dot at " + dots[i].x + ", " + dots[i].y);
        // }
    }
}