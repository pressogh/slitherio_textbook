// js/script.js

var canvas = document.getElementById("canvasSnake");
var ctxSnake = document.getElementById("canvasSnake").getContext("2d");
var ctxFood = document.getElementById("canvasFood").getContext("2d");
var ctxHex = document.getElementById("canvasHex").getContext("2d");

var mouseDown = false, cursor = new Point(0, 0);
var game = new Game(ctxSnake, ctxFood, ctxHex);
var ut = new Util()

canvas.onmousemove = function(e) {
	// 마우스가 움직였을 경우
    if (mouseDown) {
        // 추가
    }
}

canvas.onmousedown = function(e) {
	// 마우스를 눌렀을 경우
    mouseDown = true;
}

canvas.onmouseup = function(e) {
	// 마우스를 땠을 경우
    mouseDown = false;
}

function start() {
	// 게임 시작
    game.init();
    game.draw();
}


var updateId,	
previousDelta = 0,
fpsLimit = 20;
function update(currentDelta){
	updateId = requestAnimationFrame(update);
	var delta = currentDelta - previousDelta;
    if (fpsLimit && delta < 1000 / fpsLimit) return;
    previousDelta = currentDelta;

    //clear all
	ctxFood.clearRect(0, 0, canvas.width, canvas.height);
	ctxSnake.clearRect(0, 0, canvas.width, canvas.height);
	ctxHex.clearRect(0, 0, canvas.width, canvas.height);

	//draw all
	game.draw();	
}


start();