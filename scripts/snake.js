// const speed = 20;

// window.addEventListener("keydown", function (event) {
//     if (event.defaultPrevented) {
//         return;
//     }

//     // Get snake and its rectangle
//     const snake = document.getElementById("snake");
//     const rect = snake.getBoundingClientRect();

//     // Modify position with arrow keys
//     switch (event.key) {
//         case "ArrowDown":
//             if (rect.bottom >= this.screen.height) {
//                 return;
//             }
//             snake.style.top = String(rect.top + speed) + "px";
//             break;
//         case "ArrowUp":
//             if (rect.top <= 0) {
//                 return;
//             }
//             snake.style.top = String(rect.top - speed) + "px";
//             break;
//         case "ArrowLeft":
//             if (rect.left <= 0) {
//                 return;
//             }
//             snake.style.left = String(rect.left - speed) + "px";
//             break;
//         case "ArrowRight":
//             if (rect.right >= this.screen.width) {
//                 return;
//             }
//             snake.style.left = String(rect.left + speed) + "px";
//             break;
//     }
// }, true);


// The following code is taken and modified from:
// https://www.sitepoint.com/quick-tip-game-loop-in-javascript/

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
console.log(typeof ctx);
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

ctx.fillStyle = "green";

var state = {
    x: (width / 2),
    y: (height / 2),
}

function update(progress) {
    state.x += progress;
    if (state.x > width) {
        state.x -= width;
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