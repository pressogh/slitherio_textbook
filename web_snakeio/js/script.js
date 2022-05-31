// js/script.js

var canvas = document.getElementById("canvasSnake");
var ctxSnake = document.getElementById("canvasSnake").getContext("2d");
var ctxFood = document.getElementById("canvasFood").getContext("2d");
var ctxHex = document.getElementById("canvasHex").getContext("2d");

var mouseDown = false, cursor = new Point(0, 0);
var ut = new Util();
var game = new Game(ctxSnake, ctxFood, ctxHex);

canvas.onmousemove = function(e) {
	// 마우스가 움직였을 경우
    if (mouseDown) {
        // 추가
		cursor = ut.getMousePos(canvas, e);	
		var ang = ut.getAngle(game.snakes[0].arr[0], cursor);				
		game.snakes[0].changeAngle(ang);
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
	update();
}


var updateId;
var previousDelta = 0;
var fpsLimit = 30;
function update(currentDelta) {
	// 게임 화면 업데이트
	updateId = requestAnimationFrame(update);
	
	// 
	var delta = currentDelta - previousDelta;
	// delta값이 1000 / fpsLimit보다 보다 크다면
    if (delta < 1000 / fpsLimit) return;

	console.log(currentDelta, 1000 / fpsLimit);

    previousDelta = currentDelta;

	ctxFood.clearRect(0, 0, canvas.width, canvas.height);
	ctxSnake.clearRect(0, 0, canvas.width, canvas.height);
	ctxHex.clearRect(0, 0, canvas.width, canvas.height);

	game.draw();
}

start();