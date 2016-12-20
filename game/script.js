/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var x = 150;
var y = 150;

var dx = 6;
var dy = 8;

var direction = 'right';

var WIDTH;
var HEIGHT;
var context;
var context;

/**
 * Rect properties 
 */
var rectX;
var rectY;
var rectWidth;
var rectHeight;

var snake;
var snakeSize = 10;

/**
 * Circle properties 
 */
var radius = 10;

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
	
	if ((x + dx) + radius > leftRectBound && (x + dx) - radius < rightRectBound) 
		if (y + radius  > topRectBound && y + radius < bottomRectBound) {
			dx = -dx;
			//notifyAboutCollision();
		}
		
	if ((y + dy) + radius > topRectBound && (y + dy) - radius < bottomRectBound) 
		if ((x + radius) > leftRectBound && (x + radius) < rightRectBound) {
			dy = -dy;
			//notifyAboutCollision();
		}
}

function drawSnakePart(x, y){
	context.fillStyle = 'green';
    context.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
    context.strokeStyle = 'darkgreen';
    context.strokeRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
}

/** Function which is called in interval. 
 * 	Is responsible for clearing and drawing on canvas 
 * **/
function draw() {
	
    clear();
    drawCircle(x, y, radius);
	drawRect(rectX , rectY, rectWidth, rectHeight);
	
	var snakeHeadX = snake[0].x;
    var snakeHeadY = snake[0].y;
    
    if (direction == 'right') snakeHeadX++; 
	else if (direction == 'left') snakeHeadX--; 
	else if (direction == 'up') snakeHeadY--; 
	else if (direction == 'down') {
		snakeHeadY++; 
	}

        
	var tail = snake.pop();
    tail.x = snakeHeadX; 
    tail.y = snakeHeadY;
    
    if (snakeHeadX == -1 || snakeHeadX == WIDTH/snakeSize || snakeHeadY == -1 
		|| snakeHeadY == HEIGHT/snakeSize) {
			clearInterval(IntervalIDb);
	}
      
    snake.unshift(tail); 
    checkEdgesCollision();
    
    for(var i = 0; i < snake.length; i++) {
		drawSnakePart(snake[i].x, snake[i].y);
    }
    
    //checkRectCollision();
    /*
    else if (y + dy > HEIGHT) {
        if (x > rectX && x < rectX + rectWidth)
            dy = -dy;
        else
            clearInterval(IntervalID);
    }*/
    x += (dx );
    y += (dy );
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


function handleKeyboardKeys(event){
	console.log(event);
    keyCode = event.keyCode;

	switch(keyCode) {
		case 37:
			direction = 'left';
			break;
		case 39:
			direction = 'right';
			break;
        case 38:
			direction = 'up';
          break;
        case 40:
			direction = 'down';
			break;
	}
}

function init(){
	snake = [];
	for(var i = 0; i < 4; i++){
		snake.push({x:i, y:0});
	}
}

window.onload = function () {
console.log("!");

    var canvas = document.getElementById('pong');
    context = canvas.getContext('2d');
    WIDTH = 600;
    HEIGHT = 600;
    IntervalIDb = setInterval(draw, 100);
    rectHeight = 20;
    rectWidth = 20;
    rectX = (WIDTH / 2) - (rectWidth/2);
    rectY = (HEIGHT / 2) - (rectHeight/2);
    init();
	draw();
	
    $( document ).keydown(handleKeyboardKeys)

   // document.onKeydown = handleKeyboardKeys();
    //init_mysz();
    //$(document).mousemove(onMouseMove);
};


