//==============================================
// game canvas aka the whole dang window
//==============================================

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
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

