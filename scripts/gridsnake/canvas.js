const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

let width;
let height;

const resize = function() {
  width = window.innerWidth * 2;
  height = window.innerHeight * 2;
  canvas.width = width;
  canvas.height = height;
}
window.onresize = resize;
resize();
