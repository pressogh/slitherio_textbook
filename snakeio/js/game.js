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
        this.snakes[0] = new Snake(this.ctxSnake, "Tony", 0);
        this.generateFoods(1000);
    }

    draw() {
        // 맵 그리기
        this.drawWorld();
        // 유저 뱀 움직이기
        this.snakes[0].move();
        // AI 뱀 움직이기
        // 먹이 그리기
        for(var i = 0; i< this.foods.length; i++) this.foods[i].draw(this.snakes[0]);
        // 점수 그리기
        // this.drawScore();
        // 미니맵 그리기
    }

    drawWorld() {
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
        // 점수판 그리기
    }

    drawMiniMap() {
        this.ctxSnake.globalAlpha = 0.5;

        var mapSize = new Point(100, 50);
        var start = new Point(20, this.SCREEN_SIZE.y - mapSize.y - 10);

        // 사각형 그리기
        this.ctxSnake.fillStyle = "white";
        this.ctxSnake.fillRect(start.x, start.y, mapSize.x, mapSize.y);
        this.ctxSnake.fill();

        this.ctxSnake.globalAlpha = 1;

        // 모든 플레이어 그리기
        for (var i = 0; i < this.snakes.length; i++) {
            var playerInMap = new Point(
                start.x + (mapSize.x / this.WORLD_SIZE.x) * this.snakes[i].pos.x,
                start.y + (mapSize.y / this.WORLD_SIZE.y) * this.snakes[i].pos.y
            );

            this.ctxSnake.fillStyle = this.snakes[i].mainColor;
            this.ctxSnake.beginPath();
            this.ctxSnake.arc(
                start.x + playerInMap.x,
                playerInMap.y + 10,
                2,
                0,
                2 * Math.PI
            );
            this.ctxSnake.fill();
        }
    }

    addSnake(name, id) {
        this.snakes.push(new SnakeAi(this.ctxSnake, name, id));
    }

    generateFoods(n) {
        for (var i = 0; i < n; i++) {
            this.foods.push(
                new Food(
                    this.ctxFood,
                    ut.random(-1200 + 50, 2800 - 50),
                    ut.random(-600 + 50, 1400 - 50)
                )
            );
        }
    }
}
