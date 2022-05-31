// js/Game.js

class Game {
    constructor(ctxSnake, ctxFood, ctxHex) {
        // 렌더링 컨텍스트
        this.ctxSnake = ctxSnake;
        this.ctxFood = ctxFood;
        this.ctxHex = ctxHex;

        // 화면과 맵 크기 정의
        this.WORLD_SIZE = new Point(4000, 2000);
        this.SCREEN_SIZE = new Point(800, 400);
        this.world = new Point(-1200, -600);

        // 뱀, 음식이 담겨있는 배열
        this.snakes = [];
        this.foods = [];
    }

    init() {
        // 유저 뱀 생성
        this.snakes[0] = new Snake(this.ctxSnake, "Tony", 0);

        // AI 뱀 생성
        for(var i = 0; i < 50; i++) this.addSnake(ut.randomName(), 100);

        // 먹이 배치
        this.generateFoods(1000);
    }

    draw() {
        // 맵 그리기
        this.drawWorld();

        // 점수판 그리기
        this.drawScore();

        // 유저 뱀 움직이기
        this.snakes[0].move();

        // AI 뱀 움직이기
        for(var i = 1; i < this.snakes.length; i++) {
		    if(this.snakes[i].state === 0) this.snakes[i].move(this.snakes[0]);
        }

        // 먹이 그리기
        for(var i = 0; i< this.foods.length; i++) this.foods[i].draw(this.snakes[0]);
        
        // 점수 그리기
    }

    drawWorld() {
        // 맵 그리기

        // 화면 테두리 그리기
        this.ctxHex.fillStyle = "white";
        this.ctxHex.fillRect(
            this.world.x - 2,
            this.world.y - 2,
            this.WORLD_SIZE.x + 4,
            this.WORLD_SIZE.y + 4
        );

        // 내부 색 채우기
        this.ctxHex.fillStyle = "#17202A";
        this.ctxHex.fillRect(
            this.world.x,
            this.world.y,
            this.WORLD_SIZE.x,
            this.WORLD_SIZE.y
        );

        // world의 좌표에서 유저의 임시 x, y좌표를 빼 월드의 경계선 표시
        this.world.x -= this.snakes[0].velocity.x;
        this.world.y -= this.snakes[0].velocity.y;
    }

    drawScore() {
        // 점수 그리기

        // 시작점 지정
        var start = new Point(20, 20);

        // 뱀의 개수만큼 점수를 화면에 그리기
        for (var i = 0; i < this.snakes.length; i++) {
            this.ctxSnake.fillStyle = this.snakes[i].mainColor;
            this.ctxSnake.font="bold 10px Arial";
            this.ctxSnake.fillText(this.snakes[i].name + ":" + this.snakes[i].score, start.x-5, start.y +i*15);
        }
    }

    addSnake(name, id) {
        // AI 뱀 추가하기

		this.snakes.push(new SnakeAI(this.ctxSnake, name, id))
    }

    generateFoods(n) {
        // 먹이 추가하기

        for (var i = 0; i < n; i++) {
            this.foods.push(new Food(this.ctxFood, ut.random(-1200 + 50, 2800 - 50), ut.random(-600 + 50, 1400 - 50)));
        }
    }
}