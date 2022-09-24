const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

let width;
let height;

const gridSize = 40;
let numVerticalLines = Math.floor(width / gridSize);
let numHorizontalLines = Math.floor(height / gridSize);

const resize = function() {
    width = window.innerWidth * 2;
    height = window.innerHeight * 2;
    canvas.width = width;
    canvas.height = height;

    numVerticalLines = Math.floor(width / gridSize);
    numHorizontalLines = Math.floor(height / gridSize);

    // debug
    if (debug) {
        console.log("~~~ Resized ~~~");
        console.log("Canvas width: " + width);
        console.log("Canvas height: " + height);
        console.log("Grid size: " + gridSize);
        console.log("Num vertical lines: " + numVerticalLines);
        console.log("Num horizontal lines: " + numHorizontalLines);
    }
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