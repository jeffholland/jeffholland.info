function update(progress) {
    Player.move(progress);

    // spawnDots();

    // detectCollisions();
}

function draw() {
    drawGrid(ctx);

    Player.draw(ctx);
}

let counter = 0;

function loop(timestamp) {
    const progress = timestamp - lastRender;

    update(progress);
    draw();

    lastRender = timestamp;
    window.requestAnimationFrame(loop);
}

let lastRender = 0;
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