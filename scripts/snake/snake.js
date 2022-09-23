//==============================================
// game loop
//==============================================

function update(progress) {

    // Move player according to direction
    Player.move(progress);
    
    // Spawn yellow dots randomly
    spawn_dots();

    // Detect collisions
    detect_collisions();
}

function draw() {
    ctx.clearRect(0, 0, width, height);

    // Draw the player (snake)
    Player.draw(ctx);

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
            Player.change_direction("down");
            break;
        case "ArrowUp":
            Player.change_direction("up");
            break;
        case "ArrowLeft":
            Player.change_direction("left");
            break;
        case "ArrowRight":
            Player.change_direction("right");
            break;
    }
}, true);