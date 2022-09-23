const gridSize = 40;
const numVerticalLines = Math.floor(width / gridSize);
const numHorizontalLines = Math.floor(height / gridSize);

function update(progress) {
}

function draw() {
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

function loop(timestamp) {
  const progress = timestamp - lastRender;
  
  update(progress);
  draw();
  
  lastRender = timestamp;
  window.requestAnimationFrame(loop);
}

let lastRender = 0;
window.requestAnimationFrame(loop);