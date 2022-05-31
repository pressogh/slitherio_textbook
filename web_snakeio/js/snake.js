class Snake {
    constructor(ctx, name, id) {
        this.ctx = ctx;
        this.name = name;
        this.id = id;

        // 점수
        this.score = 0;
        // 속도
        this.force = 5;
        // 상태
        this.state = 0;

        // 위치
        this.pos = new Point(game.SCREEN_SIZE.x / 2, game.SCREEN_SIZE.y / 2);
        // 임시 좌표
        this.velocity = new Point(0, 0);
        // 각도
        this.angle = ut.random(0, Math.PI);

        // 길이
        this.length = 10;
        // 최대 크기
        this.MAXSIZE = 12;
        // 크기
        this.size = 7;

        // 색
        this.mainColor = ut.randomColor();

        // 마디들의 좌표를 담아줄 배열
        this.arr = [];
        // 머리를 배열에 넣어줌
        this.arr.push(
            new Point(game.SCREEN_SIZE.x / 2, game.SCREEN_SIZE.y / 2)
        );
        // 마디들을 배열에 넣어줌
        for (var i = 1; i < this.length; i++) {
            this.arr.push(new Point(this.arr[i - 1].x, this.arr[i - 1].y));
        }
    }

    drawHeadOneEye() {
        var x = this.arr[0].x;
        var y = this.arr[0].y;

        // 머리
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.size + 2, 0, 2 * Math.PI);
        this.ctx.fill();

        // 눈 흰자
        this.ctx.fillStyle = "whitesmoke";
        this.ctx.beginPath();
        this.ctx.arc(x, y, this.size, 0, 2 * Math.PI);
        this.ctx.fill();

        // 눈동자
        var d = 2;
        this.ctx.fillStyle = "black";
        this.ctx.beginPath();
        this.ctx.arc(
            x + d * Math.cos(this.angle),
            y + d * Math.sin(this.angle),
            this.size / 1.5,
            0,
            2 * Math.PI
        );
        this.ctx.fill();

        // 눈동자 빛 반사
        var d = 3;
        this.ctx.fillStyle = "white";
        this.ctx.beginPath();
        this.ctx.arc(
            x + d * Math.cos(this.angle),
            y + d * Math.sin(this.angle),
            this.size / 4,
            0,
            2 * Math.PI
        );
        this.ctx.fill();

        // 이름
        this.ctx.fillStyle = "whitesmoke";
        this.ctx.font = "10px Arial";
        this.ctx.fillText(this.name, x - 5, y - 10);
    }

    drawBody(x, y, i) {
        var radius = this.size;

        this.ctx.beginPath();
        this.ctx.fillStyle = this.mainColor;
        this.ctx.arc(x, y, radius + 1, 0, 2 * Math.PI);
        this.ctx.fill();
    }

    move() {
        // x축으로 얼마나 움직어야 하는지
        this.velocity.x = this.force * Math.cos(this.angle);
        // y축으로 얼마나 움직어야 하는지
        this.velocity.y = this.force * Math.sin(this.angle);

        // 모든 마디의 좌표를 바꿔주기
        var d = this.size / 2;
        for (var i = this.length - 1; i >= 1; i--) {
            this.arr[i].x = this.arr[i - 1].x - d * Math.cos(this.angle);
            this.arr[i].y = this.arr[i - 1].y - d * Math.sin(this.angle);

            this.drawBody(this.arr[i].x, this.arr[i].y, i);
        }

        // 현재 뱀의 좌표를 이전 좌표 x, y + 이동 속도로 바꿔주기
        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;

        // 눈 그리기
        this.drawHeadOneEye();

        // 충돌 판정
        this.checkCollissionFood();
		this.checkCollissionSnake();
    }

    checkCollissionFood() {
        var x = this.arr[0].x;
        var y = this.arr[0].y;
        for (var i = 0; i < game.foods.length; i++) {
            if (
                ut.cirCollission(
                    x,
                    y,
                    this.size + 3,
                    game.foods[i].pos.x,
                    game.foods[i].pos.y,
                    game.foods[i].size
                )
            ) {
                game.foods[i].die();
                this.addScore();
                this.incSize();
            }
        }
    }

    checkCollissionSnake() {
        var x = this.arr[0].x;
        var y = this.arr[0].y;
        for (var i = 0; i < game.snakes.length; i++) {
            var s = game.snakes[i];
            if (s !== this) {
                for (var j = 0; j < game.snakes[i].arr.length; j += 2) {
                    if (
                        ut.cirCollission(
                            x,
                            y,
                            this.size,
                            s.arr[j].x,
                            s.arr[j].y,
                            s.size
                        )
                    ) {
                        this.die();
                    }
                }
            }
        }
    }

    addScore() {
        this.length++;
        this.score++;
        this.arr.push(new Point(-100, -100));
    }

    incSize() {
        if (this.length % 30 == 0) this.size++;
        if (this.size > this.MAXSIZE) this.size = this.MAXSIZE;
    }

    changeAngle(angle) {
        this.angle = angle;
    }

    die() {
        this.state = 1;
        for (var i = 0; i < this.arr.length; i += 3)
            game.foods.push(
                new Food(game.ctxFood, this.arr[i].x, this.arr[i].y)
            );

        var index = game.snakes.indexOf(this);
        game.snakes.splice(i, 1);
    }
}
