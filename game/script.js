/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var x = 150;
var y = 150;

var dx = 2;
var dy = 4;

var WIDTH;
var HEIGHT;
var context;
var rectX;
var rectY;
var rectWidth;
var rectHeight;

var canvasMinX;
var canvasMaxX;

var IntervalID;

/** Function which is drawing circle **/
function drawCircle(x, y, r) {
    context.fillStyle = "#00A308"
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2, true);
    context.closePath();
    context.fill();
}

/** Function which is drawing rectangle **/
function drawRect(x, y, w, h) {
    context.fillStyle = "#FF1C0A";
    context.beginPath();
    context.rect(x, y, w, h);
    context.closePath();
    context.fill();
}

/** Function which clears whole canvas **/
function clear() {
    context.clearRect(0, 0, WIDTH, HEIGHT);
}

/** Function to check external edges collision **/
function checkEdgesCollision() {
	if (x + dx > WIDTH || x + dx < 0)
        dx = -dx;
    if (y + dy > HEIGHT || y + dy < 0)
        dy = -dy;
}

/** Function to detect collision with rect **/
function checkRectCollision() {
	var leftRectBound = rectX;
	var rightRectBound = rectX + rectWidth;
	var topRectBound = rectY;
	var bottomRectBound = rectY + rectHeight;
	
	if (x + dx > leftRectBound && x + dx < rightRectBound) 
		if (y  > topRectBound && y  < bottomRectBound) {
			dx = -dx;
			notifyAboutCollision();
		}
		
	if (y + dy > topRectBound && y + dy < bottomRectBound) 
		if (x  > leftRectBound && x  < rightRectBound) {
			dy = -dy;
			notifyAboutCollision();
		}
}

/** Function which is called in interval. 
 * 	Is responsible for clearing and drawing on canvas 
 * **/
function draw() {
	
    clear();
    drawCircle(x, y, 10);
    drawRect(rectX, rectY, rectWidth, rectHeight);
    checkEdgesCollision();
    checkRectCollision();
    /*
    else if (y + dy > HEIGHT) {
        if (x > rectX && x < rectX + rectWidth)
            dy = -dy;
        else
            clearInterval(IntervalID);
    }*/
    x += dx;
    y += dy;
}

/** Callback for mouse event TODO later **/
function onMouseMove(evt) {
    if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX) {
        paletkax = evt.pageX - canvasMinX;
    }
}

/** Init of mouse to for later usage **/
function init_mysz() {
    canvasMinX = $("#pong").offset().left;
    canvasMaxX = canvasMinX + WIDTH;
}

function notifyAboutCollision(){
	alert("Collision detected :");
}
window.onload = function () {


    var canvas = document.getElementById('pong');
    context = canvas.getContext('2d');
    WIDTH = 600;
    HEIGHT = 600;
    IntervalIDb = setInterval(draw, 20);
    rectHeight = 400;
    rectWidth = 100;
    rectX = (WIDTH / 2) - (rectWidth/2);
    rectY = (HEIGHT / 2) - (rectHeight/2);
    //init_mysz();
    //$(document).mousemove(onMouseMove);

};
