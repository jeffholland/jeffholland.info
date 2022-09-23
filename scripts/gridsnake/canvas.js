const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

let width;
let height;

const gridSize = 40;

const resize = function() {
    width = window.innerWidth * 2;
    height = window.innerHeight * 2;
    canvas.width = width;
    canvas.height = height;
}
window.onresize = resize;
resize();

function drawGrid(ctx) {
    ctx.strokeStyle = "white";

    for (let i = 0; i < numVerticalLines; ++i) {
        ctx.beginPath();
        ctx.moveTo(i * gridSize, 0);
        ctx.lineTo(i * gridSize, height);
        ctx.closePath();
        ctx.stroke();
    }

    for (let i = 0; i < numHorizontalLines; ++i) {
        ctx.beginPath();
        ctx.moveTo(0, i * gridSize);
        ctx.lineTo(width, i * gridSize);
        ctx.closePath();
        ctx.stroke();
    }
}