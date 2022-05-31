// js/script.js

var canvas = document.getElementById("canvasSnake");
var ctxSnake = document.getElementById("canvasSnake").getContext("2d");
var ctxFood = document.getElementById("canvasFood").getContext("2d");
var ctxHex = document.getElementById("canvasHex").getContext("2d");

var ut = new Util();
var game = new Game(ctxSnake, ctxFood, ctxHex);

var mouseDown = false, cursor = new Point(0, 0);

// 마우스가 움직였을 경우
canvas.onmousemove = function(e) {
    if (mouseDown) {
		cursor = ut.getMousePos(canvas, e);	
		var ang = ut.getAngle(game.snakes[0].arr[0], cursor);				
		game.snakes[0].changeAngle(ang);
    }
}

// 마우스를 눌렀을 경우
canvas.onmousedown = function(e) {
    mouseDown = true;
}

// 마우스를 땠을 경우
canvas.onmouseup = function(e) {
    mouseDown = false;
}

function start() {
	// 게임 시작
    game.init();
    update();
}

var previousDelta = 0;
var fpsLimit = 30;
function update(currentDelta) {
	// 게임 화면 업데이트
	requestAnimationFrame(update);
	
	// delta = 현재 실행 시간 - 이전 실행 시간
	var delta = currentDelta - previousDelta;
	// delta값이 1000 / fpsLimit보다 보다 작다면 pass
    if (delta < 1000 / fpsLimit) return;

    previousDelta = currentDelta;

	ctxFood.clearRect(0, 0, canvas.width, canvas.height);
	ctxSnake.clearRect(0, 0, canvas.width, canvas.height);
	ctxHex.clearRect(0, 0, canvas.width, canvas.height);

	game.draw();
}

start();
